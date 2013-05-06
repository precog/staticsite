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
    puts(green('Servers: %s' % ", ".join(env.hosts)))


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
                puts("Checking diretory %s" % targetBase)
                if not os.path.exists(targetBase):
                    puts(yellow("Not found! Creating..."))
                    os.makedirs(targetBase)
                puts("Copying from %s to %s" % (orig, dest))
                copyfile(orig, dest)


@task
@hosts('localhost')
def optimize():
    """
        Applies optimizations to reduce file sizes
    """
    optimizable_extensions = get_optimizable_extensions()
    file_set = get_optimizable_files(optimizable_extensions)
    files_no = len(file_set)
    compressed_total = 0
    original_total = 0
    for index, (file_basename, file_extension) in enumerate(file_set):
        puts(green("%.1f%% done (%d/%d)" % ((index+1.)*100./files_no, index+1, files_no)))
        original_path = '%s%s' % (file_basename, file_extension)
        original_size = os.path.getsize(original_path)
        original_total += original_size

        for kind in optimizable_extensions:
            if file_extension in optimizable_extensions[kind]['extensions']:
                optimize_file(original_path, optimizable_extensions[kind])

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
def deploy(n = 10):
    """
        Deploys static site and garbage collect older deploys
    """
    upload_current_release()
    create_redirects()
    make_symlinks()
    symlink_current_release()
    sudo('service nginx reload')
    gc_deploys(n)


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


@task
def gc_deploys(n = 10):
    """
        Garbage Collect older deploys by keeping only the last n (defaults to 10)

        This will delete any directory which is older than the last n releases,
        preventing rollbacks from before that.
    """
    with cd("%s/releases" % env.path):
        files = run("ls -1t").splitlines()
        older_files = files[n:]
        if len(older_files) > 0:
            puts(yellow("Removing older deploys: %s" % ", ".join(older_files)))
        for file in older_files:
            run("rm -fr %s" % file)


def optimize_file(original_path, optimizable_extension):
    minify_exec = optimizable_extension['exec']
    overwrites = optimizable_extension['overwrites']
    file_type = optimizable_extension['file_type']
    try:
        if overwrites:
            local(minify_exec % original_path)
        else:
            local(minify_exec % { 'source': original_path, 'target': 'minimized_file.tmp' })
            os.rename('minimized_file.tmp', original_path)

    except OSError:
        abort(red('>>> File %s is not a %s file.' % (original_path, file_type)))

def get_optimizable_files(optimizable_extensions):
    oe = optimizable_extensions
    extensions = [ ext for k in oe if 'extensions' in oe[k] for ext in oe[k]['extensions'] ]
    files_set = set()
    for base,subdirs,files in os.walk('build'):
        if not base.startswith('build/external'):
            for file in files:
                filebase, extension = get_file_base_and_extension(file)
                path = os.path.join(base, filebase)

                if extension in extensions and filebase[-4:] != '.min':
                    files_set.add((path, extension))

    return files_set

def get_file_base_and_extension(filename):
    if filename.count('.'):
        return '.'.join(filename.split('.')[:-1]), '.%s' % filename.split('.')[-1]
    else:
        return filename, ''

def get_optimizable_extensions():
    optimizable_extensions = dict()

    if exec_exists('yui-compressor'):
        optimizable_extensions['cssjs'] = dict()
        optimizable_extensions['cssjs']['extensions'] = ['.css', '.js']
        optimizable_extensions['cssjs']['overwrites'] = False
        optimizable_extensions['cssjs']['exec'] = 'yui-compressor -o "%(target)s" "%(source)s"'
        optimizable_extensions['cssjs']['file_type'] = 'CSS or JS'
    else:
        warn(yellow('>>> Unable to optimize css/js files: yui-compressor not found!'))

    if env.optimize_images:
        if exec_exists('optipng'):
            optimizable_extensions['png'] = dict()
            optimizable_extensions['png']['extensions'] = ['.png']
            optimizable_extensions['png']['overwrites'] = True
            optimizable_extensions['png']['exec'] = 'optipng -quiet -preserve -- "%s"'
            optimizable_extensions['png']['file_type'] = 'PNG'
        else:
            warn(yellow('>>> Unable to optimize png images: optipng not found!'))

        if exec_exists('jpegoptim'):
            optimizable_extensions['jpeg'] = dict()
            optimizable_extensions['jpeg']['extensions'] = ['.jpg', '.jpeg']
            optimizable_extensions['jpeg']['overwrites'] = True
            optimizable_extensions['jpeg']['exec'] = 'jpegoptim --totals --strip-all  -- "%s"'
            optimizable_extensions['jpeg']['file_type'] = 'JPEG'
        else:
            warn(yellow('>>> Unable to optimize jpeg images: jpegoptim not found!'))

    return optimizable_extensions

def exec_exists(name):
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

def make_symlinks():
    puts(green('>>> creating symlink to apidocs'))
    with cd('%(path)s/releases/%(release)s' % env):
        run('ln -s %s/shared/apidocs apidocs' % env.path)

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

