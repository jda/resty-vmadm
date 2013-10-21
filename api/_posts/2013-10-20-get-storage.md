---
category: Storage
path: '/storage'
title: 'Get storage pools'
type: 'GET'

layout: nil
---

This method returns information on all storage pools (zpools) in the system.

### Request

* Basic authentication may be required.

### Response

zpool information

```Status: 200 OK```
```{
    "zpools": [
        {
            "name": "zones",
            "size": "7.25T",
            "allocated": "38.2G",
            "free": "7.21T",
            "cap": "0%",
            "health": "ONLINE",
            "altroot": "-"
        }
    ]
}```

