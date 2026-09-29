/* =========================================
   CLASSICAL CIPHER TOOL
========================================= */


/* =========================================
   MODULO FUNCTION
========================================= */

function mod(number, modulus) {

    return ((number % modulus) + modulus) % modulus;

}


/* =========================================
   MULTIPLICATIVE INVERSE
========================================= */

function multiplicativeInverse(a) {

    a = mod(a, 26);

    for (let x = 1; x < 26; x++) {

        if (mod(a * x, 26) === 1) {

            return x;

        }

    }

    return null;

}


/* =========================================
   UPDATE CIPHER INFORMATION
========================================= */

function updateCipher() {

    const cipher =
        document.getElementById("cipher").value;

    const title =
        document.getElementById("cipherTitle");

    const description =
        document.getElementById("cipherDescription");

    const formula =
        document.getElementById("formula");

    const keyLabel =
        document.getElementById("keyLabel");

    const key =
        document.getElementById("key");

    const secondKeyGroup =
        document.getElementById("secondKeyGroup");


    /* ADDITIVE */

    if (cipher === "additive") {

        title.textContent =
            "Additive Cipher";

        description.textContent =
            "Uses a shift key to move each letter by a fixed number of positions in the alphabet.";

        formula.textContent =
            "Encryption: C = (P + K) mod 26";

        keyLabel.textContent =
            "Enter Shift Key";

        key.placeholder =
            "Example: 3";

        secondKeyGroup.classList.add("hidden");

    }


    /* MULTIPLICATIVE */

    else if (cipher === "multiplicative") {

        title.textContent =
            "Multiplicative Cipher";

        description.textContent =
            "Multiplies each letter value by a key and applies modulo 26.";

        formula.textContent =
            "Encryption: C = (P × K) mod 26";

        keyLabel.textContent =
            "Enter Multiplicative Key";

        key.placeholder =
            "Example: 3 or 5";

        secondKeyGroup.classList.add("hidden");

    }


    /* AFFINE */

    else if (cipher === "affine") {

        title.textContent =
            "Affine Cipher";

        description.textContent =
            "Combines multiplication and addition using two keys, a and b.";

        formula.textContent =
            "Encryption: C = (aP + b) mod 26";

        keyLabel.textContent =
            "Enter First Key (a)";

        key.placeholder =
            "Example: 5";

        secondKeyGroup.classList.remove("hidden");

    }

}


/* =========================================
   ADDITIVE ENCRYPTION
========================================= */

function additiveEncrypt(text, key) {

    let result = "";

    for (let character of text) {

        if (/[A-Za-z]/.test(character)) {

            const base =
                character === character.toUpperCase()
                    ? 65
                    : 97;

            const value =
                character.charCodeAt(0) - base;

            const encrypted =
                mod(value + key, 26);

            result +=
                String.fromCharCode(
                    encrypted + base
                );

        }

        else {

            result += character;

        }

    }

    return result;

}


/* =========================================
   ADDITIVE DECRYPTION
========================================= */

function additiveDecrypt(text, key) {

    return additiveEncrypt(text, -key);

}


/* =========================================
   MULTIPLICATIVE ENCRYPTION
========================================= */

function multiplicativeEncrypt(text, key) {

    let result = "";

    for (let character of text) {

        if (/[A-Za-z]/.test(character)) {

            const base =
                character === character.toUpperCase()
                    ? 65
                    : 97;

            const value =
                character.charCodeAt(0) - base;

            const encrypted =
                mod(value * key, 26);

            result +=
                String.fromCharCode(
                    encrypted + base
                );

        }

        else {

            result += character;

        }

    }

    return result;

}


/* =========================================
   MULTIPLICATIVE DECRYPTION
========================================= */

function multiplicativeDecrypt(text, key) {

    const inverse =
        multiplicativeInverse(key);

    if (inverse === null) {

        throw new Error(
            "Invalid key! Use a key relatively prime to 26."
        );

    }

    return multiplicativeEncrypt(
        text,
        inverse
    );

}


/* =========================================
   AFFINE ENCRYPTION
========================================= */

function affineEncrypt(text, a, b) {

    let result = "";

    for (let character of text) {

        if (/[A-Za-z]/.test(character)) {

            const base =
                character === character.toUpperCase()
                    ? 65
                    : 97;

            const value =
                character.charCodeAt(0) - base;

            const encrypted =
                mod(
                    (a * value) + b,
                    26
                );

            result +=
                String.fromCharCode(
                    encrypted + base
                );

        }

        else {

            result += character;

        }

    }

    return result;

}


/* =========================================
   AFFINE DECRYPTION
========================================= */

function affineDecrypt(text, a, b) {

    const inverse =
        multiplicativeInverse(a);

    if (inverse === null) {

        throw new Error(
            "Invalid value of a! Choose a value relatively prime to 26."
        );

    }

    let result = "";

    for (let character of text) {

        if (/[A-Za-z]/.test(character)) {

            const base =
                character === character.toUpperCase()
                    ? 65
                    : 97;

            const value =
                character.charCodeAt(0) - base;

            const decrypted =
                mod(
                    inverse * (value - b),
                    26
                );

            result +=
                String.fromCharCode(
                    decrypted + base
                );

        }

        else {

            result += character;

        }

    }

    return result;

}


/* =========================================
   DISPLAY MESSAGE
========================================= */

function showMessage(message, success = false) {

    const messageBox =
        document.getElementById("message");

    messageBox.textContent = message;

    if (success) {

        messageBox.style.color =
            "#15803d";

    }

    else {

        messageBox.style.color =
            "#dc2626";

    }

}


/* =========================================
   ENCRYPT
========================================= */

function encryptText() {

    const cipher =
        document.getElementById("cipher").value;

    const text =
        document.getElementById("inputText").value;

    const key =
        parseInt(
            document.getElementById("key").value
        );

    const secondKey =
        parseInt(
            document.getElementById("secondKey").value
        );

    const result =
        document.getElementById("result");


    /* CHECK TEXT */

    if (!text.trim()) {

        result.value = "";

        showMessage(
            "Please enter some text."
        );

        return;

    }


    /* CHECK KEY */

    if (isNaN(key)) {

        result.value = "";

        showMessage(
            "Please enter a valid key."
        );

        return;

    }


    try {

        let encrypted;


        /* ADDITIVE */

        if (cipher === "additive") {

            encrypted =
                additiveEncrypt(
                    text,
                    key
                );

        }


        /* MULTIPLICATIVE */

        else if (cipher === "multiplicative") {

            if (
                multiplicativeInverse(key)
                === null
            ) {

                throw new Error(
                    "Invalid multiplicative key. Use 1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23 or 25."
                );

            }

            encrypted =
                multiplicativeEncrypt(
                    text,
                    key
                );

        }


        /* AFFINE */

        else if (cipher === "affine") {

            if (isNaN(secondKey)) {

                throw new Error(
                    "Please enter the second key (b)."
                );

            }

            if (
                multiplicativeInverse(key)
                === null
            ) {

                throw new Error(
                    "Invalid value of a. Choose a value relatively prime to 26."
                );

            }

            encrypted =
                affineEncrypt(
                    text,
                    key,
                    secondKey
                );

        }


        result.value =
            encrypted;

        showMessage(
            "Encryption successful!",
            true
        );

    }

    catch (error) {

        result.value = "";

        showMessage(
            error.message
        );

    }

}


/* =========================================
   DECRYPT
========================================= */

function decryptText() {

    const cipher =
        document.getElementById("cipher").value;

    const text =
        document.getElementById("inputText").value;

    const key =
        parseInt(
            document.getElementById("key").value
        );

    const secondKey =
        parseInt(
            document.getElementById("secondKey").value
        );

    const result =
        document.getElementById("result");


    /* CHECK TEXT */

    if (!text.trim()) {

        result.value = "";

        showMessage(
            "Please enter ciphertext."
        );

        return;

    }


    /* CHECK KEY */

    if (isNaN(key)) {

        result.value = "";

        showMessage(
            "Please enter a valid key."
        );

        return;

    }


    try {

        let decrypted;


        /* ADDITIVE */

        if (cipher === "additive") {

            decrypted =
                additiveDecrypt(
                    text,
                    key
                );

        }


        /* MULTIPLICATIVE */

        else if (
            cipher === "multiplicative"
        ) {

            decrypted =
                multiplicativeDecrypt(
                    text,
                    key
                );

        }


        /* AFFINE */

        else if (cipher === "affine") {

            if (isNaN(secondKey)) {

                throw new Error(
                    "Please enter the second key (b)."
                );

            }

            decrypted =
                affineDecrypt(
                    text,
                    key,
                    secondKey
                );

        }


        result.value =
            decrypted;

        showMessage(
            "Decryption successful!",
            true
        );

    }

    catch (error) {

        result.value = "";

        showMessage(
            error.message
        );

    }

}


/* =========================================
   CLEAR
========================================= */

function clearAll() {

    document.getElementById(
        "inputText"
    ).value = "";

    document.getElementById(
        "key"
    ).value = "";

    document.getElementById(
        "secondKey"
    ).value = "";

    document.getElementById(
        "result"
    ).value = "";

    document.getElementById(
        "message"
    ).textContent = "";

}


/* =========================================
   INITIALIZE
========================================= */

updateCipher();