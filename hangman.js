const incorrectSound = document.getElementById('incorrectSound');

const wordsWithDefinitions = {
    'aberration': 'A departure from what is normal, usual, or expected, typically an unwelcome one.',
    'benevolent': 'Well meaning and kindly.',
    'circuitous': 'Longer than the most direct way.',
    'deleterious': 'Causing harm or damage.',
    'enervate': 'Cause (someone) to feel drained of energy or vitality; weaken.',
    'fortuitous': 'Happening by accident or chance rather than design.',
    'gregarious': 'Fond of company; sociable.',
    'haphazard': 'Lacking any obvious principle of organization.',
    'idiosyncratic': 'Relating to idiosyncrasy; peculiar or individual.',
    'juxtaposition': 'The fact of two things being seen or placed close together with contrasting effect.',
    'kaleidoscope': 'A constantly changing pattern or sequence of elements.',
    'lugubrious': 'Looking or sounding sad and dismal.',
    'meticulous': 'Showing great attention to detail; very careful and precise.',
    'nonchalant': 'Feeling or appearing casually calm and relaxed; not displaying anxiety, interest, or enthusiasm.',
    'obfuscate': 'Render obscure, unclear, or unintelligible.',
    'pandemonium': 'Wild and noisy disorder or confusion; uproar.',
    'quintessential': 'Representing the most perfect or typical example of a quality or class.',
    'recalcitrant': 'Having an obstinately uncooperative attitude towards authority or discipline.',
    'serendipity': 'The occurrence and development of events by chance in a happy or beneficial way.',
    'taciturn': 'Reserved or uncommunicative in speech; saying little.',
    'ubiquitous': 'Present, appearing, or found everywhere.',
    'vexation': 'The state of being annoyed, frustrated, or worried.',
    'whimsical': 'Playfully quaint or fanciful, especially in an appealing and amusing way.',
    'xenophobia': 'Dislike of or prejudice against people from other countries.',
    'yokel': 'An uneducated and unsophisticated person from the countryside.',
    'zealous': 'Having or showing zeal.',
    'aficionado':'devotee; fan.',
    'bizarre':'strande; absurd.',
    'blare':'to sound loudly or harshly.',
    'nag':'cause trouble by persistent scolding.',
    'nexus':'connections; tie, link established to serve common interests of different groups of people.',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    '':'',
    // Add more words as needed
};

let word, definition, guessedWord, incorrectGuesses;

const initializeGame = () => {
    word = Object.keys(wordsWithDefinitions)
[Math.floor(Math.random() * Object.keys(wordsWithDefinitions).length)];
    definition = wordsWithDefinitions[word];
    guessedWord = Array(word.length).fill('_');
    incorrectGuesses = 0;

    revealLetters(Math.floor(word.length / 3));

    wordDisplay.textContent = guessedWord.join(' ');
    incorrectGuessesDisplay.textContent = incorrectGuesses;
    message.textContent = '';
    guessButton.disabled = false;
    revealDefinitionButton.style.display = 'none';
    definitionDisplay.style.display = 'none';
    definitionDisplay.textContent = definition;
    restartButton.style.display = 'none';
    drawHangman();
};

const revealLetters = (count) => {
    let revealedIndexes = new Set();
    while (revealedIndexes.size < count) {
        let randomIndex = Math.floor(Math.random() * word.length);
        if (!revealedIndexes.has(randomIndex)) {
            guessedWord[randomIndex] = word[randomIndex];
            revealedIndexes.add(randomIndex);
        }
    }
};

const wordDisplay = document.getElementById('wordDisplay');
const letterInput = document.getElementById('letterInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const incorrectGuessesDisplay = document.getElementById('incorrectGuesses');
const canvas = document.getElementById('hangmanCanvas');
const context = canvas.getContext('2d');
const revealDefinitionButton = document.getElementById('revealDefinitionButton');
const definitionDisplay = document.getElementById('definition');
const motivationalMessage = document.getElementById('motivationalMessage');
const feedbackTextarea = document.getElementById('feedbackTextarea');
const submitFeedbackButton = document.getElementById('submitFeedbackButton');
const restartButton = document.getElementById('restartButton');
const welcomeScreen = document.getElementById('welcomeScreen');
const startButton = document.getElementById('startButton');

const drawHangman = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#333';
    context.lineWidth = 2;

    if (incorrectGuesses > 0) {
        // Base
        context.beginPath();
        context.moveTo(10, 290);
        context.lineTo(290, 290);
        context.stroke();
    }
    if (incorrectGuesses > 1) {
        // Pole
        context.beginPath();
        context.moveTo(50, 290);
        context.lineTo(50, 20);
        context.lineTo(150, 20);
        context.lineTo(150, 50);
        context.stroke();
    }

    if (incorrectGuesses > 2) {
        // Head
        context.beginPath();
        context.arc(150, 70, 20, 0, Math.PI * 2);
        context.stroke();

        // Eyes
        context.beginPath();
        context.arc(145, 65, 2, 0, Math.PI * 2);
        context.stroke();
        context.beginPath();
        context.arc(155, 65, 2, 0, Math.PI * 2);

        context.stroke();

        // Mouth
        context.beginPath();
        context.arc(150, 75, 10, 0, Math.PI, false);
        context.stroke();
    }

    if (incorrectGuesses > 3) {
        // Body
        context.beginPath();
        context.moveTo(150, 90);
        context.lineTo(150, 160);
        context.stroke();
    }

    if (incorrectGuesses > 4) {
        // Left Arm
        context.beginPath();
        context.moveTo(150, 110);
        context.lineTo(120, 130);
       context.stroke();
    }

    if (incorrectGuesses > 5) {
        // Right Arm
        context.beginPath();
        context.moveTo(150, 110);
        context.lineTo(180, 130);
        context.stroke();
    }

    if (incorrectGuesses > 6) {
        // Left Leg
        context.beginPath();
        context.moveTo(150, 160);
        context.lineTo(130, 190);
        context.stroke();
    }

    if (incorrectGuesses > 7) {
        // Right Leg
        context.beginPath();
        context.moveTo(150, 160);
        context.lineTo(170, 190);
        context.stroke();

        // Game Over Message
        message.textContent = `Game Over! The word was "${word}".`;
        guessButton.disabled = true;
        revealDefinitionButton.style.display = 'inline';
        restartButton.style.display = 'inline';
    }
};

const checkGuess = () => {
    const letter = letterInput.value.toLowerCase();
    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
        alert('Please enter a single letter.');
        return;
    }
    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        wordDisplay.textContent = guessedWord.join(' ');

        if (!guessedWord.includes('_')) {
            message.textContent = 'Congratulations! 🏆 You guessed the word.';
            guessButton.disabled = true;
            revealDefinitionButton.style.display = 'inline';
            restartButton.style.display = 'inline';
        }
    } else {
        incorrectGuesses++;
        incorrectGuessesDisplay.textContent = incorrectGuesses;
        drawHangman();
        showMotivationalMessage();
        incorrectGuessesDisplay.textContent = incorrectGuesses;
    }
    letterInput.value = '';
};

const showMotivationalMessage = () => {
    const motivationalQuotes = [
        'Keep trying! Every mistake is a step closer to success.',
        'No matter how hard the past, you can always begin again.',
        'Mistakes are proof that you are trying.',
        'Keep pushing forward! 🚀 Every step brings you closer to your goal.',
        'Believe in yourself! 🌟 You are capable of amazing things.',
        'Stay positive and strong! 💪 Challenges make you stronger.',
        'Never give up! 🔥 Persistence pays off.',
        'Stay focused! 🎯 Success is within reach.',
        'You got this! 🙌 Keep moving forward.',   
        'Rise above the storm! 🌤️ You will find the sunshine.',
        'Embrace the journey! 🛤️ Every experience shapes you.',
        'Be brave! 🦁 Face your fears and conquer them.',
        'Stay inspired! ✨ Creativity fuels progress.',
        'Keep learning! 📚 Knowledge is power.',
        'Stay humble and kind! 🤗 It makes the world a better place.',
        'Seize the day! ☀️ Make every moment count.',
        'Stay determined! 🏆 Your hard work will pay off.',
    ];

    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    motivationalMessage.textContent = randomQuote;
};

guessButton.addEventListener('click', checkGuess);

submitFeedbackButton.addEventListener('click', () => {
    const feedback = feedbackTextarea.value.trim();
    if (feedback === '') {
        alert('Please enter your feedback.');
        return;
    }

    // Example: Send feedback to server or store locally
    alert('Thank you for your feedback!');
    feedbackTextarea.value = '';
});
revealDefinitionButton.addEventListener('click', () => {
    definitionDisplay.style.display = 'block';
});

restartButton.addEventListener('click', initializeGame);

startButton.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        initializeGame();
    }, 1000);
});

window.onload = () => {
    welcomeScreen.classList.remove('hidden');
};
