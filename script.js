// VARIABLES
let studentName = "";
let currentQuestion = 0;
let score = 0;
let timer = 30;
let interval;
let currentQuiz = [];
// QUESTIONS
const questions = {
HTML: [
{
question:"What does HTML stand for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"Hyperlinks Text Makeup Language",
"Hyper Tool Machine Language"
],
answer:0
},

{
question:"Which tag creates a hyperlink?",
options:[
"<a>",
"<link>",
"<href>",
"<url>"
],
answer:0
},

{
question:"Which tag creates a heading?",
options:[
"<h1>",
"<head>",
"<title>",
"<p>"
],
answer:0
}

],

CSS: [

{
question:"CSS stands for?",
options:[
"Cascading Style Sheets",
"Computer Style Sheets",
"Creative Style Sheets",
"Color Style Sheets"
],
answer:0
},

{
question:"Which property changes text color?",
options:[
"font-color",
"color",
"text",
"background"
],
answer:1
},

{
question:"Which property changes background color?",
options:[
"background-color",
"bg",
"color",
"body"
],
answer:0
}

],

JavaScript: [

{
question:"JavaScript is a?",
options:[
"Programming Language",
"Database",
"Operating System",
"Browser"
],
answer:0
},

{
question:"Which keyword declares a variable?",
options:[
"let",
"const",
"var",
"All of these"
],
answer:3
},

{
question:"Which function prints output in console?",
options:[
"print()",
"console.log()",
"console.print()",
"log()"
],
answer:1
}

]

};

// GREETING BASED ON TIME
function showGreeting() {

    let hour = new Date().getHours();
    let greeting = "";

    if (hour >= 5 && hour < 12) {
        greeting = "🌞 Good Morning!";
    }
    else if (hour >= 12 && hour < 17) {
        greeting = "☀️ Good Afternoon!";
    }
    else if (hour >= 17 && hour < 21) {
        greeting = "🌇 Good Evening!";
    }
    else {
        greeting = "🌙 Good Night!";
    }

    document.getElementById("greeting").textContent = greeting;
}
// LOGIN
function login(){

    studentName = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if(studentName === "" || password === ""){
        alert("Please enter Username and Password");
        return;
    }

    document.getElementById("studentName").textContent = studentName;

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    showHistory();

}
// LOGOUT
function logout(){

    clearInterval(interval);

    document.getElementById("dashboard").style.display = "none";
    document.getElementById("loginPage").style.display = "flex";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    document.getElementById("quizPage").classList.add("hide");
    document.getElementById("resultPage").classList.add("hide");

    document.querySelector(".hero-section").classList.remove("hide");
    document.querySelector(".dashboard-stats").classList.remove("hide");
    document.querySelector(".subject-section").classList.remove("hide");
    document.querySelector(".history").classList.remove("hide");    

}

// START QUIZ
function startQuiz(subject){

    currentQuiz = questions[subject];

    currentQuestion = 0;

    score = 0;

    document.querySelector(".hero-section").classList.add("hide");
    document.querySelector(".dashboard-stats").classList.add("hide");
    document.querySelector(".subject-section").classList.add("hide");
    document.querySelector(".history").classList.add("hide");

    document.getElementById("quizPage").classList.remove("hide");
    document.getElementById("resultPage").classList.add("hide");

    document.getElementById("subjectName").textContent = subject + " Quiz";

    loadQuestion();

}
// LOAD QUESTION
function loadQuestion(){

    clearInterval(interval);

    timer = 30;

    document.getElementById("timer").textContent = timer;

    interval = setInterval(startTimer,1000);

    let q = currentQuiz[currentQuestion];

    document.getElementById("question").textContent = q.question;

    let optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    for(let i=0;i<q.options.length;i++){

        let option = document.createElement("div");

        option.className = "option";

        option.textContent = q.options[i];

        option.onclick = function(){

            checkAnswer(i);

        };

        optionsDiv.appendChild(option);

    }

    let progress = ((currentQuestion + 1) / currentQuiz.length) * 100;

    document.getElementById("progressBar").style.width = progress + "%";

}
// TIMER
function startTimer(){

    timer--;

    document.getElementById("timer").textContent = timer;

    if(timer <= 0){

        nextQuestion();

    }

}
// CHECK ANSWER
function checkAnswer(index){

    if(index === currentQuiz[currentQuestion].answer){

        score++;

    }

    nextQuestion();

}
// NEXT QUESTION
function nextQuestion(){

    clearInterval(interval);

    currentQuestion++;

    if(currentQuestion < currentQuiz.length){

        loadQuestion();

    }
    else{

        showResult();

    }

}
// SHOW RESULT

function showResult(){

    document.getElementById("quizPage").classList.add("hide");

    document.getElementById("resultPage").classList.remove("hide");

    document.getElementById("finalScore").textContent =
    "Your Score : " + score + " / " + currentQuiz.length;

    // Save Result History

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.push(studentName + " - " + score + "/" + currentQuiz.length);

    localStorage.setItem("history", JSON.stringify(history));

}

// BACK TO DASHBOARD

function goHome(){

    document.getElementById("resultPage").classList.add("hide");

    document.querySelector(".hero-section").classList.remove("hide");
    document.querySelector(".dashboard-stats").classList.remove("hide");
    document.querySelector(".subject-section").classList.remove("hide");
    document.querySelector(".history").classList.remove("hide");

    showHistory();

}
// SHOW HISTORY

function showHistory(){

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let output = "";

    if(history.length === 0){

        output = "<p>No Quiz Attempted Yet.</p>";

    }
    else{

        for(let i = 0; i < history.length; i++){

            output += "<p>" + history[i] + "</p>";

        }

    }

    document.getElementById("history").innerHTML = output;

}
// Call greeting function
showGreeting();