#!/usr/bin/env python

from fabric.api import env,hide,hosts
from fabric.colors import red,yellow,green,cyan
from fabric.context_managers import cd,lcd,settings
from fabric.decorators import task
from fabric.operations import local,put,run,sudo
from fabric.utils import abort,warn,puts
from fabric.contrib.files import sed

import os
import time
from shutil import copyfile

# Configure user, private key, etc. for SFTP deployment
env.user = 'ubuntu'
env.hosts = ['web4.precog.com']
env.optimize_images = True
env.colors = True
env.release = time.strftime('%Y%m%d%H%M%S')
env.path = '/var/www/precogsite'

@task(display=None)
@hosts('localhost')
def production():
    """
        Execute the other actions on production environment
    """

    puts(green('>>> Running on Production!'))
    env.hosts = ['web1.precog.com', 'web2.precog.com']


@task
@hosts('localhost')
def clean_local():
    """
        Clean local build directory
    """
    local('rm -fr build')
    local('mkdir -p build')
    
    
@task
@hosts('localhost')
def build():
    """
        Builds static site for deployment with wintersmith
    """
    local('wintersmith build')


@task
@hosts('localhost')
def copy_json():
    """ 
        Copy json files under external
    """
    sourcePath = 'contents/external/'
    targetPath = 'build/external/'
    for base,subdirs,files in os.walk(sourcePath):
        for file in files:
            orig = os.path.join(base, file)
            if os.path.isfile(orig) and file[-5:] == '.json':
                targetBase = os.path.join(targetPath, base[len(sourcePath):])
                dest = os.path.join(targetBase, file)
                print "Checking diretory %s" % targetBase
                if not os.path.exists(targetBase):
                    print "Not found! Creating..."
                    os.makedirs(targetBase)
                print "Copying from %s to %s" % (orig, dest)
                copyfile(orig, dest)


@task
@hosts('localhost')
def optimize():
    """
        Applies optimizations to reduce file sizes
    """

    # Checks what file extensions may be optimized
    interesting_extensions = set()

    cssjs_extensions = ['.css', '.js']
    png_extensions = ['.png']
    jpg_extensions = ['.jpg', '.jpeg']

    if execExists('yui-compressor'):
        interesting_extensions.update(cssjs_extensions)
        cssjs_overwrites = False
        cssjs_exec = 'yui-compressor -o "%(target)s" "%(source)s"'
    else:
        warn(yellow('>>> Unable to optimize css/js files: yui-compressor not found!'))

    if env.optimize_images:
        if execExists('optipng'):
            interesting_extensions.update(png_extensions)
            png_overwrites = True
            png_exec = 'optipng -quiet -preserve -- "%s"'
        else:
            warn(yellow('>>> Unable to optimize png images: optipng not found!'))
            

        if execExists('jpegoptim'):
            interesting_extensions.update(jpg_extensions)
            jpg_overwrites = True
            jpg_exec = 'jpegoptim --totals --strip-all  -- "%s"'
        else:
            warn(yellow('>>> Unable to optimize jpeg images: jpegoptim not found!'))


    # Builds a list of files to be optimized
    def get_file_base_and_extension(filename):
        if filename.count('.'):
            return '.'.join(filename.split('.')[:-1]), '.%s' % filename.split('.')[-1]
        else:
            return filename, ''

    files_set = set()
    
    for base,subdirs,files in os.walk('build'):
        for file in files:
            filebase, extension = get_file_base_and_extension(file)
            path = os.path.join(base, filebase)

            if extension in interesting_extensions and filebase[-4:] != '.min':
                files_set.add((path, extension))

    # Optimize each file in the list
    def optimize_file(original_path, file_type, minify_exec, overwrites):
        try:
            if overwrites:
                local(minify_exec % original_path)
            else:
                local(minify_exec % { 'source': original_path, 'target': 'minimized_file.tmp' })
                os.rename('minimized_file.tmp', original_path)

        except OSError:
            abort(red('>>> File %s is not a %s file.' % (original_path, file_type)))

    files_no = len(files_set)
    compressed_total = 0
    original_total = 0
    for index, (file_basename, file_extension) in enumerate(files_set):
        puts(green("%.1f%% done (%d/%d)" % ((index+1.)*100./files_no, index+1, files_no)))
        original_path = '%s%s' % (file_basename, file_extension)
        original_size = os.path.getsize(original_path)
        original_total += original_size

        if file_extension in png_extensions:
            optimize_file(original_path, 'PNG', png_exec, png_overwrites)

        if file_extension in jpg_extensions:
            optimize_file(original_path, 'JPG', jpg_exec, jpg_overwrites)

        if file_extension in cssjs_extensions:
            optimize_file(original_path, 'CSS or JS', cssjs_exec, cssjs_overwrites)

        compressed_size = os.path.getsize(original_path)
        compressed_total += compressed_size
        
        if compressed_size < original_size:
            puts(cyan('\tcompressed %d => %d => %d%%' % (original_size, compressed_size, (compressed_size * 100 / original_size))))

    puts(cyan('>>> Reduced from %d to %d bytes (%d%% of the original size)' % (original_total, compressed_total, (compressed_total * 100 / original_total))))


@task
@hosts('localhost')
def tarball():
    """
        Generates tarball
    """

    local('rm -f build.tgz')
    with lcd('build'):
        local('tar czf ../build.tgz .', capture=False)

@task
@hosts('localhost')
def pack():
    """
        Builds the static site, optimize files for size, and prepares for transfer
    """

    clean_local()
    build()
    copy_json()
    optimize()
    tarball()


@task
def deploy():
    """
        Deploys static site on web4
    """

    upload_current_release()
    create_redirects()
    symlink_current_release()
    sudo('service nginx reload')


@task
def rollback():
    """
        Rolls back currently deployed version to its predecessor
    """

    with cd(env.path):
        run('mv current/rollback rollback')
        run('mv current undeployed')
        run('mv rollback current')
        version = run('readlink current')
        previous = run('readlink undeployed')
        puts(green('>>> Rolled back from %(previous)s to %(version)s' % { 'previous': previous, 'version': version }))
        run('rm -fr %s' % previous)
        run('rm undeployed')
        sudo('service nginx reload')


def execExists(name):
    """
        Check whether an executable binary can be found with that name
    """

    with settings(hide('everything'), warn_only=True):
        return local('which %s' % name, capture=True)

def upload_current_release():
    sudo('rm -f /tmp/build.tgz')
    put('build.tgz', '/tmp/build.tgz')
    with cd('%s/releases' % env.path):
        run('mkdir %(release)s' % env)
        with cd(env.release):
            run('tar xzf /tmp/build.tgz')
        sudo('chown -R ubuntu:www-data %(release)s' % env)

def symlink_current_release():
    puts(green('>>> updating current to point at %(path)s/releases/%(release)s' % env))
    with cd(env.path):
        with settings(warn_only=True):
            run('mv current releases/%(release)s/rollback' % env)
        run('ln -s releases/%(release)s current' % env)

def create_redirects():
    remote = '%(path)s/releases/%(release)s/redirects.conf' % env
    remoteblog = '%(path)s/releases/%(release)s/blogredirects.conf' % env

    if os.access("redirects.txt", os.R_OK):
        put("redirects.txt", remote)
        sed(remote, '^(.*[^;]);?$', 'rewrite \\1 redirect;')

    else:
        warn(yellow(">>> File redirects.txt not found -- removing all redirections"))
        run('touch %s' % remote)

    put("blogredirects.txt", remoteblog)
    sed(remoteblog, '^(.*[^;]);?$', '\\1;')

