const recordBtn = document.getElementById("recordBtn");

let recognition;

recordBtn.addEventListener("mousedown", () => {
    startListening();
    recordBtn.textContent = "Release to Stop";
});

recordBtn.addEventListener("mouseup", () => {
    stopListening();
    recordBtn.textContent = "Press and Hold to Talk";
});

recordBtn.addEventListener("touchstart", () => {
    startListening();
    recordBtn.textContent = "Release to Stop";
});

recordBtn.addEventListener("touchend", () => {
    stopListening();
    recordBtn.textContent = "Press and Hold to Talk";
});

function startListening() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Your browser does not support the Web Speech API. Please try this app in Google Chrome.");
    } else {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            displayMessage(transcript, "user");
            setTimeout(() => {
                displayMessage("Hello", "other");
            }, 1000);
        };

        recognition.start();
    }
}

function stopListening() {
    if (recognition) {
        recognition.stop();
    }
}

function displayMessage(text, sender = "user") {
    const chatContainer = document.getElementById("chatContainer");
    const messageTemplate = document.getElementById("messageTemplate");
    const messageElement = messageTemplate.content.cloneNode(true);
    const messageText = messageElement.querySelector(".message-text");

    messageText.textContent = text;
    messageElement.querySelector(".message").classList.add(sender);
    chatContainer.appendChild(messageElement);
}
