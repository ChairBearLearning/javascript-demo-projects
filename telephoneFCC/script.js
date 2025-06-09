const input = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultDiv = document.getElementById('results-div');

// regex to match valid US phone number formats
const validUSPhoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/;

checkBtn.addEventListener('click', () => {
    const value = input.value.trim();

    if (value === '') {
        alert("Please provide a phone number");
        return;
    }

    const isValid = validUSPhoneRegex.test(value);
    resultDiv.textContent = `${isValid ? "Valid" : "Invalid"} US number: ${value}`;
});

clearBtn.addEventListener('click', () => {
    resultDiv.textContent = '';
});
