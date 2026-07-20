const { stdin, stdout } = require("process");
const readline = require("readline");

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

const soal = "what is your favorite programming language?";
const choice = [
    "Javascript",
    "Python",
    "C++",
    "Golang"
];
let selectedChoich = "";

const lang = [
    "PHP",
    "Assembly",
    "Java",
    "HTML"
]

const selectedLang = [];

let activeChoice = 0;

function showQuiz() {
    stdout.write("\x1Bc");
    console.log(soal);
    choice.forEach((item, index) => {
        if (index == activeChoice) {
            console.log(` > ${item}`);
        } else {
            console.log(`   ${item}`);
        }
    })

    console.log("Gunakan tombol panah lalu tekan enter");
}

function showHate() {
    stdout.write("\x1Bc");
    console.log("Pilih bahasa yang kamu benci");

    lang.forEach((item, index) => {
        if (selectedLang.includes(item)) {
            console.log(`   [x]${item}`)
        }
        else if (index == activeChoice) {
            console.log(` > []${item}`);
        } else {
            console.log(`   []${item}`)
        }
    })
    console.log("gunakan 'i' untuk memilih");
    
}

function addData(data) {
    if (selectedLang.includes(data)) {
        return;
    }
    selectedLang.push(data);
}

function pindah() {
    if (selectedLang.includes(lang[activeChoice + 1]) || selectedLang.includes(lang[activeChoice - 1])) {
        const filter = lang.filter(item => !selectedLang.includes(item));
        const getIndex = lang.indexOf(filter[0]);
        if (activeChoice == lang.length) {
            activeChoice--;
        }
        else if (activeChoice == -1) {
            activeChoice++
        } else {
            activeChoice = getIndex;
        }
    } 
    else if (activeChoice == lang.length - 1) {
        activeChoice--;
    }
    else if (activeChoice == 0) {
        activeChoice++
    }
    else if (selectedLang.includes(lang[activeChoice + 1])) {
        activeChoice--
    }
    else {
        activeChoice++
    }
}

stdin.setRawMode(true);
stdin.setEncoding("utf-8");

showQuiz();

function showSelect(chunk) {
    const key = chunk
    if (key == '\u001b[A') {
        if (activeChoice > 0) {
            activeChoice--;
            showQuiz();
        }
    } else if (key == '\u001b[B') {
        if (activeChoice < choice.length - 1) {
            activeChoice++;
            showQuiz();
        }
    } else if (key == "\r" || key == "\n") {
        selectedChoich = choice[activeChoice]
        activeChoice = 0;
        rl.pause();
        stdin.off('data', showSelect);
        showHate()
        rl.resume();
        stdin.on("data", (key) => {
            if (key == '\u001b[A') {
                if (activeChoice > 0) {
                    activeChoice--;
                    showHate();
                }
            } else if (key == '\u001b[B') {
                if (activeChoice < lang.length - 1) {
                    activeChoice++;
                    showHate();
                }
            } else if (key == 'i') {
                if (selectedLang.length == 0) {
                    selectedLang.push(lang[activeChoice])
                } else {
                    addData(lang[activeChoice]);
                }
                pindah()
                showHate();
            } else if (key == "\r" || key == "\n") {
                console.log(`Bahasa yang kamu benci: ${selectedLang}\nBahasa favoritmu: ${selectedChoich}`);
                rl.close();
                process.exit(0)
            } else if (key == '\u0003') {
                stdin.setRawMode(false);
                rl.close();
                process.exit(0);
            }
        })
    } else if (key == '\u0003') {
        stdin.setRawMode(false);
        rl.close();
        process.exit(0);
    }
}


stdin.on("data", showSelect)