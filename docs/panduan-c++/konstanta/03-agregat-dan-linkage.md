---
title: Konstanta Agregat & Linkage
sidebar_label: 3. Agregat & Linkage
---

### Konstanta pada Agregat

```cpp
const int i[ ] = { 1, 2, 3, 4 };
//! float f[ i[3] ]; // Illegal
struct S { int i, j; };
const S s[ ] = { { 1, 2 }, { 3, 4 } };
//! double d[ s[1].j  ]; // Illegal
int main( ) { }
```

Inti masalahnya: ukuran array di C++ harus berupa constant expression (ekspresi yang diketahui saat kompilasi).
Ekspresi seperti `i[3]` atau `s[1].j` bukan constant expression—meskipun `i/s` bertipe `const`. Mengapa?

Constant expression tidak sekadar “nilai yang kebetulan tetap”; ia harus bisa dievaluasi murni pada waktu kompilasi tanpa mekanisme akses objek (seperti indexing/field access) yang tidak diizinkan dalam evaluasi konstan.

`i[3]` membutuhkan operasi indexing pada sebuah objek array; ini bukan bagian dari himpunan operasi yang boleh dievaluasi sebagai integral constant expression untuk menentukan ukuran array.

Demikian pula `s[1].j` memerlukan akses anggota dari sebuah objek struct; ini juga tidak memenuhi syarat constant expression untuk ukuran array.

Ringkasnya: const pada objek/array/struct tidak otomatis menjadikan semua ekspresi yang melibatkannya sah sebagai constant expression untuk ukuran array statis.


### Cara yang benar untuk konstanta ukuran array:

Gunakan enum nilai, `static const int` (untuk integral), atau constexpr:

```cpp
enum { N = 100 };
int a[N];

struct B { static const int Size = 64; };
int b[B::Size];

constexpr int M = 32;
int c[M];
```

### Internal vs External Linkage

Contoh berikut menunjukkan perilaku linkage dari `const` di tingkat global (namespace scope):

```cpp
// f1.cpp
const int i=1;
int main() { int x; x=i; }

// f2.cpp
const int i=2;
void func() { int y; y=i; }
```

* const global secara default memiliki internal linkage di C++ → masing-masing berkas .cpp memiliki definisi tersendiri untuk nama yang sama `(i)`, sehingga tidak saling berbenturan.

* Artinya, i pada f1.cpp berbeda entitas dengan `i` pada `f2.cpp`.

Jika ingin satu konstanta global yang dapat dipakai lintas berkas, gunakan extern:

```cpp
// f1.cpp
extern const int i;
int main() { int x; x=i; }

// f2.cpp
extern const int i=2;
void func() { int y; y=i; }
```
### Penjelasan:
* bextern const int i; menyatakan bahwa i didefinisikan di tempat lain (memiliki external linkage).

* Satu berkas harus menyediakan definisi dengan nilai konkret. Dalam pola yang umum:

* * Deklarasi di header (mis. config.hpp):

```cpp
// config.hpp
extern const int i;
```

* * Definisi di satu TU (mis. config.cpp):
```cpp

// config.cpp
const int i = 2;
```
* * Penggunaan di berkas lain cukup #include "config.hpp".
Catatan: Menulis extern `const int i = 2;` di lebih dari satu berkas akan menggandakan definisi dan melanggar One Definition Rule (ODR). Pastikan hanya ada satu definisi bernilai, sisanya deklarasi saja.

### Catatan praktik baik

* Gunakan constexpr untuk nilai yang wajib bisa dipakai sebagai constant expression (parameter template, ukuran array, dsb.).

* Untuk konstanta global lintas berkas:

* * Prefer `constexpr` (otomatis internal linkage kecuali extern constexpr) atau

* * extern const + satu definisi di berkas .cpp.

* * Hindari menjadikan ukuran array bergantung pada ekspresi yang melibatkan akses objek (indexing/field access). Gunakan nilai konstan murni seperti enum/static const int/constexpr.