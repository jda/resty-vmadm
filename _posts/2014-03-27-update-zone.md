---
category: Zones
path: '/zones/:uuid'
title: 'Update a zone'
type: 'POST'

layout: nil
---

This method updates a existing zone

### Request

* Basic authentication may be required.

```Status: 200 OK```
```{
 "brand": "joyent",
 "image_uuid": "9eac5c0c-a941-11e2-a7dc-57a6b041988f",
 "alias": "test1",
 "hostname": "test1",
 "max_physical_memory": 512,
 "quota": 20,
 "nics": [
  {
    "nic_tag": "admin",
    "ip": "10.88.88.52",
    "netmask": "255.255.255.0",
    "gateway": "10.88.88.2"
  }
 ]
}```

### Response

**If succeeds**, returns Status: 200 OK