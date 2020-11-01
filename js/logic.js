const textArea = document.querySelector(".area__text");
const counter = document.querySelector(".symbols__counter");
const number = document.querySelector(".number");
const languageChoice = document.getElementsByName("language__choice");
const upload__button = document.querySelector(".area__download");
const upload__file = document.querySelector(".input__file");
const time = document.querySelector(".time");


let cost = 0.00;
let langID = -1;

function startCalculation() {
    langID = languageID();
    costCalculation();
    timeCalculation();
    hideTime();
}


textArea.addEventListener("input", () => {
    setTimeout(() => {
        counter.innerHTML = textArea.value.length;
        if (textArea.value.length > 0) {
            upload__button.style.display = "none"
        } else {
            upload__button.style.display = "unset"
        }
        startCalculation();
    }, 0)

})
for (let i = 0; i < languageChoice.length; i++) {
    languageChoice[i].onchange = startCalculation;
}


function costCalculation() {
    let costStr;
    let coin;
    let bill;
    let coefficient = (langID < 2) ? 5 : 12
    if (textArea.value.length < 1000) {
        number.innerHTML = ((langID === -1 || textArea.value.length === 0) ? "0,00" : (langID < 2) ? "50,00" : "120,00") + " грн";
    } else {
        cost = textArea.value.length * coefficient;
        costStr = cost.toString();
        coin = costStr.slice(costStr.length - 2);
        bill = costStr.slice(0, costStr.length - 2);
        number.innerHTML = bill + "," + coin + " грн";
    }
}

let minutes;

function timeCalculation() {
    let deadLine = new Date();
    let textPerHour,
        hours,
        mask;

    if (langID !== -1) {
        textPerHour = (langID < 2) ? 1333 : 333;
        hours = Math.floor(textArea.value.length / textPerHour);
        mask = textArea.value.length % textPerHour;
        if (hours < 1) hours = 1;
        minutes = deadLine.getMinutes();
        for (let i = 0; i < hours; i++) {
            switch (deadLine.getDay()) {
                case 0:
                    deadLine = weekEnds(deadLine, 1, minutes)
                    break;
                case 6:
                    deadLine = weekEnds(deadLine, 2, minutes)
                    break;
            }
            if (deadLine.getHours() >= 19) {
                deadLine = weekEnds(deadLine, 1, minutes)
                hours++;
                continue;
            }
            if (deadLine.getHours() < 10) {
                deadLine = weekEnds(deadLine, 0, minutes);
            }
            deadLine.setHours(deadLine.getHours() + 1);
            if (i === hours - 1) {
                if (mask >= textPerHour / 2) {
                    deadLine.setMinutes(deadLine.getMinutes() + 30)
                }
                deadLine = roundingDate(deadLine);
            }
            time.innerHTML = "Термін виконання: " + formatDate(deadLine) + " о " + formatTime(deadLine);
        }
    }
}

function weekEnds(date, x, min) {
    date.setHours(10, min, 0, 0);
    date.setDate(date.getDate() + x)
    // date.setMinutes(minutes + 30);
    return date;
}


function languageID() {
    for (let i = 0; i < languageChoice.length; i++) {
        if (languageChoice[i].checked) {
            return languageChoice[i].value;
        }
    }
    return -1;
}


function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

function formatTime(date) {
    let h = date.getHours();
    if (h < 10) h = '0' + h;

    let m = date.getMinutes();
    if (m < 10) m = '0' + m;

    return h + ":" + m;
}

function hideTime() {
    if (textArea.value.length === 0 || langID === -1) {
        time.style.opacity = "0"
        console.log("hide")
    } else {
        time.style.opacity = "1"
    }
}

function roundingDate(date) {
    console.log("round")
    let minute = date.getMinutes();
    switch (true) {
        case (minute < 15):
            date.setMinutes(0);
            break;
        case (minute < 30):
            date.setMinutes(30);
            break;
        case (minute < 50):
            date.setMinutes(30);
            break;
        case (minute >= 50):
            date.setHours(date.getHours()+1, 0)
            if (date.getHours() >= 19) {
                date = weekEnds(date, 1, 60)
            }
            break;
    }
    console.log(date);
    minutes = minute;
    return date;
}


