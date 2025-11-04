---
title: Konfigurasi Nginx
sidebar_label: 5. Konfigurasi Nginx
---

Buat *virtual host* Nginx agar `cms.domainmu.com` mengarah
ke folder WordPress.

### 1. Buat File Konfigurasi
```bash
sudo nano /etc/nginx/sites-available/cms.conf

```
### 2. Isi Konfigurasi

Tempel konfigurasi ini. Ganti cms.domainmu.com dan cek versi php-fpm.sock Anda (misal php8.2-fpm.sock).

```bash

server {
    listen 80;
    server_name cms.domainmu.com; # Ganti domain ini

    root /var/www/cms;
    index index.php index.html;

    client_max_body_size 64M;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        
        # Cek versi PHP Anda, mungkin php8.1 atau php8.3
        fastcgi_pass unix:/run/php/php8.2-fpm.sock; 
        
        fastcgi_param HTTP_AUTHORIZATION $http_authorization;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp)$ {
        expires max;
        log_not_found off;
    }
}

```

### 3. Aktifkan Situs & Reload

## Buat symlink
sudo ln -s /etc/nginx/sites-available/cms.conf /etc/nginx/sites-enabled/

## Tes konfigurasi & reload Nginx
sudo nginx -t && sudo systemctl reload nginx

---

### Hasil Akhirnya

Setelah Anda **menyimpan semua file** di atas, Docusaurus akan otomatis *reload*. Sidebar Anda akan langsung terlihat seperti ini: