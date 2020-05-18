// Function constructor
/* 
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

var Person = function(name, yearOfBirth, job) {  //Function constructors are Capitalized
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}     
// All objects have access to this METHOD because it is in the prototype property of the function constructor. This is inhieritance in action
Person.prototype.calculateAge = function() {
    console.log(2020 - this.yearOfBirth);
}
//Same can be done for properties
Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher'); // 'new' operator, 1st creates new empty object, then constructor function is called, also points the 'this' variable to the new empty object not the global object.

var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName); */

// Object.create, another way to create an object. Allows for the implimentation of more complex inhieritance structures in an easier way. allows direct specification of objects for prototype
/* 
var personProto = {
    calculateAge: function() {
        console.log(2020 - this.yearOfBirth); 
    }
};
// one way to input instances
var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';
// another way to input instances
var jane = Object.create(personProto, {
    name: { value: 'Jane' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});
 */
/* 
 // Primitives vs Objects

 //primatives
 var a = 23;
 var b = a;
 a = 46;
 console.log(a);
 console.log(b);

 //objects
 var obj1 = {
     name: 'John',
     age: 26
 };
 var obj2 = obj1;
 obj1.age = 30;
 console.log(obj1.age);
 console.log(obj2.age);

 //functions
 var age = 27;
 var obj = {
     name: 'Jonas',
     city: 'Lisbon'
 };

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);
console.log(age);
console.log(obj.city); 
*/

// Functions

// Passing functions as arguments
/* 
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {  //Generic function to loop over the array, note has function(fn) as an argument
    var arrRes = []; // create new array for result
    for (var i = 0; i < arr.length; i++) { //loop through existing array
        arrRes.push(fn(arr[i])); // pushes result of the function into the new array
    }
    return arrRes;
}
//Callback functions, can make as many as needed, best practice, cleaner and more readable
function calculateAge(el) { // el is for element which in this case is the year called from the years array
    return 2016 - el;
}

function isFullAge(el) { // el is for element which in this case is the age calculated from calculateAge
    return el >= 18;
}

function maxHeartRate(el) { // el is for element which in this case is the age calculated from calculateAge
    if (el >= 18 && el <= 81) {  // max heartrate formula only works for persons between ages 18 and 81
        return Math.round(206.9 - (0.67 * el)); // using Math.round method to round number to closest integer
    } else {
        return -1;
    }
}
    

var ages = arrayCalc(years, calculateAge); // whats in parenthesis sets the arguments in the arrayCalc function
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates); */

// Functions returning functions
/* 
function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name);
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');

teacherQuestion('John');
designerQuestion('Jane');

//another way to call
interviewQuestion('teacher')('Mark');
 */

 // Immediately Invoked Function Expressions aka IIFE
//Generic function for example
// function game() {
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// }
// game();

// Same function as IIFE
/* 
 (function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
 })();

 //console.log(score);

 (function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
 })(5); 
 */
/* 
 // Closures

function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) {
        var age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + a);
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementGermany(1990);
retirementUS(1990);
retirementIceland(1990); 
*/

// Bind, call and apply
/* 
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer',
};

john.presentation('formal', 'morning');
john.presentation.call(emily, 'friendly', 'afternoon'); // call allows us to set emily to "this". This way is called "method borrowing"

//john.presentation.apply(emily, ['friendly', 'afternoon']); //Similar to above, but for arrays (wont work here as there is no array to point to in this example)

var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');

// another example using bind from earlier example
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {  //Generic function to loop over the array, note has function(fn) as an argument
    var arrRes = []; // create new array for result
    for (var i = 0; i < arr.length; i++) { //loop through existing array
        arrRes.push(fn(arr[i])); // pushes result of the function into the new array
    }
    return arrRes;
}
//Callback functions, can make as many as needed, best practice, cleaner and more readable
function calculateAge(el) { // el is for element which in this case is the year called from the years array
    return 2016 - el;
}

function isFullAge(limit, el) { // el is for element which in this case is the age calculated from calculateAge
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);
*/

/////////////////////////////
// CODING CHALLENGE


/*
--- Beginner level ---

--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
/*
//immediately invoked function expression (IIFE) to be sure our code is private and does not interfre with other code
(function() { //immediately invoked function expression opening

// function constructor
function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}
//methods into questions prototype property. all of these objects can access this prototype chain
//method to display question
Question.prototype.displayQuestion = function() {
    console.log(this.question);
// loop through the answers
    for (var i = 0; i < this.answers.length; i++) {
// display answer and number
        console.log(i + ': ' + this.answers[i]);
    }
}
// method to check if answer is correct
Question.prototype.checkAnswer = function(ans) {
    if (ans === this.correct) {
        console.log('Correct answer!');
    } else {
        console.log('Wrong answer. Try again :)');
    }
}
// questions
var q1 = new Question('Is JavaScript the coolest programming language in the world?', 
                        ['Yes', 'No'],
                         0);

var q2 = new Question('What is the name of this course\'s teacher?',
                        ['John', 'Michael', 'Jonas'],
                        2);

var q3 = new Question('What does best describe coding?',
                        ['Boring', 'Hard', 'Fun', 'Tedious'],
                        2);
// store in an array and select one random question
var questions = [q1, q2, q3];

var n = Math.floor(Math.random() * questions.length);
questions[n].displayQuestion();
// prompt user to ask for the correct answer
var answer = parseInt(prompt('Please select the correct answer.')); //need parseInt to have the input be an integer and not a string
//call the check answer method
questions[n].checkAnswer(answer);

})(); // immediatly invoked function expression (IIFE) closing
*/
/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/


//immediately invoked function expression (IIFE) to be sure our code is private and does not interfre with other code
(function() { //immediately invoked function expression opening

    // function constructor
    function Question(question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    //methods into questions prototype property. all of these objects can access this prototype chain
    //method to display question
    Question.prototype.displayQuestion = function() {
        console.log(this.question);
    // loop through the answers
        for (var i = 0; i < this.answers.length; i++) {
    // display answer and number
            console.log(i + ': ' + this.answers[i]);
        }
    }
    // method to check if answer is correct
    Question.prototype.checkAnswer = function(ans, callback) {
        var sc;
        if (ans === this.correct) {
            console.log('Correct answer!');
            sc = callback(true);
        } else {
            console.log('Wrong answer. Try again :)');
            sc = callback(false);
        }
        this.displayScore(sc);
    }
    // method to display score
    Question.prototype.displayScore = function(score) {
        console.log('Your current score is: ' + score);
        console.log('------------------------------------');
    }
    // questions
    var q1 = new Question('Is JavaScript the coolest programming language in the world?', 
                            ['Yes', 'No'],
                             0);
    
    var q2 = new Question('What is the name of this course\'s teacher?',
                            ['John', 'Michael', 'Jonas'],
                            2);
    
    var q3 = new Question('What does best describe coding?',
                            ['Boring', 'Hard', 'Fun', 'Tedious'],
                            2);
    // store in an array 
    var questions = [q1, q2, q3];
    // keeping score with closures and keep updated
    function score() {
        var sc = 0; 
        return function(correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }
    var keepScore = score();

    // -adv- take game logic from first challenge and place in fuction 
    function nextQuestion() {
        //select random question
        var n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();
        // prompt user to ask for the correct answer
        var answer = prompt('Please select the correct answer.'); 
        // way to stop the process otherwise this runs infinitely
        if(answer !== 'exit') {
            //call the check answer method
            questions[n].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }

    nextQuestion();

})(); // immediatly invoked function expression (IIFE) closing