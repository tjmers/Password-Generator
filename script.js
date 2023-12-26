let capital_letters = [];
let lowercase_letters = [];
let numbers = [];
let special_chars = [];
const special_chars_as_chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '[', ']', '{', '}', '_', '-', '=', '+', '.', ',', '>', '<', ';', ':', '/', '\\', '|', '?', '~'];

const length_display = document.getElementById('length-display');
const length = document.getElementById('length');
const password_element = document.getElementById('password');

let possible_chars = [];


length.addEventListener('input', function() {
    length_display.innerHTML = length.value;
});

document.getElementById('uppercase').addEventListener('input', function() {
    let value = document.getElementById('uppercase').checked;
    for (const element of capital_letters) {
        element.checked = value;
    }
});

document.getElementById('lowercase').addEventListener('input', function() {
    let value = document.getElementById('lowercase').checked;
    for (const element of lowercase_letters) {
        element.checked = value;
    }
});


document.getElementById('numbers').addEventListener('input', function() {
    let value = document.getElementById('numbers').checked;
    for (const element of numbers) {
        element.checked = value;
    }
});

document.getElementById('special-char').addEventListener('input', function() {
    let value = document.getElementById('special-char').checked;
    for (const element of special_chars) {
        element.checked = value;
    }
});

function turnStringIntoHTMLString(string) {
    let htmlString = '';
    for (const char of string) {
        if (char == '<') {
            htmlString += '&lt;';
        } else if (char == '&') {
            htmlString += '&amp;';
        } else if (char == '>') {
            htmlString += '&gt;';
        } else {
            htmlString += char;
        }
    }
    return htmlString;
}


function generate_boxes() {
    for (let i = 0; i < 26; ++i) {
        let current = document.createElement("li");
        capital_letters.push(document.createElement("input"));
        capital_letters[i].setAttribute("type", "checkbox");
        capital_letters[i].setAttribute("id", String.fromCharCode('A'.charCodeAt(0) + i));
        capital_letters[i].checked = true;
        let text = document.createElement("span");
        text.textContent = String.fromCharCode('A'.charCodeAt(0) + i);
        current.appendChild(capital_letters[i]);
        current.appendChild(text);
        document.getElementById("uppercase_elements").appendChild(current);
    }
    
    for (let i = 0; i < 26; ++i) {
        let current = document.createElement("li");
        lowercase_letters.push(document.createElement("input"));
        lowercase_letters[i].setAttribute("type", "checkbox");
        lowercase_letters[i].setAttribute("id", String.fromCharCode('a'.charCodeAt(0) + i));
        lowercase_letters[i].checked = true;
        let text = document.createElement("span");
        text.textContent = String.fromCharCode('a'.charCodeAt(0) + i);
        current.appendChild(lowercase_letters[i]);
        current.appendChild(text);
        document.getElementById("lowercase_elements").appendChild(current);
    }

    for (let i = 0; i < 10; ++i) {
        let current = document.createElement("li");
        numbers.push(document.createElement("input"));
        numbers[i].setAttribute("type", "checkbox");
        numbers[i].setAttribute("id", '_' + String.fromCharCode('0'.charCodeAt(0) + i));
        numbers[i].checked = true;
        let text = document.createElement("span");
        text.textContent = String.fromCharCode('0'.charCodeAt(0) + i);
        current.appendChild(numbers[i]);
        current.appendChild(text);
        document.getElementById("number_elements").appendChild(current);
    }

    for (let i = 0; i < special_chars_as_chars.length; ++i) {
        let current = document.createElement("li");
        special_chars.push(document.createElement("input"));
        special_chars[i].setAttribute("type", "checkbox");
        special_chars[i].setAttribute("id", '__' + special_chars_as_chars[i].charCodeAt(0));
        special_chars[i].checked = true;
        let text = document.createElement("span");
        text.textContent = special_chars_as_chars[i];
        current.appendChild(special_chars[i]);
        current.appendChild(text);
        document.getElementById("special_char_elements").appendChild(current);
    }

}



function updatePossibleCharsArray() {
    possible_chars = [];
    for (const element of capital_letters) {
        if (element.checked)
            possible_chars.push(element.id);
    }
    for (const element of lowercase_letters) {
        if (element.checked)
            possible_chars.push(element.id);
    }
    for (const element of numbers) {
        if (element.checked)
            possible_chars.push(element.id[1]);
    }
    for (let i = 0; i < special_chars.length; i++) {
        if (special_chars[i].checked)
            possible_chars.push(special_chars_as_chars[i]);
    }
}



function getRandomPassword(length) {
    let string = "";
    for (let i = 0; i < length; i++) {
        string += possible_chars[Math.floor(Math.random() * possible_chars.length)];
    }
    return string;
}

document.getElementById('submit').onclick = function() {
    updatePossibleCharsArray();
    if (possible_chars.length == 0) {
        alert("Cannot generate a possword without any characters. Try again");
        return;
    }
    password_element.innerHTML = turnStringIntoHTMLString(getRandomPassword(length.value));
    document.getElementsByClassName('password-show')[0].style.display = 'block';
}

document.addEventListener("DOMContentLoaded", generate_boxes);