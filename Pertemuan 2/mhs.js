const dataMhs = [
    {
        id:20,
        nama: "Eva",
        hobby: ["Membaca","Menulis"]
    },
    {
        id:21,
        nama: "Dewi",
        hobby: "Pinjam Seratus Dulu"
    },
    {
        id:22,
        nama: "Rina",
        hobby: "Kita lanjut wa ya"
    }
];

console.log(dataMhs);

const mhs = dataMhs[0];

// 1.1 Destructuring objek
//const nama = nama.mhs; //old style

const {nama, hobby} = mhs;
console.log(nama);

// 1.2 Destructuring array
// const mhs1 = dataMhs[1]; // old style
// const mhs2 = dataMhs[2]; // old style sama
const [mhs1,... MhsLainnya] = dataMhs;
console.log(MhsLainnya);

// 2. Add data ke objek
const newMhs = {
    id: 23,
    nama: "Sari",
    nim:"A11.2019.12345",
    organisasi:["Himpunan Mahasiswa","UKM"]
}

const listNewMhs = [
    newMhs,
    ...dataMhs
]

console.log(listNewMhs);


// operator: ?
const status = mhs.aktif;

const cekStatus = (status) => status ? 'standby lobby' : 'afk';


//template literal
console.log('Status mhs ${nama} statusnya ${cekStatus(mhs1.aktif)}');