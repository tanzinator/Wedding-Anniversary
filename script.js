// script.js
const countdownElement = document.getElementById('countdown');
const anniversaryYear = document.getElementById('anniversaryYear');
const eventDate = document.getElementById('eventDate');
const eventTime = document.getElementById('eventTime');
const eventLocation = document.getElementById('eventLocation');
const questionnaire = document.getElementById('questionnaire');
const details = document.querySelector('.details');







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

// Set the event details
const eventDetails = {
  date: 'May 29, 2024',
  time: '7:30 PM',
  location: customDecode(encodedLocation, 3),
  anniversaryYear: '1st'
};

// Update the event details in the HTML
anniversaryYear.textContent = eventDetails.anniversaryYear;
eventDate.textContent = eventDetails.date;
eventTime.textContent = eventDetails.time;
eventLocation.textContent = eventDetails.location;

// Show the countdown
/*const countDownDate = new Date(eventDetails.date).getTime();
const x = setInterval(function() {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(x);
    countdownElement.innerHTML = 'Event has passed';
  }
}, 1000);*/


const countDownDate = new Date(eventDetails.date).getTime();
const countdownWidget = document.getElementById('countdown-widget');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const x = setInterval(function() {
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

function sendToGoogleSheet(responses) {
  var formData = new FormData();
  formData.append('UserCookie', userCookie);
  
  responses.forEach(function(response, index) {
    formData.append('Question' + (index + 1), response);
  });

  fetch('https://script.google.com/macros/s/AKfycby-r86oUPPLkDUWoGhVhn-W1yvgTodU3oKpYMPv4inELj4v7mpDYaHNuY1qXEfqybq5/exec', {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
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
      successMessage.classList.remove('d-none');
      errorMessage.classList.add('d-none');
	  correctResponses[index] = input.value;
      setTimeout(() => {
        if (index === answers.length - 1) {
			venueAnimation.classList.remove('d-none');
			          setTimeout(() => {
            sendToGoogleSheet(correctResponses); // Send correct responses to Google Sheet
          }, 3000);
          //details.classList.remove('d-none');
        } else {
          questions[index + 1].classList.remove('d-none');
        }
      }, 1000);
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