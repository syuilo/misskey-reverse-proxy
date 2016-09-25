Misskey Reverse Proxy
=====================

Core, File, Proxy, Webを同一サーバー内で運用するときのためのリバースプロキシです。
ポートを指定せずに、それぞれのサブドメインでのアクセスを可能にします。
インターネットとの間にCloudFlareなどのCDNが挟まれていて、独自のポートで通信できないような場合に特に有用です。

Required
--------
* Node.js

Configuration
--------
`.config/config.json`を用意してください。  
下記がサンプルです。  
```
{
    "port":     80,
    "https":    true,
    "ports": {
        "web":  8000,
        "core": 8001,
        "file": 8002,
        "proxy": 8003
    }
}
```

License
-------
[MIT](LICENSE)