PANDUAN PERUBAHAN BACKGROUND UNDANGAN

Isi paket:
- index.html: slide 2 sudah diberi class slide-pembukaan
- style.css: background inti tetap fixed; slide 2 memiliki lapisan foto tambahan
- script.js: tetap gunakan file script.js milik proyekmu yang sekarang

CARA MEMASANG
1. Buat salinan/cadangan folder undangan digital lamamu.
2. Ganti index.html dan style.css dengan file dari paket ini.
3. Letakkan foto khusus untuk slide 2 ke folder assets milik proyekmu dengan nama:
   foto-pembukaan.jpg
4. Jangan hapus foto-cover.jpg. Foto itu tetap menjadi background inti seluruh undangan.
5. Buka index.html dan uji dengan menggulir dari slide 1 ke slide 2 lalu slide 3.

CARA KERJA
- .site-background tetap fixed sebagai background inti.
- Slide 2 memakai pseudo-element ::before sebagai foto tambahan.
- Ketika pengguna scroll ke slide 3, foto tambahan slide 2 ikut keluar dari layar.
- Slide tanpa class background tambahan tetap transparan dan memperlihatkan background inti.

MENAMBAHKAN FOTO PADA SLIDE LAIN
Contoh untuk slide 3:
1. Tambahkan class, misalnya: class="slide dark-slide slide-quote-bg"
2. Tambahkan aturan CSS:
   .slide-quote-bg {
       background: transparent;
       isolation: isolate;
   }
   .slide-quote-bg::before {
       content: "";
       position: absolute;
       inset: 0;
       z-index: -1;
       pointer-events: none;
       background:
         linear-gradient(rgba(0,0,0,.22), rgba(0,0,0,.48)),
         url("assets/foto-quote.jpg") center / cover no-repeat;
   }
3. Letakkan foto dengan nama foto-quote.jpg di folder assets.

Catatan:
- Foto harus berformat JPG dan namanya harus persis sama dengan yang ada di CSS.
- Jika foto pembukaan belum dimasukkan, background inti tetap ada, tetapi foto khusus slide 2 tidak akan tampil.
- File script.js tidak disertakan karena kamu belum mengirimkannya; pertahankan file script.js yang sekarang.
