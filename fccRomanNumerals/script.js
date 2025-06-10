const romanMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IVL: 4,
    I:1
}

function validateInput(){
    var input = document.getElementById('number');
    var ourString = input.value;
    var resultsDiv = document.getElementById('output');

    // clear only if previous result exists
    if (resultsDiv.innerHTML.trim() !== '') {
        resultsDiv.innerHTML = '';
    }

    var result = document.createElement('span');

    if(ourString == '' ){
        result.innerText = 'Please enter a valid number';
        return resultsDiv.appendChild(result);
    } else if(Number(ourString) <= -1){
        result.innerText = 'Please enter a number greater than or equal to 1';
        return resultsDiv.appendChild(result);
    } else if(Number(ourString) >= 4000){
        result.innerText = 'Please enter a number less than or equal to 3999';
        return resultsDiv.appendChild(result);
    }
    else{
        var sanitise = sanatiseString(ourString);
        var convertedStr = Number(sanitise);
        outputResult(convertedStr);
    }
}

function outputResult(numToCovert){
    var resultsDiv = document.getElementById('output');
    var result = document.createElement('span');
    var str = convertToRoman(numToCovert);
    result.innerText = `${str}`;
    resultsDiv.appendChild(result);
}

function sanatiseString(str){
    // convert to lowercase and remove non-alphanumeric characters
    const cleaned = str.toLowerCase().trim().replace(/[^0-9]/g, '');
    return cleaned;
}

function convertToRoman(num) {
    let result = '';

    // loop through each Roman numeral in the map
    for (let [roman, value] of Object.entries(romanMap)) {
        while (num >= value) {
            result += roman;
            num -= value;
        }
    }

    return result;
}



