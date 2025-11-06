---
title: Kuis
sidebar_label: 9. Kuis
---

### Kuis 1 — Perbaiki Program

```cpp
#include <iostream>

struct Date{
    int year, month, day;
    Date(int _year, int _month, int _day){
         year=_year; month=_month; day=_day;
    }
    void print(){
        std::cout << year << '/' << month << '/' << day;
    }
};
void doSomething(const Date &date)
{
    date.print();
}
int main()
{
    Date today(2020, 10, 14); 
    today.print();
    doSomething(today);
    return 0;
}
```

**Analisis masalah**
`doSomething` menerima `const Date&`, tetapi memanggil `date.print()`.
Versi `print()` yang tersedia bukan fungsi `const`, sehingga tidak dapat dipanggil pada objek `const` (atau referensi `const`). Inilah yang memicu error.

**Inti perbaikan (konsep)**
* Tandai void print() **const** agar menjamin tidak memodifikasi objek, sehingga bisa dipanggil pada referensi const.
* (Opsional) tambahkan pemformatan akhir baris saat mencetak.

Catatan: Di sini kita tidak mengubah kode asli—ini hanya penjelasan mengapa gagal dan bagaimana seharusnya diperbaiki.

### Kuis 2 — Output Apa?

```cpp
#include <iostream>

struct Something{
    void print(){
        std::cout << "non-const\n";
    }
    void print() const {
        std::cout << "const\n";
    }
};

int main()
{
    Something s1{};
    s1.print(); 

    const Something s2{};
    s2.print(); 

    return 0;
}
```

**Analisis & Jawaban**
* `s1` adalah objek `non-const` → memanggil `overload void print()` → mencetak `non-const`.
* `s2` adalah objek `const` → hanya boleh memanggil `void print() const` → mencetak `const`.

**Output yang dihasilkan (urutannya)**

```cpp
non-const
const
```

**Pelajaran utama**
* Overloading berdasarkan const-ness pada fungsi anggota membuat pemanggilan otomatis memilih versi yang sesuai dengan const-ness objek.
* Fungsi bertanda const dapat dipanggil oleh objek const maupun non-const, sementara fungsi non-const tidak dapat dipanggil pada objek const.