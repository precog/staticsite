staticsite
==========

The wintersmith source for the static website

Pre-requisites
==============

To build this site one needs `wintersmith`, which is a nodejs
module. Install `nodejs` (do not install `node`, which is a radio
package and breaks nodes modules), then run this to install
`wintersmith`, if required:

    sudo npm install wintersmith -g

Note that it will make
[`wintersmith`](https://github.com/jnordberg/wintersmith) available on the
whole system, and on the PATH. If you do not wish to do so, purse a local
install.

The site is deployed with [`fabric`](http://docs.fabfile.org/en/1.6/),
a Python software for automated deploy. Though Debian/Ubuntu packages are
quite old and `pip` install is preferred, the script does work (at the
moment) with older fabric versions.

Testing and Building the Static Site
====================================

Typing the following command will build the static site from the
markdown files, and start a local web server on port 8080, localhost,
serving it:

    wintersmith preview

Running the following command will build the site on the `build`
directory, which can then be used by any web server capable of
serving static pages:

    wintersmith build

See `wintersmith help` for more information.

Deploying the Site
==================

Site deploy is done through fabric, though only deploy to `web4`,
a staging environment, is configured at the moment. The following
command will build the site (as above), generate a tarball and
move it to `web4`:

    fab pack deploy

See `fab --list` for more information.

