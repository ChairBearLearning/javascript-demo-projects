This freecodecamp project is for demonstrating an understanding of debugging.

https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/learn-basic-debugging-by-building-a-random-background-color-changer/step-1

Step 1
CamperBot is trying to build out a random background color changer. But they keep running into issues and need your help to debug the code.

CamperBot has already added the HTML and CSS for the project. But they are confused as to why none of the styles and content is showing up on the page.

When they open up the console they see this message:

Example Code
SyntaxError: unknown: Unexpected token, expected "," (5:2)
Syntax errors are thrown when the JavaScript engine encounters something it can't interpret. In this case, it looks like CamperBot has syntax errors in the darkColorsArr array.


Step 2
Now, CamperBot is trying to create a function that will return a random index from the darkColorsArr. But they have run into the following error message:

Example Code
Uncaught ReferenceError: math is not defined
A ReferenceError is thrown when a non-existent variable is referenced. In this case, it looks like CamperBot is trying to use math but JavaScript doesn't have a math object.

Fix CamperBot's error in the math.random() line and open up the console again.

Step 3
Now that the ReferenceError is resolved, the console is displaying the correct results for a random number between 0 and 9. But CamperBot was not expecting to see decimal numbers like these:

Example Code
0.015882899879771095
2.114596286197641
6.040964780197666
Update the console statement to print a whole number between 0 and 9.

Remember that you worked with a method in the Role Playing Game that rounds a number down to the nearest whole number.

Step 4
CamperBot is finished with building out the getRandomIndex function and it is working as expected.

But now they are running into this issue when trying to create a reference to the body element in the DOM:

Example Code
Uncaught TypeError: document.queryselector is not a function
A TypeError means that the code is trying to perform an operation on a value that is not of the expected type.

Fix the TypeError by updating the document.queryselector method to the correct method name that selects an element from the DOM.

Step 5
CamperBot has created a new variable called bgHexCodeSpanElement to store the reference to the span element with the id of bg-hex-code. However, when they try to log that variable to the console, they get null.

null is a special value in JavaScript that represents the absence of a value. This can happen when you try to access a property of an object that doesn't exist.

In this case, CamperBot is not passing in the correct selector to the document.querySelector method.

Fix the document.querySelector("bg-hex-code") line so that it correctly selects the element with the id of bg-hex-code.

"#800020",
];
function getRandomIndex() {
const randomIndex = Math.floor(darkColorsArr.length * Math.random());
return randomIndex;
}

const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("bg-hex-code");

Check Your Code (Command + Enter)
Reset


Step 6
CamperBot has now created a function called changeBackgroundColor that changes the background color of the page to a random color from the darkColorsArr array. The function also displays the hex code for that new color.

When they try to test out this function, they notice that the background color is not changing and the text shows the following:

Example Code
Hex Code: undefined
undefined is showing up here because the color variable is not being set correctly.

Fix the error in the darkColorsArr[getRandomIndex] line so that the color variable is set to a random color from the darkColorsArr array.
