function kalkulator(operator, num1, num2) {
    if (operator == '-divide' && num2 == 0) return errorHandle({errorType: "Math error"});
    
    let hasil;
    switch (operator) {
        case "-add":
            hasil = num1 + num2;
            break;
        case "-subtract":
            hasil = num1 - num2;
            break;
        case "-multiply":
            hasil = num1 * num2;
            break;
        case "-divide":
            hasil = (num1 / num2).toFixed(2);
            break;
        default:
            const errData = {errorType: "Invalid operator"};
            return errorHandle(errData);
    }

    return `result : ${hasil}`;
}

function errorHandle(message) {
    let errorText = "Error:"
    switch(message.errorType) {
        case "Invalid operator":
            errorText += ` ${message.errorType}`;
            errorText += "\n\nSupported operators: -add, -subtract, -multiply, -divide";
            errorText += `\nExample: node calculator -add ${10} ${20}`;
            errorText += "\n\nRun 'node calculator -help' to see all available commands";
            break;
        case "Missing arguments":
            errorText += ` ${message.errorType}`;
            errorText += "\n\nUsage: node calculator <operator> <number1> <number2>";
            errorText += "\nRun 'node calculator -help' to see all available commands\n";
            break;
        case "Invalid input":
            errorText += ` ${message.errorType}`;
            errorText += "\n\n\Both argument must be valid numbers.";
            errorText += `\nYou provided: ${message.numbers[0]} ${message.numbers[1]}\n`;
            break;
        case "Too many arguments":
            errorText += ` ${message.errorType}`;
            errorText += "\n\nUsage: node calculator <operator> <number1> <number2>";
            errorText += "\nRun 'node calculator -help' to see all available commands\n";
            break;
        case "Math error":
            errorText += ` ${message.errorType}`;
            errorText += "\n\nCannot divide by Zero";
            break;
    }

    return errorText;
}

function start(data) {
    if (data.length < 3) return errorHandle({errorType: "Missing arguments"});
    if (data.length > 3) return errorHandle({errorType: "Too many arguments"});

    const operator = data[0];
    const num1 = Number(data[1]);
    const num2 = Number(data[2]);

    if (isNaN(num1) || isNaN(num2)) return errorHandle({errorType: "Invalid input", numbers: [data[1], data[2]]});

    return (kalkulator(operator, num1, num2));
}

function showHelp() {
    console.log(`
CALCULATOR CLI
==============
A simple command-line calculator

USAGE:
    node calculator <operator> <number1> <number2>

SUPPORTED OPERATORS:
    -add Add two numbers
    -subract Subtract the second number from the first
    -multiply Multiply two numbers
    -divide Divide the first number by the second

EXAMPLES:
    node calculator -add 10 20
    node calculator -divide 100 4

Run 'node calculator -help' to display this help message
    `);
}

const getData = process.argv.slice(2);

if (getData[0] == '-help') {
    showHelp();
} else {
    const data = start(getData);
    console.log(data)
}