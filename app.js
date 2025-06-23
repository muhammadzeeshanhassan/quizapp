const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Madrid", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },

    {
        question: "Which of the following is a JavaScript data type?",
        answers: [
            { text: "Number", correct: true },
            { text: "Float", correct: false },
            { text: "Decimal", correct: false },
            { text: "Character", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Google", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Oracle", correct: false }
        ]
    }
];


// DOM Manipulation

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const timerElement = document.getElementById("timer");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const userAnswers = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.length = 0;
    showQuestion();
}

function showQuestion() {

    resetQuestion(); // To move question to another

    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    // console.log(currentQuestion.question);

    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
        console.log(answer.text);
    })

    startTimer();
}

function resetQuestion() {
    clearInterval(timer);
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function disableAllButtons() {
    const allButtons = answerButton.querySelectorAll("button");
    allButtons.forEach(btn => {
        btn.disabled = true;
    });
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    disableAllButtons();

    selectedButton.classList.add("marked");
    if (isCorrect) score += 1;

    userAnswers.push({
        question: questions[currentQuestionIndex].question,
        selectedAnswer: selectedButton.innerText,
        isCorrect
    });

    setTimeout(() => {
        handleNextButton();
    }, 1000);
}

function handleTimeUp() {
    disableAllButtons();
    userAnswers.push({
        question: questions[currentQuestionIndex].question,
        selectedAnswer: "No Answer",
        isCorrect: false
    });
    setTimeout(() => {
        handleNextButton();
    }, 1000);
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetQuestion();
    timerElement.innerHTML = "";

    questionElement.innerHTML = `You got ${score} out of ${questions.length} correct.`;
    const resultSummary = document.createElement("div");

    userAnswers.forEach((entry, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.style.margin = "10px 0";
        entryDiv.innerHTML = `
            <strong>Q${index + 1}: ${entry.question}</strong><br>
            <span style="color: ${entry.isCorrect ? 'green' : 'red'}">
                Your Answer: ${entry.selectedAnswer} - ${entry.isCorrect ? 'Correct' : 'Wrong'}
            </span>
        `;
        resultSummary.appendChild(entryDiv);
    });

    answerButton.appendChild(resultSummary);
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function startTimer() {
    timeLeft = 10;
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

nextButton.addEventListener("click", () => {
    startQuiz();
})

startQuiz();