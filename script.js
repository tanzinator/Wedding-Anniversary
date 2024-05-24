// script.js
const countdownElement = document.getElementById('countdown');
const anniversaryYear = document.getElementById('anniversaryYear');
const eventDate = document.getElementById('eventDate');
const eventTime = document.getElementById('eventTime');
const eventLocation = document.getElementById('eventLocation');
const questionnaire = document.getElementById('questionnaire');
const details = document.querySelector('.details');

var userpasskey = '';

// Custom encoding function
function customEncode(str, shift) {
    let encoded = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            encoded += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            encoded += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        } else {
            // Non-alphabetic characters
            encoded += str.charAt(i);
        }
    }
    return encoded;
}

// Custom decoding function
function customDecode(str, shift) {
    let decoded = '';
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters
            decoded += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters
            decoded += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
        } else {
            // Non-alphabetic characters
            decoded += str.charAt(i);
        }
    }
    return decoded;
}

// Array of hints for each question
const hints = [
    [],
    ["1) The actor and actress in the movie are a couple in real life.",
     "2) Khel Khel Mein"],
    [
      "Hint is in the picture",
      "The country is famous for its chocolate and watches."
    ],
    [
      "The park is located in the heart of Bangalore in the Central Administrative Area",
      "The park is named after the last name of a British commissioner who served in India. His first name is Mark.",
    ]
];

// Function to toggle the visibility of hints
function toggleHint(questionIndex) {
    const hintElement = document.getElementById(`hint${questionIndex}`);
    if (hintElement.classList.contains('d-none')) {
      hintElement.innerHTML = hints[questionIndex - 1].join('<br>');
      hintElement.classList.remove('d-none');
    } else {
      hintElement.classList.add('d-none');
    }
  }


// Define the passkey-specific questions
const passkeyQuestions = {
    '3105': 'Name the restaurant where Shivani was first introduced to Sirvoicar family in person?',
    '2201': 'Name the hotel in Bangalore where Tanay was first introduced to Mamma/Pappa and Chitra Maushi in person?',
    '6174': 'Name the pub in Bangalore where the Desais first met Shivani and Tanay in person?',
    '6154': 'Name the restaurant where Shivani was first introduced to Sabnis fly in person?'
};

const passkey = document.getElementById('passkey');
const submitPasskey = document.getElementById('submit-passkey');
const passkeyContainer = document.getElementById('passkey-container');
const question1Text = document.getElementById('question1Text');

submitPasskey.addEventListener('click', () => {
    const enteredPasskey = passkey.value.toLowerCase().trim();
    const question = passkeyQuestions[enteredPasskey];

    if (question) {
        userpasskey = enteredPasskey;
        passkeyContainer.classList.add('d-none');
        questionnaire.classList.remove('d-none');
        question1Text.textContent = question;
    }
    else {
        alert('Please enter a valid passkey.');
    }
});

// Function to parse the query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

  // Get the passkey from the URL query parameter
const urlPasskey = getQueryParam('passkey');

if (urlPasskey) {
    passkey.value = urlPasskey;
    submitPasskey.click();
}

// Set the event details
const eventDetails = {
    date: 'May 29, 2024',
    time: '8:00 PM Onwards',
    location: customDecode(encodedLocation, 3),
    anniversaryYear: '1st'
};

// Update the event details in the HTML
anniversaryYear.textContent = eventDetails.anniversaryYear;
eventDate.textContent = eventDetails.date;
eventTime.textContent = eventDetails.time;
eventLocation.textContent = eventDetails.location;



const countDownDate = new Date(eventDetails.date).getTime();
const countdownWidget = document.getElementById('countdown-widget');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

    if (distance < 0) {
        clearInterval(x);
        countdownWidget.innerHTML = '<div class="countdown-item"><span>Event has passed</span></div>';
    }
}, 1000);

function setUserCookie(cookieName, cookieValue, expirationDays) {
    var expires = '';
    if (expirationDays) {
        var date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = cookieName + '=' + cookieValue + expires + '; path=/';
}

// Get user cookie
function getUserCookie(cookieName) {
    var name = cookieName + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return '';
}

function generateUserCookie() {
    var existingCookie = getUserCookie('userCookie');
    if (existingCookie) {
        return existingCookie;
    } else {
        var newCookie = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(7);
        setUserCookie('userCookie', newCookie, 365);
        return newCookie;
    }
}

var userCookie = generateUserCookie();

function sendToGoogleSheet(responses, enteredPasskey) {
    var formData = new FormData();
    formData.append('UserCookie', userCookie);
    formData.append('Passkey', enteredPasskey);

    responses.forEach(function (response, index) {
        formData.append('Question' + (index + 1), response);
    });

    fetch('https://script.google.com/macros/s/AKfycbzgTVZljGIsysAC7My_4P_hpqYQkClcVEBuQSJZsOZJIv2uiYR97PfbinPFWOFohj8/exec', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}

function addConfettiAnimation() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#f0932b', '#eb4d4b', '#6ab04c', '#7ed6df', '#e056fd'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiContainer.appendChild(confetti);
    }
}

// Questionnaire logic
const questions = document.querySelectorAll('.question');
const venueAnimation = document.getElementById('venueAnimation');
const venueDetails = document.querySelector('.venue-details');
const spinner = document.querySelector('.spinner');
const answers = encodedAnswers.map(answerArray => answerArray.map(answer => customDecode(answer, 3)));

var correctResponses = [];

questions.forEach((question, index) => {
    const input = question.querySelector('input');
    const successMessage = question.querySelector('.success-message');
    const errorMessage = question.querySelector('.error-message');

    input.addEventListener('input', () => {
        const userAnswer = input.value.toLowerCase().trim();
        if (answers[index].includes(userAnswer)) {
            input.classList.add('correct-input');

            errorMessage.classList.add('d-none');
            correctResponses[index] = input.value;
            setTimeout(() => {

                successMessage.classList.remove('d-none');

                // Remove focus from the input field to hide the keyboard
                input.blur();
                
                setTimeout(() => {
                    if (index === answers.length - 1) {
                        venueAnimation.classList.remove('d-none');
                        addConfettiAnimation();
                        setTimeout(() => {
                            const enteredPasskey = passkey.value.trim();
                            sendToGoogleSheet(correctResponses, enteredPasskey); // Send correct responses to Google Sheet
                        }, 3000);
                        document.activeElement.blur();
                        window.scrollTo(0, 0);
                        
                        // Redirect to the homepage after 5 seconds
                        setTimeout(() => {
                            window.location.href = 'https://tanzinator.github.io/Wedding-Anniversary?passkey=' + passkey.value.toLowerCase().trim(); // Replace '/' with the URL of your homepage
                        }, 8000);
                        //details.classList.remove('d-none');
                    } else {
                        // Hide the current question
                        question.classList.add('d-none');

                        //show next question
                        questions[index + 1].classList.remove('d-none');

                        questions[index + 1].querySelector('input').focus(); // Focus on the next input box

                        //scroll to the top
                        setTimeout(() => {
                        const nextQuestion = questions[index + 1];
                        nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 500);
                    }

                }, 1000);
            }, 500);
        }
        /*else if(input.value.length > 10) {
        input.classList.remove('correct-input');
        successMessage.classList.add('d-none');
        errorMessage.classList.remove('d-none');
        input.classList.add('incorrect-input');
        setTimeout(() => {
        input.classList.remove('incorrect-input');
        }, 500);
        }*/
    });
});
