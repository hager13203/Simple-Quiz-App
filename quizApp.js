const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next");

let score = 0;
let currentQuestionIndex = 0;
let totalQuestions = 20;
let time = 30;
z;
let timer;
let timeIsUp = false;

// Easy questions (10)
const easyQuestions = [
  {
    question: "The external JavaScript file must contain the <script> tag.",
    answers: ["YES", "NO"],
    correct: "NO",
    difficulty: "easy",
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    answers: ["<br>", "<break>"],
    correct: "<br>",
    difficulty: "easy",
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: ["style", "font"],
    correct: "style",
    difficulty: "easy",
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: ["function myFunction()", "function:myFunction()"],
    correct: "function myFunction()",
    difficulty: "easy",
  },
  {
    question: "Which HTML element defines the footer for a document?",
    answers: ["<footer>", "<bottom>"],
    correct: "<footer>",
    difficulty: "easy",
  },
  {
    question: "What does CSS stand for?",
    answers: ["Cascading Style Sheets", "Colorful Style Sheets"],
    correct: "Cascading Style Sheets",
    difficulty: "easy",
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    answers: ["<link>", "<a>"],
    correct: "<a>",
    difficulty: "easy",
  },
  {
    question: "What is the correct way to comment in JavaScript?",
    answers: ["// this is a comment", "<!-- this is a comment -->"],
    correct: "// this is a comment",
    difficulty: "easy",
  },
  {
    question: "Which element is used to define a list item in HTML?",
    answers: ["<li>", "<list>"],
    correct: "<li>",
    difficulty: "easy",
  },
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "High Text Markup Language"],
    correct: "Hyper Text Markup Language",
    difficulty: "easy",
  },
];

// Hard questions (10)
const hardQuestions = [
  {
    question: "Where is the correct place to insert a JavaScript?",
    answers: ["<body>", "<head>", "both"],
    correct: "both",
    difficulty: "hard",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<script>", "<js>"],
    correct: "<script>",
    difficulty: "hard",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: ["==", "=", "==="],
    correct: "=",
    difficulty: "hard",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answers: [
      "myFunction()",
      "call myFunction()",
      "call function myFunction()",
    ],
    correct: "myFunction()",
    difficulty: "hard",
  },
  {
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    answers: [
      "It refers to the current object",
      "It refers to the global object",
    ],
    correct: "It refers to the current object",
    difficulty: "hard",
  },
  {
    question: "What will the following code output: console.log(typeof null)?",
    answers: ["object", "null", "undefined"],
    correct: "object",
    difficulty: "hard",
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: ["Undefined", "Character", "Boolean"],
    correct: "Character",
    difficulty: "hard",
  },
  {
    question:
      "Which method is used to convert a JSON string into a JavaScript object?",
    answers: ["JSON.parse()", "JSON.stringify()"],
    correct: "JSON.parse()",
    difficulty: "hard",
  },
  {
    question: "What is the result of 5 + '5' in JavaScript?",
    answers: ["10", "55", "Error"],
    correct: "55",
    difficulty: "hard",
  },
  {
    question: "Which keyword is used to create a class in JavaScript?",
    answers: ["class", "function", "constructor"],
    correct: "class",
    difficulty: "hard",
  },
];

// Combine questions
const allQuestions = [...easyQuestions, ...hardQuestions];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(allQuestions);

function displayQuestion() {
  if (currentQuestionIndex >= totalQuestions) {
    clearInterval(timer);
    showResult();
    return;
  }
  const question = allQuestions[currentQuestionIndex];
  questionElement.textContent = question.question;
  optionsElement.innerHTML = "";
  question.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => {
      if (!timeIsUp) {
        checkAnswer(answer, question.correct, question.difficulty);
      }
    };
    optionsElement.appendChild(btn);
  });
}

function checkAnswer(selectedAnswer, correctAnswer, difficulty) {
  if (selectedAnswer === correctAnswer) {
    score += difficulty === "easy" ? 1 : 3;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < totalQuestions) {
    displayQuestion();
  } else {
    clearInterval(timer);
    showResult();
  }
}

function showResult() {
  disableButtons();

  let performance;
  if (score <= 10) {
    performance = "Bad";
  } else if (score <= 20) {
    performance = "Fair";
  } else {
    performance = "Good";
  }

  resultElement.textContent = `Your score: ${score} - ${performance}`;
}

function startTimer() {
  time = 50;
  timerElement.textContent = `Time Left: ${time} seconds`;
  timeIsUp = false;

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    timerElement.textContent = `Time Left: ${time} seconds`;
    if (time <= 0) {
      clearInterval(timer);
      timeIsUp = true;
      resultElement.textContent = "Time is Over";
      showResult();
    }
  }, 1000);
}

// Disable buttons
function disableButtons() {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
}

nextButton.onclick = () => {
  startTimer();
  displayQuestion();
};

startTimer();
displayQuestion();
