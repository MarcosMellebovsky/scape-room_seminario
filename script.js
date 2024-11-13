let currentLevel = 1;
let currentQuestionIndex = 0;
let playerAnswers = [];
let selectedAnswer = null; 
let timerInterval;
let timeRemaining = 60;


let questions = [
    { 
        level: 1,
        questions: [
            { 
                text: "Estás configurando una red en tu oficina y necesitas asegurarte de que todos los dispositivos obtengan una dirección IP automáticamente cuando se conecten. ¿Qué función del Router permite asignar automáticamente una IP a cada dispositivo conectado? ",
                pista:"Pista: Este servicio asigna direcciones IP automáticamente y se utiliza comúnmente en redes para evitar configuraciones manuales en cada dispositivo. ",
                 options: ["TCP/IP", "DHCP", "HTTP","AUTO/IP"], 
                 answer: "DHCP" }
                 ,
            { 
                text: "Mientras estás configurando el direccionamiento automático, cuando activas la configuración en la computadora, te tira un error, y obtiene una dirección IP totalmente aleatoria. ¿Qué falta hacer para que funcione correctamente?", 
               pista:"Pista: Para que las computadoras reciban direcciones IP correctas automáticamente, debe estar habilitado un servidor específico en la red.  ",
                options: ["Configurar el switch", "Que el cable sea fibra óptica", "Configurar el servidor", "Poner el router"], 
                answer: "Configurar el servidor" },
            { 
                text: "Si quiero hacer que las direcciones IP de las computadoras arranquen desde cierto rango, ¿Dónde lo puedo configurar?", 
                pista:"Pista: Este dispositivo es el encargado de asignar direcciones IP en la red y permite configurar un rango específico para las IP que se entregan a cada dispositivo.  ",
                options: ["En el switch", "En el router", "En las computadoras" , "En el servidor"], 
                answer: "En el servidor" }
        ]
    },
    { 
        level: 2,
        questions: [
            { 
                text: "En Packet Tracer, has configurado un servidor DHCP en una red local que tiene tres terminales, un switch y dos servidores adicionales. El servidor DHCP está configurado para asignar direcciones IP automáticamente a partir de 192.168.1.50.", 
                text:"Si tienes un servidor con la dirección IP estática 192.168.1.20, ¿qué máscara de subred deberías usar para garantizar que las direcciones asignadas automáticamente no interfieran con las direcciones fijas asignadas por debajo de 192.168.1.50?",
                pista:"Pista: Asegúrate de que la máscara permita un rango de IPs adecuado sin afectar las direcciones estáticas.  ",
                options: ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224"], 
                answer: "255.255.255.0" 
            }
            ,

            { 
                text: "Has configurado una red en Packet Tracer con 4 PCs conectadas por cable y 3 laptops que se conectan a través de un Access Point. El servidor DHCP está configurado para asignar IPs automáticamente en la red 10.0.0.0/24, comenzando desde 10.0.0.50 para evitar conflictos con direcciones IP fijas asignadas a otros dispositivos.",
                text:"Si uno de los dispositivos recibe la dirección IP 10.0.0.75, ¿cuál sería la dirección de red para esta configuración?",
                pista:"La dirección de red es la base sobre la cual el servidor DHCP asigna todas las direcciones IP.", 
                options: ["10.0.0.1", "10.0.0.50", "10.0.0.0", "10.0.0.255"], 
                answer: "10.0.0.0" 
            }
            ,
            { 
                text: "En una red local configurada en Packet Tracer, tienes dos servidores: uno es el servidor DNS y el otro, el servidor Web. Has asignado direcciones IP estáticas a cada servidor para que otros dispositivos puedan encontrarlos siempre en la misma dirección.", 
                text:"Si estás configurando un servidor DNS con IP fija en una red 192.168.2.0/24, ¿cuál de las siguientes direcciones podrías usar para que este servidor esté en un rango comúnmente reservado para direcciones de red?",
                pista:"Pista: Las direcciones IP en el rango bajo suelen estar reservadas para configuraciones específicas.",
                options: ["192.168.2.100", "192.168.2.1", "192.168.2.50", "192.168.2.250"], 
                answer: "192.168.2.1" 

            }
        ]
    },
    { 
        level: 3,
        questions: [
            { 
                text: "Para garantizar que los mensajes entre dos dispositivos de la red lleguen correctamente y en orden, ¿Cuál protocolo de capa de transporte es el mejor?", 
                pista:"Pista: Este protocolo establece una conexión y asegura que los datos se entreguen en el mismo orden en el que fueron enviados, algo que no todos los protocolos de transporte hacen.",
                options: ["HTTP", "ICMP", "UDP", "TCP"],
                answer: "TCP" },

            { 
                text: "Si quiero crear una pagina web interno para una red local, ¿Cuales de estas opciones de servidores es la correcta para crear el sistema?", 
             
                options: ["HTTP + EMAIL", "HTTP + TFTP", "HTTP + DNS", "HTTP + FTP"], 
                answer: "HTTP + DNS" },
            { 
                text: "En una red, algunos dispositivos deben enviar pequeños paquetes de datos sin establecer una conexión previa. ¿Qué protocolo de capa de transporte sería el mejor para esto? ",
                pista:"Pista: Este protocolo es rápido, ya que no requiere establecer una conexión, pero no garantiza que los paquetes lleguen en orden o sin pérdidas.  ", 
                options: ["TCP", "UDP", "ICMP", "HTTP"],
                 answer: "UDP" }
        ]
    }
];



function startGame() {
    currentLevel = 1;
    resetLevel();
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    loadQuestion();
}
function loadQuestion() {
    let currentQuestion = questions[currentLevel - 1].questions[currentQuestionIndex];
    document.getElementById('level-title').textContent = `Nivel ${currentLevel}`;
    document.getElementById('question-text').textContent = currentQuestion.text;
    document.getElementById('pista').textContent = currentQuestion.pista;
    let optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Limpiar opciones previas
    document.getElementById('progress-indicator').textContent = `${currentQuestionIndex + 1}/${questions[currentLevel - 1].questions.length}`;

    currentQuestion.options.forEach(option => {
        let button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.onclick = () => selectAnswer(option, button);
        optionsContainer.appendChild(button);
    });
}

function subtituloNivel(currentLevel) {
    if (currentLevel == 1) {
        document.getElementById("level-title").innerText = `Nivel ${currentLevel} - Configuración de dispositivos de red`;
    }
    else if(currentLevel == 2){
        document.getElementById("level-title").innerText = `Nivel ${currentLevel} - Direccionamiento IP`;
    }
    else{
        document.getElementById("level-title").innerText = `Nivel ${currentLevel} - Protocolos de comunicación`;
    }
}
function startTimer() {
    timeRemaining = 60; // Tiempo en segundos
    clearInterval(timerInterval); // Asegúrate de que no haya otro temporizador corriendo
    document.getElementById("time-bar").style.width = "100%"; // Reinicia la barra de tiempo al 100%

    // Inicia el temporizador
    timerInterval = setInterval(() => {
        timeRemaining--; // Decrementa el tiempo restante en 1 segundo

        // Calcula el ancho de la barra según el tiempo restante y actualiza el estilo
        const widthPercentage = (timeRemaining / 60) * 100;
        document.getElementById("time-bar").style.width = `${widthPercentage}%`;

        // Verifica si el tiempo se ha agotado
        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Detiene el temporizador
            markIncorrectAndNextQuestion(); // Llama a la función para manejar el cambio
        }
    }, 1000);
}


function markIncorrectAndNextQuestion() {
    playerAnswers[currentQuestionIndex] = "incorrect";  
    currentQuestionIndex++;

    let levelData = questions.find(level => level.level === currentLevel);

    if (currentQuestionIndex < levelData.questions.length) {
        showQuestion();
    } else {
        evaluateLevel();
    }
}

function showQuestion() {
    let levelData = questions.find(level => level.level === currentLevel);
    let question = levelData.questions[currentQuestionIndex];
    
    subtituloNivel(currentLevel);
    document.getElementById("question-text").innerText = question.text;
    document.getElementById("pista").innerText = question.pista;

    document.getElementById("options-container").innerHTML = "";
    document.getElementById("progress-indicator").innerText = `${currentQuestionIndex + 1}/${levelData.questions.length}`;
    
    selectedAnswer = null;
    question.options.forEach(option => {
        let optionButton = document.createElement("button");
        optionButton.classList.add("option-button");
        optionButton.innerText = option;
        optionButton.onclick = () => selectAnswer(option);
        document.getElementById("options-container").appendChild(optionButton);
    });

    document.getElementById("question-screen").classList.remove("hidden");
    
    clearInterval(timerInterval); 
    startTimer(); 
}


function selectAnswer(answer, button) {
    selectedAnswer = answer;
    document.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}
function checkAnswers() {
    if (!selectedAnswer) {
        alert('Por favor, selecciona una respuesta.');
        return;
    }

    let currentQuestion = questions[currentLevel - 1].questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answer) {
        correctAnswersCount++;
    }
    playerAnswers.push(selectedAnswer);
    selectedAnswer = null; // Restablecer para la siguiente pregunta

    if (currentQuestionIndex < questions[currentLevel - 1].questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    if (correctAnswersCount === questions[currentLevel - 1].questions.length) {
        document.getElementById('result-message').textContent = '¡Felicitaciones, has pasado el nivel!';
        document.getElementById('next-level-button').classList.remove('hidden');
        document.getElementById('retry-button').classList.add('hidden');
    } else {
        document.getElementById('result-message').textContent = 'Lo siento, no has pasado el nivel.';
        document.getElementById('retry-button').classList.remove('hidden');
        document.getElementById('next-level-button').classList.add('hidden');
    }
}

function evaluateLevel() {
    let levelData = questions.find(level => level.level === currentLevel);
    let allCorrect = levelData.questions.every((question, index) => question.answer === playerAnswers[index]);

    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    if (allCorrect) {
        document.getElementById("result-message").innerText = `¡Felicidades! Has pasado el nivel ${currentLevel}.`;
        document.getElementById("next-level-button").classList.remove("hidden");
        document.getElementById("retry-button").classList.add("hidden");
        currentLevel++;  
        currentQuestionIndex = 0;
    } else {
        document.getElementById("result-message").innerText = `Lo siento, no has pasado el nivel ${currentLevel}. Inténtalo de nuevo.`;
        document.getElementById("retry-button").classList.remove("hidden");
        document.getElementById("next-level-button").classList.add("hidden");
    }
}


function nextLevel() {
    currentLevel++;
    if (currentLevel <= questions.length) {
        resetLevel();
        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('question-screen').classList.remove('hidden');
        loadQuestion();
    } else {
        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('final-screen').classList.remove('hidden');
    }
}

function retryLevel() {
    resetLevel();
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');
    loadQuestion();
}

function resetLevel() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    playerAnswers = [];
}
