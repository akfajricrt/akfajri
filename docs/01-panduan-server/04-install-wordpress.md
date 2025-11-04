---
title: Install WordPress
sidebar_label: 4. Install WordPress
---

Download dan konfigurasi file inti WordPress.

### 1. Download & Setup
```bash
# Masuk ke folder web root
cd /var/www
sudo mkdir cms && sudo chown -R dev:dev cms && cd cms

# Download & ekstrak WordPress
curl -O [https://wordpress.org/latest.tar.gz](https://wordpress.org/latest.tar.gz)
tar xzf latest.tar.gz && mv wordpress/* . && rm -rf wordpress latest.tar.gz


```
### 2. Konfigurasi wp-config.php
Salin file contoh dan edit.

```bash
cp wp-config-sample.php wp-config.php
nano wp-config.php

```
Pastikan isinya sesuai dengan database yang Anda buat:

```bash
// ... file wp-config.php ...
define( 'DB_NAME', 'db_name' );
define( 'DB_USER', 'db_usename' );
define( 'DB_PASSWORD', 'db_password' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );
// ... (salt keys) ...
```

### 3. Atur Kepemilikan File
Nginx berjalan sebagai user www-data, jadi berikan hak akses.

```bash

cd /var/www
sudo chown -R www-data:www-data cms
sudo find cms -type d -exec chmod 755 {} \;
sudo find cms -type f -exec chmod 644 {} \;

```

* [Panduan 5: Konfigurasi Nginx](./konfigurasi-nginx)
