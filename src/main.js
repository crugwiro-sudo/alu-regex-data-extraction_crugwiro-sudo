//importing modules to open the file
const fs = require('fs');
const path = require('path');

function passesLuhnCheck(cardNumber) {
    const digits = cardNumber.replace(/\D/g, '').split('').reverse();
    const checksum = digits.reduce((total, digit, index) => {
        let value = Number(digit);
        if (index % 2 === 1) {
            value *= 2;
            if (value > 9) value -= 9;
        }
        return total + value;
    }, 0);
    return checksum % 10 === 0;
}

function maskCardNumber(cardNumber) {
    return `${cardNumber.slice(0, 4).replace(/\d/g, '*')}-${cardNumber.slice(5, 14).replace(/\d/g, '*')}-${cardNumber.slice(-4)}`;
}

function extractEmails(text) {
    // Define regex patterns for different email types and credit card numbers
    const patterns = {
        official: /[A-Za-z0-9._%+\-]+@alueducation\.com\b/gi,
        alumni: /[A-Za-z0-9._%+\-]+@alumni\.alueducation\.com\b/gi,
        si: /[A-Za-z0-9._%+\-]+@si\.alueducation\.com\b/gi,
        creditCard: /\b\d{4}-\d{4}-\d{4}-\d{4}\b/g,
        phoneNumberPattern: /(?<![\w])(?:\+\d{1,3}[-\s]?)?(?:\(\d{3}\)[-\s]?\d{3}[-\s]?\d{4}|\d{3}[-\s]\d{3}[-\s]\d{4}|\d{3}[-\s]\d{3}[-\s]\d{3}|\d{3}[-\s]\d{4})\b/g
    };
    // Using Object.fromEntries to create an object with unique matches for each pattern
    const matches = Object.fromEntries(
        Object.entries(patterns).map(([name, regex]) => [
            name,
            [...new Set((text.match(regex) || []))]
        ])
    );

    matches.creditCard = matches.creditCard
        .filter(passesLuhnCheck)
        .map(maskCardNumber);
    return matches;
}

//function to read the file
function main(){
    //reading file from the path
    const readFile = path.join(__dirname, '../input/raw-text.txt');
    const rawText = fs.readFileSync(readFile, 'utf-8');

    //testing to see whether the file is read successfully or not
    console.log("File read successfully!");
    const matches = extractEmails(rawText);

    console.log("Official emails:", matches.official);
    console.log("Alumni emails:", matches.alumni);
    console.log("SI emails:", matches.si);
    console.log("Credit card numbers:", matches.creditCard);
    console.log("Phone numbers:", matches.phoneNumberPattern);
}
main();