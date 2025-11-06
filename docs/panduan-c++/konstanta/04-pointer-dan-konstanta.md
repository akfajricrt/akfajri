---
title: Pointer & Konstanta
sidebar_label: 4. Pointer & Const
---

### Makna posisi `const` pada pointer

```cpp
// The pointed variable is a constant
const char * pc="asdf";
pc[3]='a';       /* wrong */
pc = "efgh";    /* ok */

// The pointer itself is a constant
char * const cp="asdf";
cp [3]='a';    /* ok */
cp  = "efgh";  /* wrong */

// Both are constants
const char * const p="asdf";
p[3]='a';  p="efgh";   /* both wrong */

```

* `const char *pc` → pointer ke data konstan. Anda boleh memindahkan pointer-nya (`pc = ...`), tapi tidak boleh mengubah isi yang ditunjuk (`pc[3] = ...` salah).

* `char * const cp` → pointer konstan ke data non-konstan. Anda tidak boleh memindahkan pointer-nya (`cp = ..`. salah), tetapi boleh mengubah isi yang ditunjuk (`cp[3] = ...` benar secara aturan tipe).

* `const char * const p` → pointer konstan ke data konstan. Tidak boleh memindahkan pointer dan tidak boleh mengubah isi.

Catatan penting (C++ modern): literal `string ("asdf")` bertipe `const char[N]` sehingga tidak boleh diikat ke `char*`. Baris `char * const cp="asdf";` tidak valid di C++11+. Contoh di atas bersifat historis untuk menjelaskan pola konstness. Dalam kode modern, gunakan const char* untuk literal string.

### Konversi dan assignment compatibility
```cpp
int d = 1;
const int e = 2;
int* u = &d; // OK -- d not const
//!   int * v = & e; // Illegal -- e const
int * w = (int*) & e; // Legal but bad practice
int main( ) {  }
```

* Anda boleh menugaskan alamat objek non-const ke `int* (u = &d)`.

* Anda tidak boleh menurunkan kekonstanan: `int* v = &e;` ilegal karena mencoba menghapus `const` secara implisit.

* Cast paksa `((int*)&e)` memang bisa dikompilasi, tetapi:

* * Mengubah nilai lewat pointer itu akan menjadi Undefined Behavior (UB).

* * Ini disebut `cast` away `const` dan sangat tidak dianjurkan.

### Praktik baik

* Jika Anda hanya perlu membaca data: gunakan `const T*` (pointer ke konstan).

* Untuk API yang menerima baik objek const maupun non-const tanpa mengubahnya, deklarasikan parameter sebagai `const T*` atau `const T&`.

* Hindari C-style `cast` untuk melepas `const`. Jika terpaksa (mis. interfacing dengan API lama), gunakan const_cast secara eksplisit dan jangan menulis balik ke objek semula.