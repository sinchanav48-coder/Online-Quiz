let studentName = "";
let currentQuestion = 0;
let score = 0;
let timer = 30;
let interval;
let currentQuiz = [];

const questions = {
    HTML: [
        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks Text Makeup Language",
                "Hyper Tool Machine Language"
            ],
            answer: 0
        },
        {
            question: "Which tag creates a hyperlink?",
            options: ["<a>", "<link>", "<href>", "<url>"],
            answer: 0
        },
        {
            question: "Which tag creates a heading?",
            options: ["<h1>", "<head>", "<title>", "<p>"],
            answer: 0
        }
    ],

    CSS: [
        {
            question: "CSS stands for?",
            options: [
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Creative Style Sheets",
                "Color Style Sheets"
            ],
            answer: 0
        },
        {
            question: "Which property changes text color?",
            options: ["font-color", "color", "text", "background"],
            answer: 1
        },
        {
            question: "Which property changes background color?",
            options: ["background-color", "bg", "color", "body"],
            answer: 0
        }
    ],

    JavaScript: [
        {
            question: "JavaScript is a?",
            options: [
                "Programming Language",
                "Database",
                "Operating System",
                "Browser"
            ],
            answer: 0
        },
        {
            question: "Which keyword declares a variable?",
            options: ["let", "const", "var", "All of these"],
            answer: 3
        },
        {
            question: "Which function prints output in console?",
            options: ["print()", "console.log()", "console.print()", "log()"],
            answer: 1
        }
    ]
};

function getHistoryKey() {
    return "history_" + studentName;
}

function login() {
    studentName = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (studentName === "" || password === "") {
        alert("Please enter Username and Password");
        return;
    }

    document.getElementById("studentName").textContent = studentName;
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";

    showHistory();
}

function logout() {
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
    document.querySelector(".history-section").classList.remove("hide");
}

function startQuiz(subject) {
    currentQuiz = questions[subject];
    currentQuestion = 0;
    score = 0;

    document.querySelector(".hero-section").classList.add("hide");
    document.querySelector(".dashboard-stats").classList.add("hide");
    document.querySelector(".subject-section").classList.add("hide");
    document.querySelector(".history-section").classList.add("hide");

    document.getElementById("quizPage").classList.remove("hide");
    document.getElementById("resultPage").classList.add("hide");

    document.getElementById("subjectName").textContent = subject + " Quiz";

    loadQuestion();
}

function loadQuestion() {
    clearInterval(interval);

    timer = 30;
    document.getElementById("timer").textContent = timer;
    interval = setInterval(startTimer, 1000);

    let q = currentQuiz[currentQuestion];
    document.getElementById("question").textContent = q.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    for (let i = 0; i < q.options.length; i++) {
        let option = document.createElement("div");
        option.className = "option";
        option.textContent = q.options[i];
        option.onclick = function () {
            checkAnswer(i);
        };
        optionsDiv.appendChild(option);
    }

    let progress = ((currentQuestion + 1) / currentQuiz.length) * 100;
    document.getElementById("progressBar").style.width = progress + "%";
}

function startTimer() {
    timer--;
    document.getElementById("timer").textContent = timer;

    if (timer <= 0) {
        nextQuestion();
    }
}

function checkAnswer(index) {
    if (index === currentQuiz[currentQuestion].answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    clearInterval(interval);
    currentQuestion++;

    if (currentQuestion < currentQuiz.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quizPage").classList.add("hide");
    document.getElementById("resultPage").classList.remove("hide");

    document.getElementById("finalScore").textContent =
        "Your Score : " + score + " / " + currentQuiz.length;

    let percentage = Math.round((score / currentQuiz.length) * 100);
    let history = JSON.parse(localStorage.getItem(getHistoryKey())) || [];

    history.push({
        date: new Date().toLocaleDateString(),
        subject: document.getElementById("subjectName").textContent,
        score: score + "/" + currentQuiz.length,
        percentage: percentage + "%"
    });

    localStorage.setItem(getHistoryKey(), JSON.stringify(history));

    showHistory();
}

function goHome() {
    document.getElementById("resultPage").classList.add("hide");

    document.querySelector(".hero-section").classList.remove("hide");
    document.querySelector(".dashboard-stats").classList.remove("hide");
    document.querySelector(".subject-section").classList.remove("hide");
    document.querySelector(".history-section").classList.remove("hide");

    showHistory();
}

function showHistory() {
    document.getElementById("historyStudentName").textContent = studentName;

    let history = JSON.parse(localStorage.getItem(getHistoryKey())) || [];
    let output = "";

    if (history.length === 0) {
        output = `
            <tr>
                <td colspan="4">No Quiz Attempted Yet</td>
            </tr>
        `;
    } else {
        history.forEach(item => {
            output += `
                <tr>
                    <td>${item.date}</td>
                    <td>${item.subject}</td>
                    <td>${item.score}</td>
                    <td>${item.percentage}</td>
                </tr>
            `;
        });
    }

    document.getElementById("historyBody").innerHTML = output;
}