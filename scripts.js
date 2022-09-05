const form = document.getElementsByTagName('form');

const email = document.getElementById('email');
const tel = document.getElementById('tel');
const password = document.getElementById('psswd');
const passwordConfirm = document.getElementById('psswd-confirm');

const submitBtn = document.getElementById('submit-btn');

const errorEmail = document.getElementById('email-error');
const errorTel = document.getElementById('tel-error');
const errorPsswdConfirm = document.getElementById('psswd-confirm-error');

email.addEventListener('input', errorHandler);
tel.addEventListener('input', errorHandler);
passwordConfirm.addEventListener('input', errorHandler);
submitBtn.addEventListener('click', submitForm);

function errorHandler(event){
	if(event.target.id == 'email'){
		if(event.target.validity.typeMismatch){
			errorEmail.textContent = "The email address must be a valid one";
			email.classList.add('error-input');
			enableBtn();
		}
		else {
			errorEmail.textContent = "";
			email.classList.remove('error-input');
			enableBtn();
		}
	}
	else if(event.target.id == 'tel'){
		if(event.target.validity.patternMismatch){
			errorTel.textContent = "You may enter your phone number digit after digit, or following this pattern 123-123-1234";
			tel.classList.add('error-input');
			enableBtn();
		}

		else if(event.target.validity.tooShort){
			errorTel.textContent = "There are some digits missing";
			tel.classList.add('error-input');
			enableBtn();
		}

		else {
			errorTel.textContent = "";
			tel.classList.remove('error-input');
			enableBtn();
		}
	}
	else if(event.target.id == 'psswd-confirm'){
		if(event.target.value !== password.value && password.value !== ""){
			errorPsswdConfirm.textContent = "This password does not coincide with the password previously entered"
			passwordConfirm.classList.add('error-input');
			event.target.validity.customError = true;
			enableBtn();
		}
		else {
			errorPsswdConfirm.textContent = "";
			passwordConfirm.classList.remove('error-input');
			enableBtn();
		}
	}
}

function submitForm(event){
	let invalidInputs = document.querySelectorAll('input:invalid');
}

function enableBtn(){
	let invalidInputs = document.querySelectorAll('input:invalid');
	let invalidClass = document.querySelectorAll('.error-input');

	console.log(invalidClass);
	if(invalidInputs.length == 0 && invalidClass.length == 0){
		submitBtn.removeAttribute('disabled');
		submitBtn.classList.add('valid-btn');
	}
	else{
		submitBtn.setAttribute('disabled', '');
		submitBtn.classList.remove('valid-btn');
	}
}