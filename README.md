staticsite
==========

The wintersmith source for the static website

Pre-requisites
--------------

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
------------------------------------

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
------------------

Site deploy is done through fabric, deploying by default to `web4`,
a staging environment. The following command will build the site (as above),
generate a tarball and move it to `web4`:

    fab pack deploy

To deploy to production, do this:

    fab production pack deploy

or, if no changes were made since you last ran `pack`, this:

    fab production deploy

See `fab --list` for more information.

Writing Redirects
-----------------

The deploy process makes it possible to create temporary redirects. To do
so, write a file called `redirects.txt` in this directory, containing the
regular expression of the path to be redirected followed by the path or
URL the client should be redirected to. For example:

    ^/developers(.*)$ $scheme://developers.precog.com$1

This will redirect any access to /developers -- followed by anything else --
to the site `developers.precog.com`, preserving whatever follows
`/developers`, and using the same protocol (http or https), which is stored
on the $scheme variable.  This can have unintended consequences if, for
instance, there's a `/developers-review`.

The exact rules are based on Nginx, which is the server that will process them,
and can be found [here](http://wiki.nginx.org/HttpRewriteModule#rewrite).

