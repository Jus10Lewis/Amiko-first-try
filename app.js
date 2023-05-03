const recordBtn = document.getElementById("recordBtn");
const output = document.getElementById("output");

let recognition;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

recordBtn.addEventListener("click", () => {
    if (recordBtn.textContent === "Start Recording") {
        startListening();
        recordBtn.textContent = "Stop Recording";
    } else {
        stopListening();
        recordBtn.textContent = "Start Recording";
    }
});

function startListening() {
    recognition.start();

    recognition.addEventListener("result", (e) => {
        const transcript = e.results[0][0].transcript;
        output.textContent = transcript;
    });

    recognition.addEventListener("end", () => {
        stopListening();
        recordBtn.textContent = "Start Recording";
    });
}

function stopListening() {
    if (recognition) {
        recognition.stop();
    }
}
