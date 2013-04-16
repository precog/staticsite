#!/usr/bin/env python

from fabric.api import *

# Configure user, private key, etc. for SFTP deployment
env.user = 'ubuntu'
env.hosts = ['web4.precog.com']
#env.keyfile = ['$HOME/.ssh/id_dsa']

def pack():
    """
        Builds static site for deployment and generates tarball
    """

    local('wintersmith build', capture=False)
    with lcd('build'):
        local('tar czf ../build.tgz .', capture=False)

def deploy():
    """
        Deploys static site on web4
    """

    put('build.tgz', '/tmp/build.tgz')

    # now we're on the remote host from here on out!
    run('rm -fr /tmp/staticsite')
    run('mkdir /tmp/staticsite')
    with cd('/tmp/staticsite'):
        run('tar xzf /tmp/build.tgz')

    sudo('chown -R www-data:www-data /tmp/staticsite')
    sudo('touch /var/www/staticsite')
    sudo('mv /var/www/staticsite /tmp/oldsite')
    sudo('mv /tmp/staticsite /var/www/staticsite')
    sudo('rm -rf /tmp/oldsite')
