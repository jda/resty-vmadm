resty-vmadm
===========

REST API for managing SmartOS VMs

resty-vmadm (rva) is a very thin web service wrapper around vmadm.

API Reference: http://jda.github.io/resty-vmadm/api.html

See project web site for more information: http://jda.github.io/resty-vmadm/

## Security note
resty-vmadm is pretty dangerous and should only be run in a trusted environment. 
Your global zone is on a restricted management network, right? Seriously, don't expose this to anything
you don't trust. It runs as root and has minimal(no) data validation.

There is optional HTTP Basic authentication (if you set a username & password in the config file). 
This is to help prevent mistakes on your management network, not to secure it so you can expose it to the world.

## Library Credits
Restify and its dependencies are bundled in node_modules for ease of deployment. 
Their respective license statements can be found in the usual place inside node_modules.

## License
> Copyright (c) 2013 Jonathan Auer
> 
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to
> deal in the Software without restriction, including without limitation the
> rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
> sell copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> 
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
> IN THE SOFTWARE.
