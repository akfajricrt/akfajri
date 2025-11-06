---
title: Objek Konstan & Fungsi Anggota Konstan
sidebar_label: 7. Objek & Fungsi Konstan
---

### Contoh dari Materi: *Quoter*

```cpp
#include <iostream>
#include <cstdlib>   // Random number generator
#include <ctime>    // To seed random generator
using namespace std;

class Quoter {
    int lastquote;
public:
    Quoter();
    int lastQuote() const;
    const char* quote();
};

Quoter::Quoter(){
  lastquote = -1;
  srand( time(0) ); // Seed random number generator
}

int Quoter::lastQuote() const { 
  return lastquote;
}

const char* Quoter::quote( ) {
  static const char* quotes[ ] = {
   "Money is not everything. There's Mastercard & Visa",
   "Behind every successful man, there is a woman. \
        Behind every unsuccessful man, there are two",
   "Every man should marry. \
      After all, happiness is not the only thing in life."
  };

   const int qsize = sizeof quotes / sizeof *quotes;
   int qnum = rand( ) % qsize;
   while ( lastquote >= 0 && qnum == lastquote )
       qnum = rand( ) % qsize;
   return quotes [ lastquote = qnum ];
}

int main( ) {
  Quoter q;
  const Quoter cq;
  cq.lastQuote( );  // OK
  //!  cq.quote();    // wrong: non const function
  for(int i = 0; i < 20; i++)
    cout << q.quote() << endl;
}
```

### Penjelasan Konsep
1. Apa itu objek konstan?
    * Objek yang dideklarasikan dengan `const`:

        ```cpp
        const Quoter cq;
        ```
        berarti seluruh isi objek tidak boleh dimodifikasi.
    * Ini mencakup semua anggota non-static yang tidak bertanda mutable.

    * Karenanya, hanya fungsi anggota bertanda const yang boleh dipanggil pada objek seperti ini.

2. Fungsi anggota bertipe `const`

    Deklarasi fungsi seperti:
    ```cpp
    int lastQuote() const;
    ```
    menyatakan bahwa fungsi tidak akan mengubah data anggota dari objek (secara bitwise).
    Di dalam fungsi bertipe `const`, Anda tidak boleh:
    * mengubah nilai anggota non-mutable,
    * memanggil fungsi anggota lain yang tidak bertipe const.
    Jika melanggar, compiler akan memberi error.



    | Objek             | Fungsi yang bisa dipanggil                | Catatan                                                     |
    | ----------------- | ----------------------------------------- | ----------------------------------------------------------- |
    | `Quoter q`        | Semua fungsi (`const` maupun non-`const`) | Objek biasa, tidak terbatas                                 |
    | `const Quoter cq` | Hanya fungsi bertanda `const`             | Fungsi non-`const` seperti `quote()`  tidak bisa dipanggil |


    **Contohnya:**
    ```cpp
    cq.lastQuote(); //  OK: fungsi const
    cq.quote();     //  Error: fungsi non-const
    ```

3. Kenapa butuh fungsi anggota `const`?
    Menandai fungsi sebagai const punya beberapa manfaat penting:
    * Menjamin keamanan data: compiler mencegah fungsi tersebut mengubah isi objek.
    * Mendukung pemanggilan pada objek const (termasuk parameter referensi const).

    Meningkatkan optimisasi: compiler tahu fungsi ini tidak menimbulkan efek samping terhadap objek.

    Contoh:
    ```cpp
    void printQuote(const Quoter& q) {
        cout << q.lastQuote(); // bisa
        cout << q.quote();     // tidak bisa, quote() bukan const
    }

    ```
    Untuk memperbaiki, cukup ubah definisi menjadi:
    ```cpp 
    const char* quote() const;
    ```
    dan sesuaikan implementasinya. Dengan begitu, fungsi dapat dipanggil baik oleh objek biasa maupun objek konstan.

4. Bagaimana `const` bekerja di balik layar
    * Dalam fungsi anggota bertipe const, this bertipe `const ClassName*`.
        Itu artinya, Anda tidak bisa mengubah data melalui pointer this.

    * Dalam fungsi biasa, this bertipe `ClassName*` biasa (tidak konstan).

    Sehingga:
    ```cpp
    int lastQuote() const;   // this = const Quoter*
    const char* quote();    // this = Quoter*
    ```
5. Kesimpulan

    | Aspek                                  | Non-`const` Function | `const` Function |
    | -------------------------------------- | -------------------- | ---------------- |
    | Dapat mengubah data anggota            |  Ya                 |  Tidak          |
    | Dapat dipanggil oleh objek `const`     |  Tidak              |  Ya             |
    | Dapat dipanggil oleh objek non-`const` |  Ya                 |  Ya             |
    | `this` pointer bertipe                 | `Quoter*`            | `const Quoter*`  |


6. Praktik Baik
    * Tandai fungsi anggota sebagai const jika tidak mengubah keadaan objek.
        Ini membantu compiler, pembaca kode, dan meningkatkan keandalan.

    * Gunakan mutable hanya untuk data yang boleh berubah walau fungsi const (mis. cache, counter).

    * Kombinasikan dengan `const` & pada parameter agar efisien tanpa kehilangan keamanan tipe.

    Inti Materi:

    Fungsi `lastQuote()` bertipe const sehingga bisa dipanggil pada objek konstan `cq`.
    Fungsi `quote()` tidak bertipe const, jadi tidak dapat dipanggil pada objek const `Quoter cq;`.
    Kata kunci const pada fungsi anggota adalah bentuk janji eksplisit bahwa fungsi tersebut tidak akan memodifikasi objek, dan itu diverifikasi langsung oleh compiler.