function validateInput(){
    var input = document.getElementById('text-input');
    var ourString = input.value;
    var resultsDiv = document.getElementById('result');

    // clear only if previous result exists
    if (resultsDiv.innerHTML.trim() !== '') {
        resultsDiv.innerHTML = '';
    }

    if(ourString == '' ){
        return alert('Please input a value');
    } else{
        var isPal = isPalindrome(ourString);
        outputResult(ourString, isPal);
    }
}

function isPalindrome(str) {
    // convert to lowercase and remove non-alphanumeric characters
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // reverse the cleaned string
    const reversed = cleaned.split('').reverse().join('');

    // compare
    return cleaned === reversed;
}

function outputResult(str, bool){
    var resultsDiv = document.getElementById('result');
    var result = document.createElement('span');
    if(bool){
        result.innerText = `${str} is a palindrome`;
    } else {
        result.innerText = `${str} is not a palindrome`;
    }
    resultsDiv.appendChild(result);
}



