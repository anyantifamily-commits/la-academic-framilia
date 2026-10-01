/* =========================================
   LA ACADEMIC FRAMILIA CBT
   QUIZ CONFIGURATION
========================================= */

const QUIZ_CONFIG = {

    // =====================================
    // QUIZ INFORMATION
    // =====================================

    title: "BIO 101 — Cell Biology",


    // TIME LIMIT IN MINUTES

    timeLimit: 60,


    // =====================================
    // QUESTIONS
    // =====================================

    questions: [

        {
            question:
                "What is the basic unit of structure and function in a living organism?",

            options: [
                "Organ",
                "Tissue",
                "Cell",
                "Organelle"
            ],

            answer: "Cell",

            explanation:
                "The cell is the basic structural and functional unit of life."
        },


        {
            question:
                "Which organelle is primarily responsible for ATP production in eukaryotic cells?",

            options: [
                "Ribosome",
                "Mitochondrion",
                "Golgi apparatus",
                "Lysosome"
            ],

            answer: "Mitochondrion",

            explanation:
                "Mitochondria are the major sites of ATP production in eukaryotic cells."
        },


        {
            question:
                "Which structure controls the movement of substances into and out of the cell?",

            options: [
                "Cell wall",
                "Nucleus",
                "Plasma membrane",
                "Nucleolus"
            ],

            answer: "Plasma membrane",

            explanation:
                "The plasma membrane regulates the movement of substances into and out of the cell."
        }

    ]

};


/* =========================================
   MAXIMUM QUESTIONS
========================================= */

const MAX_QUESTIONS = 100;


/*
   Even if more than 100 questions are
   accidentally added, only the first
   100 will be used.
*/

const questions =
    QUIZ_CONFIG.questions.slice(
        0,
        MAX_QUESTIONS
    );


/* =========================================
   QUIZ STATE
========================================= */

let currentQuestion = 0;

let userAnswers =
    new Array(questions.length).fill(null);

let timeRemaining =
    QUIZ_CONFIG.timeLimit * 60;

let timerInterval = null;

let quizSubmitted = false;


/* =========================================
   HTML ELEMENTS
========================================= */

const quizTitle =
    document.getElementById("quizTitle");

const timer =
    document.getElementById("timer");

const questionCounter =
    document.getElementById("questionCounter");

const progressPercent =
    document.getElementById("progressPercent");

const progressFill =
    document.getElementById("progressFill");

const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("questionText");

const optionsContainer =
    document.getElementById("optionsContainer");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const submitBtn =
    document.getElementById("submitBtn");

const questionNavigator =
    document.getElementById("questionNavigator");

const answeredCount =
    document.getElementById("answeredCount");

const resultSection =
    document.getElementById("resultSection");

const resultScore =
    document.getElementById("resultScore");

const resultPercentage =
    document.getElementById("resultPercentage");

const resultMessage =
    document.getElementById("resultMessage");

const reviewContainer =
    document.getElementById("reviewContainer");

const reviewBtn =
    document.getElementById("reviewBtn");

const homeBtn =
    document.getElementById("homeBtn");


/* =========================================
   CHECK FOR QUESTIONS
========================================= */

if (questions.length === 0) {

    alert(
        "No questions have been added to this CBT yet."
    );

} else {

    initializeQuiz();

}


/* =========================================
   INITIALIZE QUIZ
========================================= */

function initializeQuiz() {

    quizTitle.textContent =
        QUIZ_CONFIG.title;


    createQuestionNavigator();

    showQuestion();

    startTimer();

}


/* =========================================
   SHOW QUESTION
========================================= */

function showQuestion() {

    const question =
        questions[currentQuestion];


    questionNumber.textContent =
        `QUESTION ${String(
            currentQuestion + 1
        ).padStart(2, "0")}`;


    questionText.textContent =
        question.question;


    questionCounter.textContent =
        `Question ${
            currentQuestion + 1
        } of ${questions.length}`;


    const percentage =
        (
            (currentQuestion + 1)
            /
            questions.length
        ) * 100;


    progressPercent.textContent =
        `${Math.round(percentage)}%`;


    progressFill.style.width =
        `${percentage}%`;


    optionsContainer.innerHTML = "";


    question.options.forEach(
        (option, index) => {

            const optionButton =
                document.createElement("button");


            optionButton.className =
                "option";


            if (
                userAnswers[currentQuestion]
                === option
            ) {

                optionButton.classList.add(
                    "selected"
                );

            }


            optionButton.innerHTML = `

                <span class="option-letter">
                    ${String.fromCharCode(
                        65 + index
                    )}
                </span>

                <span class="option-text">
                    ${option}
                </span>

            `;


            optionButton.addEventListener(
                "click",
                () => {

                    selectAnswer(option);

                }
            );


            optionsContainer.appendChild(
                optionButton
            );

        }
    );


    previousBtn.disabled =
        currentQuestion === 0;


    if (
        currentQuestion
        === questions.length - 1
    ) {

        nextBtn.textContent =
            "Finish →";

    } else {

        nextBtn.textContent =
            "Next →";

    }


    updateNavigator();

}


/* =========================================
   SELECT ANSWER
========================================= */

function selectAnswer(answer) {

    if (quizSubmitted) return;


    userAnswers[currentQuestion] =
        answer;


    showQuestion();

}


/* =========================================
   NEXT BUTTON
========================================= */

nextBtn.addEventListener(
    "click",
    () => {

        if (
            currentQuestion
            <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

        } else {

            submitQuiz();

        }

    }
);


/* =========================================
   PREVIOUS BUTTON
========================================= */

previousBtn.addEventListener(
    "click",
    () => {

        if (currentQuestion > 0) {

            currentQuestion--;

            showQuestion();

        }

    }
);


/* =========================================
   QUESTION NAVIGATOR
========================================= */

function createQuestionNavigator() {

    questionNavigator.innerHTML = "";


    questions.forEach(
        (question, index) => {

            const button =
                document.createElement("button");


            button.className =
                "question-dot";


            button.textContent =
                index + 1;


            button.addEventListener(
                "click",
                () => {

                    currentQuestion =
                        index;

                    showQuestion();

                }
            );


            questionNavigator.appendChild(
                button
            );

        }
    );

}


function updateNavigator() {

    const buttons =
        questionNavigator.querySelectorAll(
            ".question-dot"
        );


    buttons.forEach(
        (button, index) => {

            button.classList.remove(
                "current",
                "answered"
            );


            if (
                index === currentQuestion
            ) {

                button.classList.add(
                    "current"
                );

            }


            if (
                userAnswers[index]
                !== null
            ) {

                button.classList.add(
                    "answered"
                );

            }

        }
    );


    const answered =
        userAnswers.filter(
            answer =>
                answer !== null
        ).length;


    answeredCount.textContent =
        `${answered} answered`;

}


/* =========================================
   TIMER
========================================= */

function startTimer() {

    updateTimerDisplay();


    timerInterval =
        setInterval(
            () => {

                if (
                    timeRemaining <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );


                    submitQuiz(true);

                    return;

                }


                timeRemaining--;

                updateTimerDisplay();

            },
            1000
        );

}


function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timeRemaining / 60
        );


    const seconds =
        timeRemaining % 60;


    timer.textContent =
        `${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(
            2,
            "0"
        )}`;

}


/* =========================================
   SUBMIT BUTTON
========================================= */

submitBtn.addEventListener(
    "click",
    () => {

        const unanswered =
            userAnswers.filter(
                answer =>
                    answer === null
            ).length;


        if (unanswered > 0) {

            const proceed =
                confirm(
                    `You have ${unanswered} unanswered question(s). Submit anyway?`
                );


            if (!proceed) return;

        }


        submitQuiz();

    }
);


/* =========================================
   SUBMIT QUIZ
========================================= */

function submitQuiz(timeUp = false) {

    if (quizSubmitted) return;


    quizSubmitted = true;


    clearInterval(
        timerInterval
    );


    /*
       Remember that this browser has
       completed the CBT.
    */

    localStorage.setItem(
        "laAcademicQuizCompleted",
        "true"
    );


    let score = 0;


    questions.forEach(
        (question, index) => {

            if (
                userAnswers[index]
                === question.answer
            ) {

                score++;

            }

        }
    );


    const percentage =
        Math.round(
            (
                score
                /
                questions.length
            ) * 100
        );


    showResults(
        score,
        percentage,
        timeUp
    );

}


/* =========================================
   SHOW RESULTS
========================================= */

function showResults(
    score,
    percentage,
    timeUp
) {

    document.querySelector(
        ".question-card"
    ).style.display = "none";


    document.querySelector(
        ".navigation"
    ).style.display = "none";


    document.querySelector(
        ".navigator-card"
    ).style.display = "none";


    submitBtn.style.display =
        "none";


    resultSection.style.display =
        "block";


    resultScore.textContent =
        `${score} / ${questions.length}`;


    resultPercentage.textContent =
        `${percentage}%`;


    if (timeUp) {

        resultMessage.textContent =
            "Time is up. Your answers have been submitted.";

    } else {

        resultMessage.textContent =
            getResultMessage(
                percentage
            );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   RESULT MESSAGE
========================================= */

function getResultMessage(
    percentage
) {

    if (percentage >= 80) {

        return "Excellent work. Keep pushing.";

    }


    if (percentage >= 60) {

        return "Good effort. Review your corrections and keep improving.";

    }


    if (percentage >= 40) {

        return "You're getting there. Use the corrections to strengthen your weak areas.";

    }


    return "Keep studying. Every correction is another opportunity to improve.";

}


/* =========================================
   REVIEW ANSWERS
========================================= */

reviewBtn.addEventListener(
    "click",
    () => {

        reviewContainer.innerHTML =
            "";


        questions.forEach(
            (question, index) => {

                const userAnswer =
                    userAnswers[index];


                const correct =
                    userAnswer
                    === question.answer;


                const review =
                    document.createElement(
                        "div"
                    );


                review.className =
                    "review-item";


                review.innerHTML = `

                    <p class="review-question">
                        ${index + 1}.
                        ${question.question}
                    </p>


                    <p class="
                        review-answer
                        ${
                            correct
                                ? "review-correct"
                                : "review-wrong"
                        }
                    ">

                        Your answer:
                        ${
                            userAnswer
                            ?? "Not answered"
                        }

                    </p>


                    <p class="
                        review-answer
                        review-correct
                    ">

                        Correct answer:
                        ${question.answer}

                    </p>


                    <p class="
                        review-explanation
                    ">

                        ${question.explanation}

                    </p>

                `;


                reviewContainer.appendChild(
                    review
                );

            }
        );


        reviewContainer.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================================
   BACK TO HOME
========================================= */

homeBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "index.html";

    }
);