---
title: Argumen & Nilai Kembali Konstan
sidebar_label: 5. Argumen & Return
---

### Contoh 1 — Fungsi Mengembalikan Objek Konstan

```cpp
class X {
     int i;
public:
    X(int ii = 0);
    void modify( );
};
X::X ( int ii ) { i = ii; }
void X::modify(  ) { i++; }

X f5( ) {  return X( ); }
const X f6( ) {  return X( );  }

void f7( X & x) { // Pass by non-const reference
  x.modify( );
}

int main( ) {
  f5( ) = X(1); // OK -- non-const return value
  f5( ).modify( ); // OK
  f7( f5( ) );
// Causes compile-time errors:
//!  f6( ) = X(1);
//!  f6( ).modify( );
//!  f7( f6( ) );  // temporaries here
}
```

#### Penjelasan:
Kode di atas memperlihatkan dampak const terhadap nilai balik (return value) dan parameter fungsi.
1. `f5()` mengembalikan `X` tanpa `const`
        Nilai sementara (temporary) hasil return masih bisa dimodifikasi:
    * `f5() = X(1);` sah — objek sementara dapat di-assign.
    * `f5().modify();` sah — memanggil fungsi non-const.
2. `f6()` mengembalikan `const X`
        Nilai yang dikembalikan tidak boleh diubah:
    * `f6() = X(1);`  error — hasil return bertipe const.
    * `f6().modify();`  error — fungsi modify() tidak bertanda const.
    * `f7(f6());`  error — `f7()` menerima `X&`, bukan `const X&`, sementara `f6()` menghasilkan objek konstan (temporary const).

#### Kesimpulan
Jika fungsi mengembalikan `const` object, pemanggil tidak bisa mengubah atau memodifikasi hasil tersebut. Ini berguna untuk mencegah perubahan yang tidak disengaja pada temporary object.

### Contoh 2 — Parameter dan Tipe Kembali dengan Pointer Konstan

```cpp
void t( int* ) {  }
void u(const int* cip) {
   *cip = 2;
    int i = *cip; 
    int* ip2 = cip; 
}
const char* v( ) {
  // Returns address of static character array:
  return "result of function v()";
}
const int* const w(  ) {
  static int i;
  return &i;
}

int main() {
    int x = 0;      int* ip = &x;
    const int* cip = &x;
    t(ip); 
    t(cip); 
    u(ip);  
    u(cip); 
    char* cp = v( ); 
    const char* ccp = v(); 
    int* ip2 = w(); 
    const int* const ccip = w(); 
    const int* cip2 = w(); 
    *w( ) = 1; 
}
```

### Penjelasan Baris-per-Baris
* `void t(int*)`
Fungsi menerima pointer ke data non-konstan → boleh menulis lewat pointer.
* `void u(const int* cip)`
Menerima pointer ke data konstan → tidak boleh menulis ke `*cip`.
Pada tubuh fungsi:
```cpp
*cip = 2;      // error, mencoba ubah const
int i = *cip;  // boleh dibaca
int* ip2 = cip; // error, hilangkan const
```

* `const char* v()`
Mengembalikan pointer ke data konstan (string literal).
Pemanggil tidak boleh mengubah isi string "result of function v()".
* `const char* ccp = v();` benar.
`char* cp = v();` tidak aman (menghapus constness).

* `const int* const w()`
Mengembalikan pointer konstan ke data konstan (alamat i statik).
Artinya:
    * Anda tidak dapat mengubah pointer-nya (w() = ... salah).
    * Anda tidak dapat menulis ke data yang ditunjuk (*w() = ... salah).

### Kesalahan yang Ditunjukkan di Contoh
Pada main():
* `t(cip);`
Tidak sah karena t() butuh int* tapi cip bertipe const int* → kehilangan const.
* `u(ip);` 
Sah, karena u() hanya membaca data (tidak akan ubah x).
* `char* cp = v();` 
Tidak aman. Literal string ("result of function v()") bersifat konstan.
* `int* ip2 = w();` 
Tidak aman; w() mengembalikan const int* const.
* `*w() = 1;` 
Tidak boleh menulis ke data bertipe const.

### Inti Pembelajaran

| Konteks                    | Efek `const`                                    |
| -------------------------- | ----------------------------------------------- |
| **Parameter (pointer)**    | Mencegah fungsi memodifikasi data yang diterima |
| **Return value**           | Mencegah pemanggil mengubah hasil (temporary)   |
| **Pointer ke const**       | Data tidak boleh diubah                         |
| **Const pointer**          | Pointer tidak boleh diganti                     |
| **Const pointer to const** | Pointer dan data sama-sama tidak boleh diubah   |


### Rangkuman Praktik Baik
* Gunakan const untuk parameter yang tidak dimodifikasi:
```cpp
void printValue(const Data& d);
```
* Gunakan `const` untuk nilai balik agar pemanggil tidak mengubah hasil:
```cpp
const std::string getName() const;
```
* Hindari menurunkan kekonstanan (mis. menghapus `const` lewat cast).
* Untuk pointer, ingat urutannya:
    * `const int* p` → data konstan, pointer bebas
    * `int* const p` → pointer konstan, data bebas
    * `const int* const p` → keduanya konstan

### Kesimpulan umum
`const` membuat kontrak eksplisit antara pemberi data dan pengguna data, memastikan fungsi tidak memodifikasi hal-hal yang seharusnya bersifat tetap. Ini mendukung keamanan tipe (type safety) dan optimisasi kompilator.