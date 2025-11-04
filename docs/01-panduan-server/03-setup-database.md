---
title: Setup Database
sidebar_label: 3. Setup Database
---

Amankan instalasi MariaDB dan buat database khusus untuk WordPress.

### 1. Amankan MariaDB
Jalankan skrip keamanan interaktif.
```bash
sudo mysql_secure_installation

```
Set root password, remove anonymous, disallow remote root, remove test db, reload.

### 2. Buat Database WordPress 

```bash

# Masuk ke MariaDB
sudo mysql -u root -p

# Jalankan perintah SQL ini
CREATE DATABASE wp_headless DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wpuser'@'localhost' IDENTIFIED BY 'passwordKuatBanget!';
GRANT ALL PRIVILEGES ON wp_headless.* TO 'wpuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;

```

* [Panduan 4: Install WordPress](./install-wordpress)