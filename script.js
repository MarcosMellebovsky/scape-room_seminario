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
    document.getElementById("start-screen").classList.add("hidden");
    currentQuestionIndex = 0;
    playerAnswers = [];
    selectedAnswer = null;
    showQuestion();
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
    timeRemaining = 60;
    document.getElementById("time-bar").style.width = "100%";
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById("time-bar").style.width = `${(timeRemaining / 60) * 100}%`;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            markIncorrectAndNextQuestion();
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


function selectAnswer(answer) {
    selectedAnswer = answer;
    let options = document.querySelectorAll(".option-button");
    options.forEach(option => option.classList.remove("selected"));
    
    let selectedOption = Array.from(options).find(option => option.innerText === answer);
    if (selectedOption) selectedOption.classList.add("selected");
}
function checkAnswers() {
    clearInterval(timerInterval); 

    if (!selectedAnswer) {
        alert("Por favor selecciona una opción antes de responder.");
        return;
    }

    playerAnswers[currentQuestionIndex] = selectedAnswer;
    currentQuestionIndex++;

    let levelData = questions.find(level => level.level === currentLevel);

    if (currentQuestionIndex < levelData.questions.length) {
        showQuestion();
    } else {
        evaluateLevel();
    }
}

function evaluateLevel() {
    let levelData = questions.find(level => level.level === currentLevel);
    let allCorrect = levelData.questions.every((question, index) => question.answer === playerAnswers[index]);

    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    if (allCorrect) {
        document.getElementById("result-message").innerText = `¡Felicidades! Has pasado el nivel ${currentLevel}.`;
        currentLevel++;  
        currentQuestionIndex = 0;
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
        playerAnswers = [];
        currentQuestionIndex = 0;

        subtituloNivel(currentLevel);

        showQuestion();
    }
}

function restartGame() {
    currentLevel = 1;
    currentQuestionIndex = 0;
    document.getElementById("final-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}
