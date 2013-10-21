---
category: Zones
path: '/zones/:uuid/start'
title: 'Start zone'
type: 'PUT'

layout: nil
---

This method starts a zone

### Request

* Basic authentication may be required.

Sent a empty PUT

### Response

#### Success

```{
    "message": "zone started"
}```

#### Failure

```{
    "error": "VM c9e3ecd8-64d8-447b-890d-6262905f6549 is already 'running'"
}```