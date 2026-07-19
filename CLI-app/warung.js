const readline = require("readline");
const fs = require("fs");
const path = './docs/warung.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let total = 0;

function defaultWarung(data, jawaban) {
    const ada = data.filter(item => item.nama == jawaban.toLowerCase());
    if (ada.length != 0) {
        console.log("Barang dibeli seharga : Rp", ada[0].harga)
        total += ada[0].harga;
    } else {
        console.log("barang tidak ada di warung ini")
    }
    return total;
}

function beliBarang(data) {
    rl.question("Mau beli apa?\n> ", (answer) => {
        defaultWarung(data, answer)
        tanyaLagi(data)
    })
}

function tanyaLagi(data) {
    rl.question("Mau nambah barang gak?\n> (y/n) : ", (user) => {
        if (user.toLowerCase() == "n") { rl.close(); }
        else if (user.toLowerCase() == "y") {beliBarang(data)}
        else {tanyaLagi()};
    })
}

fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
        console.log("database tidak ada");
        process.exit(1);
    }
    const jsonData = JSON.parse(data);
    beliBarang(jsonData)

})

rl.on("close", () => {
    console.log(`Total belanja : Rp${total}`);
})