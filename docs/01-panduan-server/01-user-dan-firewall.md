---
title: User Baru & Firewall
sidebar_label: 1. User & Firewall
---

Langkah pertama setelah VPS baru adalah membuat user `sudo` dan
mengaktifkan firewall dasar.

### 1. Buat User VPS Baru
Ini digunakan untuk membuat user vps baru. Jika menggunakan hosting,
tidak perlu menjalankan ini.

```bash
ssh root@IP_VPS
adduser dev && usermod -aG sudo dev
su - dev
```

2. Setup Firewall Sederhana

```bash

sudo apt update && sudo apt install -y ufw
sudo ufw allow OpenSSH
sudo ufw allow 80,443/tcp
sudo ufw enable

```

* [Panduan 2: Install LEMP Stack](./install-lemp)
* [Panduan 3: Setup Database](./setup-database)

---



