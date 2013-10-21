---
category: Zones
path: '/zones/:uuid'
title: 'Get zone configuration'
type: 'GET'

layout: nil
---

This method gets configuration information for a zone

### Request

* Basic authentication may be required.

### Response

Zone config

```Status: 200 OK```
```{
    "zonename": "f8d9ac41-d0a1-45d0-a0fb-77a51ca714de",
    "zonepath": "/zones/f8d9ac41-d0a1-45d0-a0fb-77a51ca714de",
    "autoboot": true,
    "brand": "kvm",
    "limit_priv": "default,-file_link_any,-net_access,-proc_fork,-proc_info,-proc_session",
    "v": 1,
    "create_timestamp": "2013-07-29T19:56:01.563Z",
    "cpu_shares": 100,
    "zfs_io_priority": 100,
    "max_lwps": 2000,
    "max_physical_memory": 512,
    "max_locked_memory": 512,
    "max_swap": 512,
    "billing_id": "00000000-0000-0000-0000-000000000000",
    "owner_uuid": "00000000-0000-0000-0000-000000000000",
    "hostname": "testzone",
    "resolvers": [
        "172.31.254.1",
        "172.31.254.2"
    ],
    "alias": "testzone",
    "ram": 256,
    "vcpus": 1,
    "nics": [
        {
            "interface": "net0",
            "mac": "72:4f:dc:60:2d:99",
            "vlan_id": 800,
            "nic_tag": "admin",
            "gateway": "192.168.1.1",
            "primary": true,
            "ip": "192.168.1.2",
            "netmask": "255.255.255.0",
            "model": "virtio"
        }
    ],
    "disks": [
        {
            "path": "/dev/zvol/rdsk/zones/f8d9ac41-d0a1-45d0-a0fb-77a51ca714de-disk0",
            "boot": true,
            "model": "virtio",
            "media": "disk",
            "size": 4096,
            "zfs_filesystem": "zones/f8d9ac41-d0a1-45d0-a0fb-77a51ca714de-disk0",
            "zpool": "zones",
            "compression": "off",
            "block_size": 8192
        }
    ],
    "uuid": "f8d9ac41-d0a1-45d0-a0fb-77a51ca714de",
    "zone_state": "running",
    "zoneid": 15,
    "pid": 81792,
    "last_modified": "2013-07-29T20:07:14.000Z",
    "server_uuid": "54ba0af8-8d7a-0010-a71b-00269ecd2d9a",
    "state": "running",
    "customer_metadata": {},
    "internal_metadata": {},
    "tags": {},
    "routes": {},
    "quota": 10,
    "zfs_root_recsize": 131072,
    "zfs_filesystem": "zones/f8d9ac41-d0a1-45d0-a0fb-77a51ca714de",
    "zpool": "zones",
    "snapshots": []
}```

