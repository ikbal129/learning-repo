const sqlite3 = require("sqlite3").verbose();
const path = require("path");

//database sql activity handler
class DB_Handler {
    constructor() {
        this.database = new sqlite3.Database(path.join(__dirname, "todo.db"), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) return console.error(err);
        })

        this.createTable()
    }

    createTable() {
        this.database.run(`CREATE TABLE IF NOT EXISTS todo(
            id INTEGER PRIMARY KEY,
            content TEXT,
            status INTEGER CHECK (status IN (0, 1))
        )`)
    }

    
    selectAllData() {
        return new Promise((resolve, reject) => {
            this.database.all("SELECT * FROM todo", [], (err, data) => {
                if(err) reject(err);
                resolve(data)
            })
            
        }) 
    }

    getID() {
        return new Promise((resolve, reject) => {
            this.database.all("SELECT id FROM todo", [], (err, data) => {
                if (err) return reject(err);
                const id = data.map(item => item.id)
                resolve(id)
            })
        })
    }

    addData(stringData) {
        const sql = 'INSERT INTO todo (content, status) VALUES (?, ?)';
        this.database.run(sql, [stringData, 0], function (err) {
            if (err) return console.error(err);
            console.log(`\x1b[32m[SUCCESS]\x1b[0m Created todo item with ID: ${this.lastID}`);
        })
    }

    deleteByID(id) {
        const sql = "DELETE FROM todo WHERE id=?";

        this.database.run(sql, [id], (err) => {
            if (err) return errorHandle({message: "INVALID ID"});

            console.log(`\x1b[32m[SUCCESS]\x1b[0m Deleted todo item with ID: ${id}`);
            
        })
    }

    doneById(id) {
        const sql = "UPDATE todo SET status = NOT status WHERE id = ?";

        this.database.run(sql, [id], function(err) {
            if (err) return errorHandle({message: "INVALID ID"});;
            if (this.changes == 0) {
                return errorHandle({message: "INVALID ID"})
            } else {
                console.log(`\x1b[32m[SUCCESS]\x1b[0m Updated status for todo item with ID: ${id}`);
            }
        })
    }

    showPending() {
        const sql = "SELECT * FROM todo WHERE status=?";
        return new Promise((resolve, reject) => {
            this.database.all(sql, [0], (err, data) => {
                if(err) reject(err);

                resolve(data)
            })
        }) 
    }

    showDone() {
        const sql = "SELECT * FROM todo WHERE status=?";
        return new Promise((res, rej) => {
            this.database.all(sql, [1], (err, data) => {
                if (err) return rej(err);;

                res(data)
            })
        })
    }
}

const db = new DB_Handler();

//list handle with all cases
const handleList = (type) => {
    switch (type) {
        case "all":
            db.selectAllData().then((res) => {
                if (!res || res.length == 0) {
                    errorHandle({message: "DATA IS EMPTY"})
                    return;
                }

                res.map((item, index) => {
                    const check = item.status ? "[✔]" : "[ ]";
                    console.log(`${index + 1} > ${check} ${item.content} (ID: ${item.id})`)
                })
            }).catch(err => console.error(err))
            break;
        case "pending":
            db.showPending().then((res) => {
                if (!res || res.length == 0) {
                    errorHandle({message: "DATA IS EMPTY"})
                    return;
                }
                
                res.map((item, index) => {
                    console.log(`${index + 1} > [ ] ${item.content} (ID: ${item.id})`)
                })
            }).catch(err => console.error(err))
            break;
        case "done":
            db.showDone().then(res => {
                if (!res || res.length == 0) {
                    errorHandle({message: "DATA IS EMPTY"});
                    return;
                }
                
                res.map((item, index) => {
                    console.log(`${index + 1} > [✔] ${item.content} (ID: ${item.id})`)
                })
            }).catch(err => console.error(err));
            break;
        default:
            errorHandle({message: "list value INVALID"})
            break;
    }
}

//handling method from process.argv in main code
function methodHandler(meth, args) {
    switch (meth) {
    case "--new":
        db.addData(args)
        break;
    case "--list":
        const type = args   
        handleList(type)
        break;
    case "--done":
        const doneId = Number(args);
        if (isNaN(doneId)) return errorHandle({message: "INVALID ID"})
        db.doneById(doneId)
        break;
    case "--delete":
        const queryId = Number(args);
        if (isNaN(queryId)) return errorHandle({message: "INVALID ID"})
        db.deleteByID(queryId)
        break;
    default:
        errorHandle({message: "INVALID METHOD"})
        break;
    }
    
}

//error handling catch from database and list handler
function errorHandle(err) {
    if (!err || !err.message) return;

    const RED = "\x1b[31m";
    const YELLOW = "\x1b[33m";
    const CYAN = "\x1b[36m";
    const BOLD = "\x1b[1m";
    const RESET = "\x1b[0m";

    console.log("");

    switch (err.message) {
        case "DATA IS EMPTY":
            console.log(`${YELLOW}[INFO] No todo records found.${RESET}`);
            console.log(`${CYAN}Usage Hint:${RESET} Add a new todo item using:`);
            console.log(`  todo --new "Your task description"`);
            console.log("\x1b[2mFor more information, run:\x1b[0m todo --help");
            break;

        case "list value INVALID":
            console.log(`${RED}[ERROR] Invalid list type provided.${RESET}`);
            console.log(`${CYAN}Allowed Options:${RESET}`);
            console.log(`  --list all       Display all todo items`);
            console.log(`  --list pending   Display pending todo items`);
            console.log(`  --list done      Display completed todo items`);
            console.log("\x1b[2mFor more information, run:\x1b[0m todo --help");
            break;

        case "INVALID METHOD":
            console.log(`${RED}[ERROR] Unknown command or method.${RESET}`);
            console.log(`${CYAN}Available Commands:${RESET}`);
            console.log(`  --new <text>     Create a new todo item`);
            console.log(`  --list <type>    Display todo list (all | pending | done)`);
            console.log(`  --done <id>      Toggle status of a todo item`);
            console.log(`  --delete <id>    Delete a todo item by ID`);
            console.log("\x1b[2mFor more information, run:\x1b[0m todo --help");
            break;

        case "INVALID ID":
            console.log(`${RED}[ERROR] Specified ID is invalid or does not exist.${RESET}`);
            console.log(`${CYAN}Usage Hint:${RESET} Please verify the ID from 'todo --list all' before executing.`);
            console.log("\x1b[2mFor more information, run:\x1b[0m todo --help");
            break;

        case "TOO MANY ARGUMENTS":
            console.log(`${YELLOW}[WARNING] Too many arguments passed.${RESET}`);
            console.log(`${CYAN}Usage Hint:${RESET} Please check your input command syntax.`);
            console.log("\x1b[2mFor more information, run:\x1b[0m todo --help");
            break;
            
        case "MISSING ARGUMENTS":
            console.log(`${YELLOW}[WARNING] Missing some argument.${RESET}`);
            console.log(`${CYAN}Usage Hint:${RESET} Please check your input command syntax.`);
            console.log("\x1b[2mFor more information, run:\x1b[0m todo --help");
            break;

        default:
            console.log(`${RED}[ERROR] ${err.message}${RESET}`);
            console.log("\x1b[2mFor more information, run:\x1b[0m todo --help");
            break;
    }

    console.log("");
}

function showHelp() {
    const CYAN = "\x1b[36m";
    const BOLD = "\x1b[1m";
    const DIM = "\x1b[2m";
    const RESET = "\x1b[0m";

    console.log("");
    console.log(`${BOLD}Usage:${RESET} todo <command> [options]`);
    console.log("");
    console.log(`${BOLD}Commands:${RESET}`);
    console.log(`  ${CYAN}--new${RESET} <text>         Create a new todo item`);
    console.log(`  ${CYAN}--list${RESET} [type]        Display todo items (all | pending | done)`);
    console.log(`  ${CYAN}--done${RESET} <id>          Toggle completion status of a todo item`);
    console.log(`  ${CYAN}--delete${RESET} <id>        Delete a todo item by ID`);
    console.log(`  ${CYAN}--help${RESET}               Show command-line help references`);
    console.log("");
    console.log(`${BOLD}Examples:${RESET}`);
    console.log(`  ${DIM}$${RESET} todo --new "Finish project documentation"`);
    console.log(`  ${DIM}$${RESET} todo --list pending`);
    console.log(`  ${DIM}$${RESET} todo --done 2`);
    console.log(`  ${DIM}$${RESET} todo --delete 5`);
    console.log("");
}

//main code
const query = process.argv.slice(2)
const method = query[0];
const argument = query[1]

if (method == '--help') {
    showHelp();
    process.exit(0)
}

if (query.length > 2) {
    errorHandle({message: "TOO MANY ARGUMENTS"})
    process.exit(1);
}
else if (argument == undefined) {
    errorHandle({message: "MISSING ARGUMENTS"})
    process.exit(1)
}

methodHandler(method, argument)