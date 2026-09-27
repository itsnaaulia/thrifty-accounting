# THRIFTY — Sistem Akuntansi Penjualan Thrift Shop

THRIFTY merupakan sistem informasi sederhana yang dibuat untuk membantu pengelolaan usaha thrift shop, khususnya dalam pencatatan barang, pelanggan, transaksi penjualan, serta informasi keuangan.

## Tentang THRIFTY

THRIFTY merupakan usaha thrift yang menyediakan berbagai fashion preloved seperti atasan, bawahan, outer, dress, jumpsuit, hijab, dan aksesori.

Produk dipilih berdasarkan kondisi dan kelayakan pakai dengan harga yang lebih affordable.

## Tujuan Sistem

Sistem ini dibuat untuk membantu pengelolaan data usaha secara lebih rapi dan praktis, meliputi:

- Pengelolaan data barang
- Pengelolaan data pelanggan
- Pencatatan transaksi penjualan
- Pengelolaan stok barang
- Perhitungan omzet
- Perhitungan Harga Pokok Penjualan (HPP)
- Perhitungan laba kotor

## Fitur

### Dashboard
Menampilkan ringkasan:
- Total omzet
- Total transaksi
- Barang terjual
- Total HPP
- Laba kotor

### Data Barang
Digunakan untuk mencatat:
- Kode barang
- Nama barang
- Kategori
- Harga beli
- Harga jual
- Stok

### Data Pelanggan
Digunakan untuk menyimpan:
- Nama pelanggan
- Nomor HP
- Alamat

### Penjualan
Digunakan untuk mencatat:
- Tanggal transaksi
- Pelanggan
- Barang
- Jumlah barang
- Harga jual
- Total penjualan

Sistem juga mengurangi stok barang setelah transaksi penjualan.

## Unsur Akuntansi

Sistem menggunakan beberapa perhitungan dasar akuntansi:

**Subtotal:**

Harga Jual × Qty

**HPP:**

Harga Beli × Qty

**Laba Kotor:**

Total Penjualan − HPP

## Teknologi

- HTML
- CSS
- JavaScript
- Supabase
- Git
- GitHub
- Visual Studio Code

## Struktur Project

```text
thrifty-accounting/
├── README.md
├── backend/
│   └── README.md
└── frontend/
    ├── index.html
    ├── barang.html
    ├── pelanggan.html
    ├── penjualan.html
    └── js/
        ├── barang.js
        ├── dashboard.js
        ├── pelanggan.js
        ├── penjualan.js
        └── supabase.js