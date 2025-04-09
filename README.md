# Fleetify Task

Project ini dirancang untuk membangun aplikasi Task Management berbasis web dengan fitur seperti create task, update task, delete task, filter task, dan complete task. Berikut adalah penjelasan project structure dan pendekatan yang digunakan:

---

### **Struktur Proyek**
```
.editorconfig
index.html
assets/
	empty.png
src/
	main.js
	events/
		clear-task.js
		filter.js
		form.js
	modules/
		dark-mode.js
		storage.js
		views.js
```

#### **1. File Konfigurasi**
- **`.editorconfig`**: Digunakan untuk menjaga konsistensi format kode di seluruh editor yang digunakan oleh pengembang. Misalnya, indentasi menggunakan spasi, ukuran indentasi 4, dan menghapus spasi kosong di akhir baris.

#### **2. File HTML**
- **`index.html`**: File utama yang berisi struktur antarmuka pengguna (UI). Elemen-elemen penting seperti form untuk menambahkan tugas, daftar tugas, filter, dan tombol untuk menghapus semua tugas didefinisikan di sini. File ini juga memuat skrip utama (`src/main.js`) untuk menginisialisasi aplikasi.

#### **3. Folder assets**
- **`empty.png`**: Gambar yang ditampilkan ketika tidak ada tugas dalam daftar.

#### **4. Folder src**
- **`main.js`**: Titik masuk aplikasi. File ini mengimpor modul dan event handler, lalu memanggil fungsi `renderTaskLists()` untuk menampilkan daftar tugas saat aplikasi dimuat.

##### **5. Folder `events`**
Berisi file-file yang menangani event pada elemen UI:
- **`form.js`**: Mengelola form untuk menambahkan atau memperbarui tugas. Menggunakan fungsi dari modul storage.js untuk menyimpan data dan views.js untuk memperbarui tampilan.
- **`filter.js`**: Mengelola filter tugas (semua, selesai, atau belum selesai). Memanggil fungsi `renderTaskLists()` untuk memperbarui daftar tugas berdasarkan filter yang dipilih.
- **`clear-task.js`**: Menangani tombol "Clear Task" untuk menghapus semua tugas dari daftar.

##### **6. Folder `modules`**
Berisi modul-modul untuk logika aplikasi:
- **`dark-mode.js`**: Mengelola mode gelap/terang berdasarkan preferensi pengguna yang disimpan di `localStorage`.
- **`storage.js`**: Mengelola data tugas di `localStorage`. Berisi fungsi untuk menambah, memperbarui, menghapus, dan mengambil daftar tugas.
- **`views.js`**: Bertanggung jawab untuk merender daftar tugas ke dalam elemen HTML. Juga menangani event pada elemen tugas seperti checkbox, tombol edit, dan tombol hapus.

---

### **Pendekatan yang Digunakan**
1. **Modularisasi**:
   - Proyek ini memisahkan logika aplikasi ke dalam modul-modul kecil yang spesifik untuk tugas tertentu. Misalnya, storage.js hanya menangani data, sedangkan views.js hanya menangani rendering UI.

2. **Event-Driven Programming**:
   - Event listener digunakan untuk menangani interaksi pengguna, seperti klik tombol, perubahan filter, atau pengiriman form. File di folder `events` mengelola event-event ini.

3. **Penyimpanan Data Lokal**:
   - Data tugas disimpan di `localStorage`, memungkinkan aplikasi untuk mempertahankan data meskipun halaman dimuat ulang.

4. **Dynamic Rendering**:
   - Daftar tugas dirender secara dinamis menggunakan JavaScript. Fungsi `renderTaskLists()` di views.js bertanggung jawab untuk memperbarui UI berdasarkan data yang ada.

5. **Responsif dan Interaktif**:
   - Menggunakan Tailwind CSS untuk membuat UI yang responsif dan modern.
   - Animasi seperti `fadeIn` ditambahkan untuk meningkatkan pengalaman pengguna.

6. **Dark Mode**:
   - Fitur dark mode diimplementasikan dengan memanfaatkan class dari Tailwidn CSS dan preferensi yang disimpan di `localStorage`.
