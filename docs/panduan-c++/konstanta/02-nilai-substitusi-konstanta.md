---
title: Nilai Substitusi & Konstanta Sederhana
sidebar_label: 2. Konstanta Sederhana
---

### Kenapa `const`?

`const` menyatakan bahwa sebuah nilai **tidak boleh diubah** setelah diinisialisasi. Manfaat utamanya:

- **Mencegah perubahan tak sengaja**  
  Compiler akan menolak assignment yang mencoba memodifikasi data bertanda `const`.
- **Membuka peluang optimisasi**  
  Nilai yang diketahui tetap bisa dipakai compiler untuk melipatkan konstanta, menghilangkan cabang, atau menyimpan di memori yang lebih efisien.
- **Lebih aman dibanding `#define`**  
  `const` tetap **bertipe** (type-checked). Makro `#define` hanya substitusi teks sehingga rawan bug yang baru ketahuan saat runtime.

---

### Bedah kode contoh

```cpp
#include <iostream>
using namespace std;

const int i = 100;      // Konstanta integral dengan nilai 100
const int j = i + 10;   // Masih konstanta (110), dihitung saat kompilasi
long address = (long) & j;   // Mengambil alamat j → memaksa j benar-benar disimpan (odr-used)
char buf [ j + 10 ];    // Ukuran array pakai ekspresi konstan (120), sah di C++

int main() {
  cout << "type a character & CR:";
  const char c = cin.get();  // Nilai yang dibaca lalu dikunci (tak bisa diubah)
  const char c2 = c + 'a';   // Operasi aritmetika karakter, hasilnya juga konstan (setelah dihitung)
  cout << c2;
  // ...
}

