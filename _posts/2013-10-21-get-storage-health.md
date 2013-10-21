---
category: Storage
path: '/storage/:name'
title: 'Get storage pool health'
type: 'GET'

layout: nil
---

This method returns health information for a specific pool

### Request

* Basic authentication may be required.

### Response

Pool health

```Status: 200 OK```
```{
    "health": "ONLINE"
}```

