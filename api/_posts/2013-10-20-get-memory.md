---
category: Memory
path: '/memory'
title: 'Get provisionable memory'
type: 'GET'

layout: nil
---

This method returns the amount of memory in the system that is available for new guests.

### Request

* Basic authentication may be required.

### Response

The amount of memory available for new guests in MiB.

```Status: 200 OK```
```{
    "memory": 51620
}```

