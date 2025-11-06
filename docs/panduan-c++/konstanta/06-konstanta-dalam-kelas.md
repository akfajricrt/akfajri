---
title: Konstanta dalam Kelas & Initialization List
sidebar_label: 6. Const di Kelas
---

Konstanta data anggota (`const`) **wajib** diinisialisasi saat objek dibuat. Di C++, itu dilakukan melalui **constructor initialization list** (bukan di badan konstruktor).

```cpp
#include <iostream>
using namespace std;
class Fred {
  const int size;
public:
  Fred(int sz);
  void print();
};
Fred::Fred(int sz): size(sz) {  }
void Fred::print() { cout << size << endl; }

int main() {
  Fred a(1), b(2), c(3);
  a.print(), b.print(), c.print();
}

```
#### Penjelasan

* `const int size;` adalah data anggota konstan → nilainya hanya bisa ditetapkan sekali, tepat saat konstruksi objek.
* `Fred::Fred(int sz): size(sz) {}` memakai `member-initializer` `list` untuk mengisi `size`.
    Menaruh `size = sz;` di badan konstruktor (kurung kurawal) tidak boleh untuk `const` member—sudah terlambat karena objek telah terbangun.
* Metode print() aman hanya membaca size.

### Versi dengan default constructor
Kode berikut menambahkan ctor tanpa argumen dengan nilai baku untuk size.
```cpp
#include <iostream>
using namespace std;
class Fred {
    const int size;
public:
    Fred( );
    Fred( int sz );
    void print( );
};
Fred::Fred( ): size(0) { }
Fred::Fred( int sz ): size( sz ) {  }
void Fred::print( ) { cout << size << endl;  }

int main( ) {
    Fred a(1), b(2), c(3);
    Fred d;
    a.print(), b.print(), c.print();
}
```

#### Poin penting:
* `Fred(): size(0) {}` memberi nilai default saat tidak ada argumen.
* `Fred(int sz): size(sz) {}` tetap menggunakan `initializer list`.
* Anda tidak bisa menunda pengisian `size` ke badan konstruktor.     
    Alternatif modern (C++11+): default member initializer
    `class Fred { const int size = 0; ... };`
    Lalu konstruktor berparameter masih bisa menimpa via `initializer list: Fred(int sz):size(sz) {}`.

### Ukuran tetap di dalam kelas
Untuk membuat array anggota dengan ukuran konstan yang diketahui saat kompilasi, gunakan `enum` atau `static const` integral (atau `constexpr`).

```cpp
class Bunch {
  enum { size = 1000 };
  int i [size];
};
```

