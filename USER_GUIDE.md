# Panduan Pengguna Sistem POS

## 📋 Daftar Isi
1. [Memulai](#memulai)
2. [Dashboard](#dashboard)
3. [Kasir POS](#kasir-pos)
4. [Keranjang Belanja](#keranjang-belanja)
5. [Manajemen Item](#manajemen-item)
6. [Riwayat Transaksi](#riwayat-transaksi)
7. [Manajemen Kategori](#manajemen-kategori)

---

## Memulai

### Login
1. Buka `http://localhost:8000`
2. Masuk dengan akun Anda
3. Anda akan diarahkan ke Dashboard

### Navigasi Utama
Terletak di bilah navigasi atas:
- **Dashboard** - Lihat statistik dan ringkasan penjualan
- **Cashier POS** - Interface kasir utama untuk penjualan
- **Items** - Kelola produk (tambah, edit, hapus, unggah gambar)
- **History Transaksi** - Lihat transaksi dan struk sebelumnya
- **Categories** - Kelola kategori produk

---

## Dashboard

### Ikhtisar
Dashboard menampilkan statistik bisnis penting sekilas.

### Kartu Statistik
Menampilkan:
- **Jumlah Kategori** - Total kategori produk
- **Jumlah Item** - Total produk di inventori
- **Total Transaksi** - Jumlah transaksi yang diproses
- **Total Penjualan** - Total pendapatan yang dihasilkan

### Tautan Cepat
Pintas ke halaman yang sering digunakan:
- Tambah item baru
- Lihat semua item
- Proses pesanan (Kasir)
- Lihat riwayat transaksi

**Tips:**
- Periksa dashboard setiap hari untuk kinerja penjualan
- Pantau status inventori melalui jumlah item
- Lacak pertumbuhan bisnis melalui metrik transaksi

---

## Kasir POS

### Interface Belanja Utama
Interface utama untuk memproses pesanan pelanggan.

### Fitur-Fitur

#### 1. **Tampilan Produk**
- Tata letak grid menampilkan semua produk yang tersedia
- Kartu produk mencakup:
  - Gambar produk (atau ikon placeholder 🥪)
  - Nama produk
  - Harga dalam Rupiah (Rp)
  - Status ketersediaan stok
  - Tombol tambah ke keranjang
  - Input jumlah

#### 2. **Filter Kategori**
- Tombol filter yang dapat digulir horizontal di atas
- **"Semua Item"** - Menampilkan semua produk
- Tombol kategori - Filter berdasarkan kategori tertentu
- Kategori yang dipilih ditampilkan dengan warna biru

#### 3. **Keranjang Belanja**
- Ikon keranjang di kanan atas dengan lencana yang menunjukkan jumlah item
- Klik ikon keranjang untuk melihat keranjang Anda

#### 4. **Tambah Item ke Keranjang**
Langkah-langkah:
1. Pilih jumlah yang diinginkan menggunakan input angka
2. Klik tombol "Tambah"
3. Item secara otomatis ditambahkan ke keranjang
4. Lencana jumlah keranjang diperbarui
5. Lanjutkan ke halaman keranjang menggunakan ikon keranjang

#### 5. **Manajemen Stok**
- Produk menampilkan "X tersisa" menunjukkan stok yang tersedia
- Item yang kehabisan stok ditampilkan pudar (abu-abu)
- Tidak dapat menambahkan item yang kehabisan stok ke keranjang
- Stok hanya berkurang setelah checkout berhasil

**Tips:**
- Gunakan filter kategori untuk menemukan produk dengan cepat
- Periksa status stok sebelum menambahkan item
- Gulir melalui grid produk untuk melihat semua item
- Masukkan jumlah khusus sebelum menambahkan (maks = stok tersedia)

---

## Keranjang Belanja

### Ikhtisar Halaman Keranjang
Tinjau dan kelola item sebelum checkout.

### Isi Keranjang
Tabel menampilkan:
- Nama produk
- Jumlah yang dipesan
- Harga satuan
- Subtotal per item
- Tombol hapus untuk setiap item

### Aksi Keranjang

#### 1. **Ubah Jumlah**
- Gunakan tombol +/- per item untuk menyesuaikan jumlah
- Jumlah maksimum = stok yang tersedia
- Jumlah minimum = 1

#### 2. **Hapus Item**
- Klik tombol "Hapus" di sebelah item mana pun
- Item segera dihapus dari keranjang
- Total keranjang diperbarui secara otomatis

#### 3. **Lihat Total**
- **Subtotal** - Jumlah semua item
- **Dibayar** - Jumlah yang dibayar pelanggan
- **Kembalian** - Uang kembalian kepada pelanggan

#### 4. **Checkout**
- Masukkan jumlah yang dibayar di bidang "Dibayar"
- Klik tombol "Checkout"
- Sistem memvalidasi jumlah pembayaran
- Pembayaran harus ≥ subtotal

#### 5. **Batalkan Pesanan**
- Klik tombol "Batal"
- Menghapus seluruh keranjang
- Kembali ke halaman Kasir dengan keranjang kosong

### Alur Pembayaran
1. Tinjau total keranjang
2. Masukkan jumlah pembayaran
3. Sistem menghitung kembalian
4. Klik "Checkout"
5. Transaksi dibuat
6. Stok secara otomatis berkurang
7. Struk dihasilkan

**Tips:**
- Selalu verifikasi jumlah item sebelum checkout
- Pastikan jumlah pembayaran mencakup subtotal
- Kembalian dihitung secara otomatis
- Struk dapat dicetak atau disimpan setelah checkout

---

## Manajemen Item

### Buka Halaman Item
1. Klik **"Items"** di navigasi
2. Menampilkan semua produk dalam format tabel

### Kolom Tabel
- **ID** - Pengidentifikasi produk
- **Image** - Thumbnail produk
- **Category** - Kategori produk
- **Name** - Nama produk
- **Price** - Harga dalam Rupiah
- **Stock** - Jumlah yang tersedia
- **Actions** - Tombol Edit/Hapus

### Tambah Item Baru

#### Bidang Formulir
1. **Category** - Pilih dari dropdown
2. **Item Name** - Nama produk (teks)
3. **Price (Rp)** - Harga dalam Rupiah (angka)
4. **Stock Qty** - Jumlah awal (angka)
5. **Image** - Unggah foto produk (opsional)

#### Langkah untuk Menambah
1. Isi semua bidang yang diperlukan
2. (Opsional) Klik "Pilih file" untuk mengunggah gambar produk
3. Klik tombol **"Simpan"**
4. Item ditambahkan ke inventori
5. Tabel diperbarui secara otomatis
6. Formulir dihapus untuk entri berikutnya

#### Format Gambar yang Didukung
- JPEG
- PNG
- JPG
- GIF
- Ukuran file maksimum: 2MB

### Edit Item

#### Langkah untuk Edit
1. Klik tombol **"Edit"** di sebelah item yang diinginkan
2. Formulir diisi sebelumnya dengan nilai saat ini
3. Ubah bidang apa pun sesuai kebutuhan
4. (Opsional) Unggah gambar baru untuk mengganti yang lama
5. Klik tombol **"Update"**
6. Perubahan disimpan segera
7. Klik **"Cancel"** untuk membatalkan perubahan

#### Apa yang Dapat Diubah
- Kategori
- Nama Item
- Harga
- Jumlah stok
- Gambar produk

### Hapus Item

#### Langkah untuk Menghapus
1. Klik tombol **"Delete"** di sebelah item
2. Dialog konfirmasi muncul
3. Konfirmasi penghapusan
4. Item dihapus dari inventori
5. Tidak dapat dibatalkan

**⚠️ Peringatan:** Penghapusan bersifat permanen. Item dengan transaksi yang ada tidak dapat dihapus.

### Unggah Gambar

#### Unggah Gambar Baru
1. Klik tombol "Pilih file" di bidang Gambar
2. Pilih gambar dari komputer Anda
3. File harus: JPEG, PNG, JPG, atau GIF
4. Ukuran maksimum: 2MB
5. Klik Simpan/Update

#### Penyimpanan Gambar
- Gambar disimpan di `storage/app/public/items/`
- Dapat diakses di `/storage/items/filename.jpg`
- Gambar ditampilkan sebagai thumbnail di tabel
- Ditampilkan di kartu produk halaman kasir

#### Tips Gambar
- Gunakan foto produk yang jelas dan berkualitas tinggi
- Ukuran yang disarankan: 500x500px
- Menampilkan "Tidak ada gambar" jika tidak ada foto yang diunggah
- Emoji fallback (🥪) ditampilkan di kasir jika tidak ada gambar

### Manajemen Inventori

#### Periksa Stok
- Lihat kolom "Stock" di tabel
- Lencana hijau = >10 item di stok
- Lencana merah = ≤10 item (stok rendah)

#### Tambah Stok
1. Klik **"Edit"** pada item yang diinginkan
2. Ubah nilai "Stock Qty"
3. Klik **"Update"**
4. Jumlah stok diperbarui

#### Hapus Item Stok Rendah
1. Atur stok ke 0 untuk menyembunyikan dari kasir
2. Atau hapus item sepenuhnya menggunakan tombol Hapus

---

## Riwayat Transaksi

### Buka Riwayat
1. Klik **"History Transaksi"** di navigasi
2. Menampilkan semua transaksi yang selesai

### Daftar Transaksi

#### Kolom Tabel
- **ID** - Nomor transaksi
- **Date** - Stempel waktu transaksi
- **Cashier** - Nama staf anggota
- **Total** - Jumlah transaksi
- **Receipt** - Tautan untuk melihat detail

#### Pengurutan & Penyaringan
- Transaksi ditampilkan dalam urutan terbaru-pertama
- Tampilan terpaginasi (jika banyak transaksi)
- Gunakan tombol paginasi untuk menavigasi

### Lihat Struk (Receipt)

#### Isi Struk
1. **Header** - ID Transaksi dan tanggal
2. **Nama Kasir** - Staf yang memproses pesanan
3. **Daftar Item** - Setiap item dengan:
   - Nama produk
   - Jumlah
   - Harga satuan
   - Subtotal
4. **Informasi Pembayaran**:
   - Subtotal (Rp)
   - Jumlah yang dibayar (Dibayar)
   - Kembalian

#### Melihat Struk
1. Temukan transaksi di daftar riwayat
2. Klik tautan **"Receipt"** biru
3. Halaman struk terbuka dengan detail lengkap
4. Dapat dicetak menggunakan fungsi cetak browser

#### Cetak Struk
1. Buka halaman struk
2. Tekan `Ctrl+P` (atau Command+P di Mac)
3. Pilih printer
4. Pilih pengaturan cetak
5. Klik Cetak

**Tips:**
- Simpan catatan transaksi untuk akuntansi
- Cetak struk untuk catatan pelanggan
- Struk menunjukkan rekonsiliasi pembayaran
- ID Transaksi berguna untuk sengketa/pengembalian dana

---

## Manajemen Kategori

### Buka Kategori
1. Klik **"Categories"** di navigasi
2. Menampilkan semua kategori produk

### Lihat Kategori
Tabel menampilkan:
- **ID** - Pengidentifikasi kategori
- **Name** - Nama kategori
- **Actions** - Tombol Edit/Hapus

### Tambah Kategori Baru
1. Masukkan nama kategori di formulir
2. Klik tombol **"Simpan"**
3. Kategori dibuat segera
4. Tersedia untuk penugasan produk

### Edit Kategori
1. Klik tombol **"Edit"** di sebelah kategori
2. Ubah nama kategori
3. Klik **"Update"**
4. Perubahan diterapkan ke semua produk dalam kategori ini

### Hapus Kategori
1. Klik tombol **"Delete"**
2. Konfirmasi penghapusan
3. Kategori dihapus

**Catatan:** Tidak dapat menghapus kategori dengan produk yang ditugaskan.

---

## Alur Kerja Umum

### Alur Kerja 1: Pesanan Pelanggan Baru
1. Buka **Cashier POS**
2. Jelajahi produk (gunakan filter kategori jika diperlukan)
3. Tambah item ke keranjang
4. Klik ikon keranjang untuk tinjau
5. Masukkan jumlah pembayaran
6. Klik Checkout
7. Struk muncul - cetak atau simpan

### Alur Kerja 2: Tambah Produk Baru
1. Buka **Items**
2. Isi detail produk
3. Unggah gambar produk
4. Klik Simpan
5. Produk sekarang tersedia di Kasir

### Alur Kerja 3: Perbarui Info Produk
1. Buka **Items**
2. Klik Edit pada produk
3. Ubah detail/gambar sesuai kebutuhan
4. Klik Update
5. Perubahan segera berlaku

### Alur Kerja 4: Periksa Penjualan Harian
1. Buka **Dashboard**
2. Lihat statistik
3. Periksa Total Penjualan (pendapatan)
4. Buka **History Transaksi** untuk detail
5. Unduh/cetak daftar transaksi jika diperlukan

---

## Pemecahan Masalah

### Masalah: Item tidak muncul di Kasir
**Solusi:** Periksa jumlah stok. Item dengan stok 0 tersembunyi.

### Masalah: Tidak dapat mengunggah gambar
**Solusi:** 
- Periksa format file (hanya JPEG, PNG, JPG, GIF)
- Periksa ukuran file (maks 2MB)
- Pastikan formulir menyertakan encType="multipart/form-data"

### Masalah: Checkout menampilkan kesalahan validasi
**Solusi:**
- Pastikan jumlah pembayaran ≥ total keranjang
- Verifikasi semua item masih di stok
- Coba menghapus dan menambah kembali item

### Masalah: Bidang formulir menampilkan required meski ada nilai
**Solusi:** Segarkan halaman dan coba lagi. Pastikan file gambar dipilih dengan benar.

### Masalah: Gambar tidak menampilkan di keranjang
**Solusi:**
- Periksa tautan penyimpanan dibuat: `php artisan storage:link`
- Verifikasi file gambar diunggah ke `storage/app/public/items/`
- Periksa cache browser (Ctrl+Shift+R untuk segarkan paksa)

---

## Keamanan Data

### Perlindungan Inventori
- Stok divalidasi sisi server selama checkout
- Mencegah penjualan berlebih bahkan dengan pesanan bersamaan
- Pengurangan stok otomatis setelah pembayaran berhasil

### Catatan Transaksi
- Semua transaksi dicatat dengan stempel waktu
- Terhubung ke akun pengguna kasir
- Tidak dapat diedit setelah dibuat
- Jejak audit permanen dipertahankan

---

## Tips & Praktik Terbaik

✅ **Lakukan:**
- Unggah gambar produk yang jelas
- Jaga level stok tetap diperbarui
- Periksa riwayat transaksi secara teratur
- Pantau item stok rendah
- Cetak struk untuk catatan pelanggan

❌ **Jangan:**
- Hapus item yang memiliki transaksi (akan menyebabkan masalah)
- Unggah gambar lebih besar dari 2MB
- Proses checkout tanpa jumlah pembayaran
- Ubah catatan transaksi setelah dibuat

---

## Dukungan & Pertanyaan

Untuk masalah teknis atau pertanyaan tentang sistem POS:
- Periksa bagian Pemecahan Masalah di atas
- Hubungi administrator sistem
- Tinjau log server jika diperlukan

---

**Terakhir Diperbarui:** 2 April 2026
**Versi:** 1.0
