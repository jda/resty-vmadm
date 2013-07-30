resty-vmadm
===========

REST API for managing SmartOS VMs

resty-vmadm (rva) is a very thin web service wrapper around vmadm.

## API

### GET /zones
Returns array of zones by UUID

### POST /zones
Provide a machine json description in post body as content-type application/json to create a new zone

### GET /zones/zone-uuid-here
Returns zone configuration

### DELETE /zones/zone-uuid-here
Delete the zone

### PUT /zones/zone-uuid-here/start
Start the zone

### PUT /zones/zone-uuid-here/stop
Stop the zone

### GET /zones/zone-uuid-here/info
*KVM Zones only*

Returns KVM status & hardware details

### GET /zones/zone-uuid-here/info/info-node-here
*KVM Zones only*

Returns a subset of KVM info status. 
E.g. /zones/zone-uuid/info/vnc returns the VNC connection information for a given KVM zone.

## Installation
*On a SmartOS global zone*

1. Copy the resty-vmadm source directory to /opt/resty-vmadm
2. ln -s /opt/resty-vmadm/resty-vmadm.xml /opt/custom/smf/resty-vmadm.xml
3. Edit the config to set port numbers, username, password, etc: /opt/resty-vmadm/etc/resty-vmadm.json
4. reboot the system to make sure everything comes up cleanly

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
