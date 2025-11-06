---
title: Logical vs Bitwise Const & `mutable`
sidebar_label: 8. Logical vs Bitwise Const
---

### 1. *Bitwise constness* (konstansi secara fisik)

Secara default, ketika sebuah fungsi anggota diberi label `const`, compiler memastikan bahwa fungsi itu **tidak mengubah bit apa pun dari objek tersebut** — disebut *bitwise constness* (konstansi secara fisik).

Contoh berikut memperlihatkan upaya untuk “menipu” aturan itu.

```cpp
class Y {
  int i;
public:
  Y( );
  void f( ) const;
};
Y::Y( ) { i = 0; }

void Y::f( ) const {
  //!  i++; // Error -- const member function

  ( (Y*)this )->i++; // OK: cast away const-ness
  // Better: use C++ explicit cast syntax:
  ( const_cast<Y*>(this) )->i++;
}
```
**Penjelasan:**
* Fungsi `f()` bertipe `const`, sehingga this otomatis bertipe `const Y*`.

    Artinya, setiap perubahan ke anggota (seperti `i++`) dilarang.
* Namun, dengan `cast`, kita dapat memaksa menghapus `const` pada `this`.

    Itulah yang disebut cast away constness.

**Masalahnya**
Meskipun “berhasil” di-compile, hal ini adalah undefined behavior jika objek yang sebenarnya memang konstan (`const Y y;`).
Kompiler berasumsi fungsi const tidak mengubah objek, sehingga optimisasi bisa membuat hasilnya tak terduga.

**Singkatnya**
Jangan pernah menghapus `const` untuk mengubah data dari fungsi `const`. Itu berpotensi bug serius dan melanggar kontrak `const`.


### 2. Logical constness dan solusi dengan mutable

Sering kali, kita punya kebutuhan untuk mengubah bagian tertentu dari objek walaupun fungsi secara logika dianggap “tidak mengubah keadaan utama objek.”
Misalnya: menyimpan cache, penghitung (`counter`), atau flag internal.

Contoh:
```cpp
class Z {
  int i;
  mutable int j;
public:
  Z( );
  void f( ) const;
};
Z::Z( ) : i(0), j(0) {  }
void Z::f( ) const {
//! i++; // Error -- const member function
    j++; // OK: mutable
}
int main() {
  const Z zz;
  zz.f( ); // Actually changes it!
}
```

**Penjelasan**
* `i` tidak bisa diubah karena fungsi `f()` bertipe `const`.

* `j` bertanda `mutable`, sehingga dikecualikan dari pemeriksaan `const`.

* `mutable` berarti: boleh diubah bahkan dalam konteks `const member function`.

Dengan kata lain:

mutable memungkinkan perubahan “non-logis” yang tidak dianggap mengubah keadaan semantik objek.


### 3. Logical vs Bitwise Constness

| Jenis Konstansi       | Definisi                                                                                                    | Contoh          | Tujuan                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | --------------- | ---------------------------------------- |
| **Bitwise Constness** | Tidak ada bit dari objek yang berubah secara fisik dalam fungsi `const`                                     | `i++`          | Diterapkan otomatis oleh compiler        |
| **Logical Constness** | Secara konsep, keadaan “logis” objek tidak berubah, walau ada beberapa modifikasi internal (cache, counter) | `mutable j++`  | Memberi fleksibilitas dalam desain kelas |


**Contoh kasus nyata penggunaan `mutable`**
* Cache hasil perhitungan (misal length pada `std::string`).
* *Lazy initialization* pada objek yang datanya dihitung saat dibutuhkan.
* Penghitung statistik pemanggilan fungsi (tanpa mengubah status logis objek).


### 4. Konsep penting
* Dalam fungsi `const`, pointer this bertipe `const ClassName*`.
* Anggota bertanda `mutable` adalah satu-satunya pengecualian.
* Menghapus `const` dengan `const_cast` untuk memodifikasi data dari objek konstan adalah `undefined behavior`.
* `mutable` digunakan bukan untuk melemahkan `const`, tapi untuk mendukung logical constness yang sah secara desain.

### 5. Ringkasan Praktik Baik
Gunakan `mutable` jika:
* Atribut bersifat internal (tidak memengaruhi status eksternal objek).
* Perubahan hanya bersifat cache, flag, atau statistik internal.

Jangan gunakan *cast away const* untuk memodifikasi data dari fungsi `const`.