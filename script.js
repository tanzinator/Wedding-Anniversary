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
const countDownDate = new Date(eventDetails.date).getTime();
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
}, 1000);

// Questionnaire logic
const questions = document.querySelectorAll('.question');
const answers = encodedAnswers.map(answerArray => answerArray.map(answer => customDecode(answer, 3)));

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
      setTimeout(() => {
        if (index === answers.length - 1) {
          details.classList.remove('d-none');
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