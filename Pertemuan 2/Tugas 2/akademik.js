// Contoh data mahasiswa

const mahasiswaList = {
    mahasiswa: [
      {
        nim: "22001",
        nama: "Eva Fadhillah Ulia",
        status: true,
        matkul: [
          { matkulId: "MK001", tugas: 80, uts: 85, uas: 90 },
          { matkulId: "MK002", tugas: 75, uts: 80, uas: 85 }
        ]
      },
      {
        nim: "22002",
        nama: "Dwi Yuliyanti",
        status: false,
        matkul: [
          { matkulId: "MK001", tugas: 70, uts: 75, uas: 80 }
        ]
      }
    ]
  };
  
  // Contoh data mata kuliah
  const mataKuliahList = {
    mataKuliah: [
      { kode: "MK001", nama: "Matematika", sks: 3 },
      { kode: "MK002", nama: "Pemrograman", sks: 4 },
      { kode: "MK003", nama: "Jaringan Komputer", sks: 2 }
    ]
  };
  
  // 1. Menampilkan Semua Data Mahasiswa
  const show = () => {
    mahasiswaList.mahasiswa.forEach((mhs) => {
      console.log(`NIM: ${mhs.nim}, Nama: ${mhs.nama}, Status: ${mhs.status ? "Aktif" : "Tidak Aktif"}`);
      console.log("Mata Kuliah:");
      mhs.matkul.forEach((mk) => {
        const matkulName = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId).nama;
        console.log(`- ${matkulName}: Tugas ${mk.tugas}, UTS ${mk.uts}, UAS ${mk.uas}`);
      });
    });
  };
  
  // 2. Menambah Mahasiswa Baru
  const add = (mahasiswa) => mahasiswaList.mahasiswa.push(mahasiswa);
  
  add({
    nim: "22003",
    nama: "Andi Setiawan",
    status: true,
    matkul: [{matkulId: "MK003", tugas: 88, uts: 85, uas: 90}]
  });
  console.log(mahasiswaList);
  
  // 3. Mengupdate Mahasiswa
  const update = (nim, dataBaru) => {
    mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.map((m) =>
      m.nim === nim ? { ...m, ...dataBaru } : m
    );
  };

  update("22001", {status: false});
  console.log(mahasiswaList);
  
  // 4. Menghapus Mahasiswa berdasar NIM
  const deleteById = (nim) => {
    mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter((m) => m.nim !== nim);
  };

  deleteById("22002");
  console.log(mahasiswaList);
  
  // 5. Menghitung Total Nilai
  const totalNilai = (nim) => {
    const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
    if (!mahasiswa) return "Mahasiswa tidak ditemukan";
  
    return mahasiswa.matkul.map((mk) => {
      const total = mk.tugas + mk.uts + mk.uas;
      return { matkulId: mk.matkulId, total };
    });
  };
  console.log(totalNilai("22001"));
  
  // 6. Mengelompokkan Mahasiswa Berdasarkan Kategori Nilai
  const kategoriNilai = (nilai) => {
    if (nilai >= 85) return "A";
    if (nilai >= 75) return "B";
    if (nilai >= 65) return "C";
    if (nilai >= 50) return "D";
    return "E";
  };

  console.log(kategoriNilai(88));
  console.log(kategoriNilai(72));
  
  // 7. Menghitung IPS Mahasiswa
  const IPS = (nim) => {
    const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
    if (!mahasiswa) return "Mahasiswa tidak ditemukan";
    if (mahasiswa.matkul.length === 0) return "Mahasiswa belum memiliki mata kuliah";
  
    let totalSks = 0;
    let totalNilai = 0;
  
    for (const mk of mahasiswa.matkul) {
      const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
      if (!matkul) {
        console.log(`Mata kuliah dengan kode ${mk.matkulId} tidak ditemukan.`);
        return "Kesalahan pada data mata kuliah";
      }
  
      const nilaiAkhir = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
      totalNilai += nilaiAkhir * matkul.sks;
      totalSks += matkul.sks;
    }
  
    return (totalNilai / totalSks).toFixed(2);
  };
  
  // Contoh pemanggilan
  console.log(`IPS Mahasiswa 22001: ${IPS("22001")}`);
  
  // 8. Menghapus semua data mahasiswa
  const clear = () => {
    mahasiswaList.mahasiswa = []; // Mengosongkan array mahasiswa
    console.log("Semua data mahasiswa telah dihapus.");
  };
  clear();
  console.log(mahasiswaList); // Akan menampilkan objek dengan array kosong
  
  

  // Array of Object (List Mahasiswa)

  // 1. Menghitung Jumlah Mahasiswa
  const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;
  console.log(`Jumlah Mahasiswa: ${jumlahMahasiswa()}`);
  
  // 2. Mengurutkan Mahasiswa berdasarkan NIM
  const sortByNIM = () => [...mahasiswaList.mahasiswa].sort((a, b) => a.nim.localeCompare(b.nim));
  sortByNIM();
  console.log(mahasiswaList);
  
  // 3. Mengurutkan Mahasiswa Berdasarkan status (Aktif/Tidak Aktif)
  const sortByStatus = () => {
    mahasiswaList.mahasiswa.sort((a, b) => b.status - a.status);
    console.log("Mahasiswa telah diurutkan berdasarkan status (Aktif -> Tidak Aktif).");
  };
  
  // Contoh pemanggilan fungsi
  sortByStatus();
  console.log(mahasiswaList);
  


  // 4. Menghitung Mahasiswa Aktif dan Tidak Aktif
  const jumlahAktifTidak = () => {
    return {
      aktif: mahasiswaList.mahasiswa.filter((m) => m.status).length,
      tidakAktif: mahasiswaList.mahasiswa.filter((m) => !m.status).length,
    };
  };
  
  console.log(jumlahAktifTidak());
  
   // 5. Menghapus semua data mahasiswa dari array
   const clearArray = () => {
    mahasiswaList.mahasiswa.length = 0; // Mengosongkan array dengan cara lebih optimal
    console.log("Semua data mahasiswa dalam array telah dihapus.");
  };
  
  // Contoh pemanggilan fungsi
  clearArray();
  console.log(mahasiswaList); // Akan menampilkan objek dengan array kosong
  