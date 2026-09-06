# THIS README.md contains AI generated information


# ALU Regex Data Extraction

This project extracts structured data from the customer service logs in `input/raw-text.txt` using JavaScript regular expressions.

## Features

The script extracts:

- Official ALU email addresses ending in `@alueducation.com`
- Alumni email addresses ending in `@alumni.alueducation.com`
- SI email addresses ending in `@si.alueducation.com`
- Hyphen-separated credit card numbers
- Phone numbers in several common formats

## Phone Number Regex

The phone-number pattern used in `src/main.js` is:

```js
/(?<![\w])(?:\+\d{1,3}[-\s]?)?(?:\(\d{3}\)[-\s]?\d{3}[-\s]?\d{4}|\d{3}[-\s]\d{3}[-\s]\d{4}|\d{3}[-\s]\d{3}[-\s]\d{3}|\d{3}[-\s]\d{4})\b/g
```

It supports examples such as:

- `+1-555-0123`
- `+1 (555) 000-1234`
- `+256-701-234-567`
- `555-0123`

It does not match incomplete numbers such as `555`, and it avoids matching digits embedded inside larger words or numbers.

## Project Structure

```text
.
├── input/
│   └── raw-text.txt
├── output/
├── src/
│   └── main.js
└── README.md
```

## Requirements

- Node.js

## Running the Extraction

From the project root, run:

```bash
node src/main.js
```

The script reads `input/raw-text.txt`, prints the extracted email addresses, credit card numbers, and phone numbers to the console, and writes the JSON result to `output/sample-output.json`.

## Notes

- Results are de-duplicated before being printed.
- The extraction is intended for the formats represented in the sample log and is not a complete international phone-number validator.

## Security Handling

- Input is treated as plain text. The script does not execute SQL, JavaScript, URLs, or other content found in the log.
- Unsupported or malformed email and phone formats are not returned by the corresponding regular expressions.
- Card numbers are checked with the Luhn algorithm before they are returned.
- Accepted card numbers are masked before console output, showing only the last four digits.
- Luhn validation does not prove that a card is active, genuine, or safe to use. Production systems should use a payment provider or a dedicated validation service and should avoid storing card numbers.


