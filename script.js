alert('Brave Browser এ এটা সাপোর্ট করে না, আপনি চাইলে Chrome Browser ব্যাবহার করতে পারেন !')
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    p.textContent = transcript;
    if (e.results.length > 0 && e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});

recognition.addEventListener('end', recognition.start);

// ভাষা পরিবর্তন করার জন্য ইভেন্ট হ্যান্ডলার
document.getElementById('bn-button').addEventListener('click', () => {
    recognition.lang = 'bn'; // বাংলা ভাষা নির্বাচন
    recognition.stop(); // স্টপ করে নতুন ভাষা নিয়ে পুনরায় শুরু করানো
});

document.getElementById('en-button').addEventListener('click', () => {
    recognition.lang = 'en-US'; // ইংরেজি ভাষা নির্বাচন
    recognition.stop(); // স্টপ করে নতুন ভাষা নিয়ে পুনরায় শুরু করানো
});

recognition.start();