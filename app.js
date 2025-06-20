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
const nextButton = document.getElementById("next");
const answerButton = document.getElementById("answer-buttons");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
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

}

function resetQuestion() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    let selectedButton = e.target;
    console.log(e.target);
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score += 1;
    } else {
        selectedButton.classList.add("incorrect");
    }

    // Array.from(answerButton.children).forEach(button => {
    //     if (button.dataset.correct === "true") {
    //         button.classList.add("correct");
    //     }
    //     button.disabled = true;
    // });

    let allButtons = answerButton.children;

    for (let i = 0; i < allButtons.length; i++) {
        let button = allButtons[i];

        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    }
    nextButton.style.display = "block";
}

function showScore() {
    resetQuestion();
    questionElement.innerHTML = `You got ${score} out of ${questions.length} marks.`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex += 1;
    if (currentQuestionIndex < questions.length) {
        showQuestion();

    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();