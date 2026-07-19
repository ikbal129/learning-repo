const fs = require("fs");

const userInput = process.argv.slice(2)
const method = userInput[0];
const path = "./jdb-folder/data.json";

if (!fs.existsSync("./jdb-folder")) {
    fs.mkdirSync("./jdb-folder");
}
if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]", "utf-8")
}

handleUserInput(method, userInput)

function addData(data, content) {
    let id;
    if (data.length == 0) {
        id = 0;
    } else {
        const getId = data.map(item => item.id);
        for (let i = 0; i <= getId[getId.length - 1]; i++) {
            if (getId[i] != i) {
                id = i;
                break;
            }
            id = getId[getId.length - 1] + 1;
        }
    }

    const newData = {
        id: id,
        content: content
    }

    data.push(newData);
    data.sort((a, b) => a.id - b.id)
    fs.writeFile(path, JSON.stringify(data), (err) => {
        console.log("data has been added to jdb.json");
        process.exit(0)
    })
}

function deleteData(data, id) {
    const found = data.find(item => item.id == id)
    if (!found) {
        console.log("data yang lu cari gak ada bjir");
        return;
    }
    const newData = data.filter(item => item.id != id);
    fs.writeFile(path, JSON.stringify(newData), (err) => {
        console.log("data succesfully has been removed")
        process.exit(0)
    })
}

function editData(data, id, newData) {
    const found = data.find(item => item.id == id)
    if (!found) {
        console.log("data yang lu cari gak ada bjir");
        return;
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].content = newData;
            break;
        }
    }

    fs.writeFile(path, JSON.stringify(data), (err) => {
        console.log("succesfully to update data")
        process.exit(0)
    })
}

function handleUserInput(method, datas) {
    fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
            console.log(err.message)
        } else {
            let errObject = {
                message: ""
            };
            let jsonData;
            try {
                jsonData = JSON.parse(data);
            } catch (parseError) {
                if (datas[0] == "--restore") {
                    const restoreData = "[]";
                    fs.writeFileSync(path, restoreData, "utf-8");
                    console.log("Succes: Database has been restored to fix the problem");
                    process.exit(0);
                }
                errorHandle({message: "Database file is corrupted (Invalid JSON format)" });
                process.exit(1);
            }
            switch (method) {
                case "-add":
                    if (datas[1] == undefined || datas[1].trim().length == 0) {
                        errObject.message = "Content cannot be empty";
                        errorHandle(errObject);
                        process.exit(1);
                    }
                    addData(jsonData, datas[1]);
                    break;
                case "-del":
                    if (datas.length < 2) {
                        errObject.message = "Missing argument for method '-del'";;
                        errorHandle(errObject);
                        process.exit(1);
                    } else if (datas.length > 2) {
                        errObject.message = "Too many arguments for method '-del'";
                        errorHandle(errObject);
                        process.exit(1);
                    }

                    const parseData = Number(datas[1]);
                    if (isNaN(parseData)) {
                        errObject.message = `Invalid ID "${datas[1]}". ID must be a number`;
                        errorHandle(errObject);
                        process.exit(1);
                    } 
                    deleteData(jsonData, parseData)
                    break;
                case "-edit":
                    const getData = datas.slice(1)
                    if (getData.length < 1) {
                        errObject.message = "Missing argument for method '-edit'";
                        errorHandle(errObject);
                        process.exit(1);
                    }
                    else if (getData[1] == undefined || getData[1].trim().length == 0) {
                        errObject.message = "Content cannot be empty";
                        errorHandle(errObject);
                        process.exit(1);
                    }

                    const idData = Number(getData[0]);
                    if (isNaN(idData) || getData[0].trim().length == 0) {
                        errObject.message = `Invalid ID "${datas[1]}". ID must be a number`;
                        errorHandle(errObject);
                        process.exit(1);
                    }

                    editData(jsonData, idData, getData[1]);
                    break;
                case "-show":
                    if (datas.length > 1) {
                        errObject.message = "Too many arguments for method '-show'";
                        errorHandle(errObject);
                        process.exit(1);
                    }
                    console.log(JSON.stringify(jsonData, null, 2))
                    break;
                case "--help":
                    if (datas.length > 1) {
                        errObject.message = "Too many arguments for method '--help'";
                        errorHandle(errObject);
                        process.exit(1);
                    }
                    showHelp();
                    break;
                case "-reset":
                    if (datas[1] == "--force" && datas.length == 2) {
                        const resetData = "[]";
                        fs.writeFile(path, resetData, () => {
                            console.log("Succes: jdb.json has been reset. All data deleted");
                            process.exit(0);
                        });
                    } else if (datas.length < 2 ) {
                        errObject.message = "Missing confirmation for method '-reset'";
                        errObject.message += "\nThis action will RESET ALL data to empty. This cannot be undone";
                        errorHandle(errObject);
                        process.exit(1);
                    } else if (datas.length > 2) {
                        errObject.message = "Too many arguments for method '-reset'"
                        errorHandle(errObject);
                        process.exit(1);
                    } else {
                        errObject.message = `Invalid confirmation ${datas[1]} for method '-reset'`;
                        errorHandle(errObject);
                        process.exit(1);
                    }
                    break;
                default:
                    if (datas.length == 0) errObject.message = "No method provided";
                    else{
                        errObject.message = `Unknown method ${datas[0]}`;
                    }
                    errorHandle(errObject);
                    break;
            }
        }
    })
}

function showHelp() {
    console.log(`

JDB - Simple JSON Database, CLI
===============================

USAGE:
    node jdb <method> [arguments]

METHODS:
    -add <content> Add a new record
    -del <id> Delete a record by ID
    -edit <id> <content> Edit a record by ID
    -show Show all records
    --help Show this help message
    -reset --force Reset all data to empty. Requires --force
    --restore EMERGENCY: Restore corrupted database to []. only works if file is corrupted

EXAMPLES:
    node jdb -add "Hello World
    node jdb -del 2
    node jdb -edit 1 "Updated Content"
    node jdb -show

        `)
}

function errorHandle(err) {
    let errorText = "\nError: ";
    const helpText = "\nRun 'node jdb --help' for usage information.\n" 

    errorText = errorText + err.message + helpText;
    console.log(errorText)
}