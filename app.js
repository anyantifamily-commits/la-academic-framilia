/* =========================================
   LA ACADEMIC FRAMILIA STUDY GROUP
   SITE CONFIGURATION
========================================= */

const CBT_CONFIG = {

    // =====================================
    // CBT VISIBILITY
    // =====================================

    // true  = show the Take Quiz section
    // false = hide the Take Quiz section

    showTakeQuiz: true,


    // =====================================
    // QUIZ RETAKE CONTROL
    // =====================================

    // true  = students can retake the quiz
    // false = students cannot retake the quiz

    allowRetake: false,


    // =====================================
    // CURRENT STUDY
    // =====================================

    subject: "BIO 101",

    topic: "Cell Biology",


    // =====================================
    // SCHOLAR'S THOUGHT
    // =====================================

    quote:
        "The important thing is not to stop questioning. Curiosity has its own reason for existing.",

    quoteAuthor:
        "— Albert Einstein",


    // =====================================
    // FUN FACT
    // =====================================

    funFact:
        "Ven has two wives.... Keisha and Kiki. 😂",


    // =====================================
    // STUDY MATERIALS
    // =====================================

    materials: [

        {
            name: "Cell Biology Lecture Slides",
            file: "materials/cell-biology.pdf"
        },

        {
            name: "Study Group Notes",
            file: "materials/study-notes.pdf"
        }

    ],


    // =====================================
    // QUIZ PAGE
    // =====================================

    quizPage: "quiz.html"

};


/* =========================================
   DISPLAY CURRENT SUBJECT & TOPIC
========================================= */

document.getElementById("subject").textContent =
    CBT_CONFIG.subject;

document.getElementById("topic").textContent =
    CBT_CONFIG.topic;


/* =========================================
   DISPLAY SCHOLAR'S THOUGHT
========================================= */

document.querySelector(".quote-card blockquote").textContent =
    `“${CBT_CONFIG.quote}”`;

document.querySelector(".quote-author").textContent =
    CBT_CONFIG.quoteAuthor;


/* =========================================
   DISPLAY FUN FACT
========================================= */

document.getElementById("funFact").textContent =
    CBT_CONFIG.funFact;


/* =========================================
   DISPLAY STUDY MATERIALS
========================================= */

const materialsList =
    document.getElementById("materialsList");

materialsList.innerHTML = "";


CBT_CONFIG.materials.forEach(material => {

    const materialDiv =
        document.createElement("div");

    materialDiv.className = "material";

    materialDiv.innerHTML = `
        <span class="material-name">
            ${material.name}
        </span>

        <a
            href="${material.file}"
            download
            class="download-btn"
        >
            DOWNLOAD
        </a>
    `;

    materialsList.appendChild(materialDiv);

});


/* =========================================
   TAKE QUIZ VISIBILITY
========================================= */

const quizSection =
    document.getElementById("quizSection");

const takeQuizBtn =
    document.getElementById("takeQuizBtn");


if (CBT_CONFIG.showTakeQuiz === true) {

    quizSection.style.display = "block";


    takeQuizBtn.addEventListener("click", () => {

        // Check whether this quiz has
        // already been completed.

        const quizCompleted =
            localStorage.getItem(
                "laAcademicQuizCompleted"
            );


        // =====================================
        // RETAKE CHECK
        // =====================================

        if (
            quizCompleted === "true" &&
            CBT_CONFIG.allowRetake === true
        ) {

            alert(
                "You have already taken this quiz. Retakes are currently disabled."
            );

            return;

        }


        // =====================================
        // OPEN QUIZ
        // =====================================

        window.location.href =
            CBT_CONFIG.quizPage;

    });


} else {

    quizSection.style.display = "none";

}