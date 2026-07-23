const fs = require("fs");
const filePath = require("path");
const path = filePath.join(__dirname, "note.json");
console.log(path)

function initDatabase() {
    const defaultData = [
        {id: 0, content: ""}
    ]
    if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(defaultData), "utf-8");
    } else {
        try {
            const rawData = fs.readFileSync(path, "utf-8");
            const parsedData = JSON.parse(rawData);

            if (!Array.isArray(parsedData)) {
                throw new Error("Data bukan array!");
            }
        } catch (error) {
            fs.writeFileSync(path, JSON.stringify(defaultData), "utf-8");
        }
    }
}

initDatabase();

let listData = JSON.parse(fs.readFileSync(path, "utf-8"));
let currIndex = 0;
let currData = listData[currIndex].content;
let page = listData.length;
let isSave = true ;

process.stdin.setEncoding("utf-8");
process.stdin.setRawMode(true);

function renderUI() {
    process.stdout.write("\x1Bc")
    console.log(`page: ${currIndex + 1}/${page} | ◻ ${isSave ? "Saved✅" : "Unsaved❌"}`)
    console.log("\nCtrl + RightArrow Next Page  Ctrl + LeftArrow Prev Page");
    console.log("Ctrl + P New Page  Ctrl + S Save");
    console.log("Ctrl + C Exit without Save");
    console.log("\n========================================================================================================================\n")
    process.stdout.write(`\n> ${currData}`);
}

function saveData() {
    isSave = true
    listData[currIndex].content = currData;
    const stringData = JSON.stringify(listData);
    fs.writeFileSync(path, stringData, "utf-8");
}

function createNewPage() {
    const createPages = {
        id: listData[listData.length - 1].id + 1,
        content: ""
    };

    listData.push(createPages);
    fs.writeFileSync(path, JSON.stringify(listData), "utf-8");
}



function handleNotes(chunk) {
    const data = chunk
    if (data == "\r") {
        currData += "\n";
        renderUI();
    }
    else if (data == "\u0010") {
        createNewPage();
        listData = JSON.parse(fs.readFileSync(path, "utf-8"));
        currIndex = listData.length - 1;
        currData = "";
        page = listData.length
        isSave = true;
        renderUI()
    }
    else if (data == "\u001b[1;5D") {
        if (listData[currIndex - 1] != undefined) {            
            saveData();
            currIndex--;
            currData = listData[currIndex].content;
            renderUI();
        }
    }
    else if (data == "\u001b[1;5C") {
        if (listData[currIndex + 1] != undefined) {            
            saveData();
            currIndex++;
            currData = listData[currIndex].content;
            renderUI();
        }
    }
    else if (data == "\u0013") {
        saveData();
        renderUI();
    }
    else if (data == "\u0008" || data == "\x7f") {
        currData = currData.slice(0, -1);
        renderUI();
    }
    else if (data == "\u0003") {
        process.stdin.pause();
        process.exit(0);
    } 
    else {
        currData += data;
        isSave = false
        renderUI();
    }
}

let activeChoice = 0;
let menuList = ["Go to Notes", "Delete Note"];
process.stdin.setEncoding("utf-8");
process.stdin.setRawMode(true)

function renderOption() {
    process.stdout.write("\x1B[2J\x1B[0;0H");
    console.log("📑🖊  NOTES APP\n");
    console.log("Welcome Back!");
    console.log("Manage all your notes quickly from the terminal");
    console.log("\n========================================================================================================================\n")
    menuList.forEach((item, index) => {
        if (index == activeChoice) {
            console.log(`> ${item}`)
        } else {
            console.log(`  ${item}`)
        }
    })

    console.log("\n\n[⬆][⬇] Select                                   [ENTER] Confirm                                         [CTRL + C] Exit")
}

function renderDelete() {
    process.stdout.write("\x1Bc");
    console.log("🗑 DELETE NOTES");
    console.log("Select the pages you want to remove\n\n");
    listData.forEach((item, index) => {
        if (index == activeChoice) {
            console.log(`[X] Page ${index + 1}`);
        } else {
            console.log(`[] Page ${index + 1}`)
        }
    })

    console.log("\n\n[⬆][⬇] Select                                   [ENTER] Confirm                                         [CTRL + C] Exit")
}

function deleteHandle(chunk) {
    const key = chunk;

    if (key == '\u001b[B') {
        if (activeChoice < listData.length - 1) {
            activeChoice++;
        }
        renderDelete();
    } else if (key == '\u001b[A') {
        if (activeChoice > 0) {
            activeChoice--;
        }
        renderDelete();
    } else if (key == "\r" || key == "\n" || key == "\r\n") {
        const deleteData = listData[activeChoice];
        const newData = listData.filter(item => item.id != deleteData.id);
        fs.writeFileSync(path, JSON.stringify(newData), "utf-8");
        process.stdout.write("\x1Bc");
        console.log("berhasil hapus data");
        process.exit(0);
    } else if (key == "\u0003") {
        process.exit(0)
    }
}

function showOption(chunk) {
    const key = chunk;

    if (key == '\u001b[B') {
        if (activeChoice < menuList.length - 1) {
            activeChoice++;
        }
        renderOption();
    } else if (key == '\u001b[A') {
        if (activeChoice > 0) {
            activeChoice--;
        }
        renderOption();
    } else if (key == "\r" || key == "\n" || key == "\r\n") {
        const pilihan = menuList[activeChoice];
        process.stdin.pause();
        process.stdin.off("data", showOption);
        process.stdin.resume();
        if (pilihan == "Go to Notes") {
            activeChoice = 0;
            process.stdin.on("data", handleNotes);
            renderUI();
        } else {
            activeChoice = 0;
            process.stdin.on("data", deleteHandle);
            renderDelete();
        }
    } else if (key == "\u0003") {
        process.exit(0)
    }
}
renderOption();

process.stdin.on("data", showOption)
