Misskey Reverse Proxy
=====================

Core, File, Webを同一サーバー内で運用するときのためのリバースプロキシです。
ポートを指定せずに、それぞれのサブドメインでのアクセスを可能にします。
インターネットとの間にCloudFlareなどのCDNが挟まれていて、独自のポートで通信できないような場合に特に有用です。

Required
--------
* Node.js

License
-------
[MIT](LICENSE)
