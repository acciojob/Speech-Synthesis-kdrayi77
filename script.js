const synth = window.speechSynthesis;
const voicesDropdown = document.getElementById("voices");
const rate = document.querySelector('input[name="rate"]');
const pitch = document.querySelector('input[name="pitch"]');
const text = document.getElementById("text");
const speakBtn = document.getElementById("speak");
const stopBtn = document.getElementById("stop");

let voices = [];
let utterance = new SpeechSynthesisUtterance(text.value);

// Fetch available voices
function populateVoices() {
  voices = synth.getVoices();
  voicesDropdown.innerHTML = voices
    .map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`)
    .join("");
  // Select first voice by default
  if (voices.length && !utterance.voice) {
    utterance.voice = voices[0];
    voicesDropdown.value = voices[0].name;
  }
}

// Change voice
function setVoice() {
  utterance.voice = voices.find(v => v.name === voicesDropdown.value);
  restartSpeech();
}

// Speak text
function startSpeech() {
  if (!text.value.trim()) return; // prevent empty speech
  utterance.text = text.value;
  utterance.rate = rate.value;
  utterance.pitch = pitch.value;
  synth.speak(utterance);
}

// Stop speech
function stopSpeech() {
  synth.cancel();
}

// Restart with new settings
function restartSpeech() {
  stopSpeech();
  startSpeech();
}

// Event listeners
synth.onvoiceschanged = populateVoices;
voicesDropdown.addEventListener("change", setVoice);
speakBtn.addEventListener("click", startSpeech);
stopBtn.addEventListener("click", stopSpeech);
rate.addEventListener("change", restartSpeech);
pitch.addEventListener("change", restartSpeech);
