export const QUESTIONS_DATA = [
    {
        id: 1,
        question: "Apa fungsi utama dari Hooks 'useState' di React/Preact?",
        options: [
        "A. Untuk membuat komponen baru",
        "B. Untuk menyimpan dan memanipulasi data status (state) di dalam komponen",
        "C. Untuk mengambil data dari API secara otomatis",
        "D. Untuk mengatur gaya CSS komponen"
        ],
        correctAnswer: "B. Untuk menyimpan dan memanipulasi data status (state) di dalam komponen"
    },
    {
        id: 2,
        question: "Manakah penulisan dependency array yang benar jika kita ingin 'useEffect' hanya berjalan SATU KALI saat komponen pertama kali dimuat?",
        options: [
        "A. Tidak perlu menulis dependency array sama sekali",
        "B. [state]",
        "C. []",
        "D. ['once']"
        ],
        correctAnswer: "C. []"
    },
    {
        id: 3,
        question: "Bagaimana cara mengirim data atau fungsi dari komponen induk (Bapak) ke komponen anak?",
        options: [
        "A. Menggunakan Local Storage",
        "B. Menggunakan Fetch API",
        "C. Menggunakan Props",
        "D. Menggunakan State"
        ],
        correctAnswer: "C. Menggunakan Props"
    },
    {
        id: 4,
        question: "Apa yang akan terjadi jika kita mengubah state secara langsung tanpa menggunakan fungsi pengubahnya (setter), contoh: 'state = dataBaru'?",
        options: [
        "A. Komponen tidak akan merender ulang tampilan, sehingga UI tidak berubah",
        "B. Aplikasi langsung otomatis crash total",
        "C. Data langsung tersimpan ke Local Storage",
        "D. Komponen tetap merender ulang dengan normal"
        ],
        correctAnswer: "A. Komponen tidak akan merender ulang tampilan, sehingga UI tidak berubah"
    },
    {
        id: 5,
        question: "Dalam JavaScript/JSX, metode string apa yang digunakan untuk membersihkan spasi kosong (whitespace) di awal dan akhir teks input form?",
        options: [
        "A .clean()",
        "B .split()",
        "C .slice()",
        "D .trim()"
        ],
        correctAnswer: "D .trim()"
    },
    {
        id: 6,
        question: "Mengapa kita tidak boleh memanggil fungsi 'fetch()' API langsung di dalam bodi komponen tanpa wrap 'useEffect' atau event handler?",
        options: [
        "A. Karena fetch API tidak didukung oleh Preact",
        "B. Karena akan menyebabkan loop render tak terbatas (Infinite Loop Render) yang bikin crash",
        "C. Karena data yang diambil akan otomatis terhapus",
        "D. Karena fetch API hanya bisa berjalan di file balkan .js biasa"
        ],
        correctAnswer: "B. Karena akan menyebabkan loop render tak terbatas (Infinite Loop Render) yang bikin crash"
    },
    {
        id: 7,
        question: "Kapan waktu yang tepat menggunakan file berextension '.jsx' dibanding '.js' biasa?",
        options: [
        "A. Saat kita ingin menulis kode logika Backend saja",
        "B. Saat kita ingin menulis fungsi penukar data murni (seperti shuffle)",
        "C. Saat file tersebut berisi struktur tampilan UI (HTML di dalam JavaScript)",
        "D. Saat kita ingin membuat koneksi ke database database"
        ],
        correctAnswer: "C. Saat file tersebut berisi struktur tampilan UI (HTML di dalam JavaScript)"
    },
    {
        id: 8,
        question: "Jika kita mengirim fungsi ke props, kenapa kita menulisnya tanpa kurung, contoh: 'onDelete={hapusData}'?",
        options: [
        "A. Agar fungsi tersebut langsung dieksekusi saat halaman dimuat",
        "B. Agar kita hanya mengoper referensi fungsinya saja, sehingga anak yang menentukan kapan dieksekusi",
        "C. Karena Preact akan error jika mendeteksi tanda kurung di dalam props",
        "D. Agar fungsi tersebut otomatis tersimpan di Local Storage"
        ],
        correctAnswer: "B. Agar kita hanya mengoper referensi fungsinya saja, sehingga anak yang menentukan kapan dieksekusi"
    },
    {
        id: 9,
        question: "Apa singkatan dari JSX?",
        options: [
        "A. JavaScript XML",
        "B. Java Syntax Extension",
        "C. JavaScript Xerox",
        "D. JSON Extension"
        ],
        correctAnswer: "A. JavaScript XML"
    },
    {
        id: 10,
        question: "Manakah cara yang benar untuk mengubah data teks string menjadi object JSON saat mengambil data dari Local Storage?",
        options: [
        "A. JSON.stringify(localStorage.getItem('key'))",
        "B. JSON.parse(localStorage.getItem('key'))",
        "C. localStorage.getItem('key').toObject()",
        "D. JSON.convert(localStorage.getItem('key'))"
        ],
        correctAnswer: "B. JSON.parse(localStorage.getItem('key'))"
    }
];