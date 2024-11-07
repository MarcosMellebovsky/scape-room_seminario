let currentLevel = 1;
let questions = [
    { // Nivel 1
        level: 1,
        questions: [
            { text: "¿Cuál es la capital de Francia?", options: ["París", "Roma", "Madrid"], answer: "París" },
            { text: "¿Cuál es 2 + 2?", options: ["3", "4", "5"], answer: "4" },
            { text: "¿Qué color tiene el cielo en un día despejado?", options: ["Rojo", "Azul", "Verde"], answer: "Azul" }
        ]
    },
    { // Nivel 2
        level: 2,
        questions: [
            { text: "¿Cuál es el río más largo del mundo?", options: ["Nilo", "Amazonas", "Yangtsé"], answer: "Amazonas" },
            { text: "¿Qué animal es conocido como el rey de la selva?", options: ["Tigre", "León", "Elefante"], answer: "León" },
            { text: "¿Cuál es el quinto planeta del sistema solar?", options: ["Marte", "Júpiter", "Saturno"], answer: "Júpiter" }
        ]
    },
    { // Nivel 3
        level: 3,
        questions: [
            { text: "¿En qué continente se encuentra Egipto?", options: ["Asia", "Europa", "África"], answer: "África" },
            { text: "¿Qué elemento químico tiene como símbolo 'O'?", options: ["Oxígeno", "Oro", "Osmio"], answer: "Oxígeno" },
            { text: "¿Cuántos días tiene un año bisiesto?", options: ["364", "365", "366"], answer: "366" }
        ]
    }
];
let playerAnswers = [];

function startGame() {
    document.getElementById("start-screen").classList.add("hidden");
    showLevel();
}

function showLevel() {
    let levelData = questions.find(level => level.level === currentLevel);
    document.getElementById("level-title").innerText = `Nivel ${currentLevel}`;
    document.getElementById("question-text").innerText = levelData.questions[0].text;
    document.getElementById("options-container").innerHTML = "";

    playerAnswers = [];
    levelData.questions.forEach((question, index) => {
        let questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${question.text}</p>`;
        question.options.forEach(option => {
            let optionButton = document.createElement("button");
            optionButton.innerText = option;
            optionButton.onclick = () => selectAnswer(index, option);
            questionDiv.appendChild(optionButton);
        });
        document.getElementById("options-container").appendChild(questionDiv);
    });

    document.getElementById("question-screen").classList.remove("hidden");
}

function selectAnswer(questionIndex, answer) {
    playerAnswers[questionIndex] = answer;
    let options = document.querySelectorAll(`#options-container div:nth-child(${questionIndex + 1}) button`);
    
    options.forEach(option => option.classList.remove("selected"));
    
    let selectedOption = Array.from(options).find(option => option.innerText === answer);
    if (selectedOption) selectedOption.classList.add("selected");
}


function checkAnswers() {
    let levelData = questions.find(level => level.level === currentLevel);
    let allCorrect = levelData.questions.every((question, index) => question.answer === playerAnswers[index]);
    
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    if (allCorrect) {
        document.getElementById("result-message").innerText = `¡Felicidades! Has pasado el nivel ${currentLevel}.`;
        currentLevel++;
    } else {
        document.getElementById("result-message").innerText = `Lo siento, no has pasado el nivel ${currentLevel}. Inténtalo de nuevo.`;
    }
}

function nextLevel() {
    if (currentLevel > questions.length) {
        document.getElementById("result-screen").classList.add("hidden");
        document.getElementById("final-screen").classList.remove("hidden");
    } else {
        document.getElementById("result-screen").classList.add("hidden");
        showLevel();
    }
}

function restartGame() {
    currentLevel = 1;
    document.getElementById("final-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}