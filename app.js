const recordBtn = document.getElementById("recordBtn");
const output = document.getElementById("output");

let recognition;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

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
