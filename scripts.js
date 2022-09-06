const errorContainer = document.getElementById('general-error-container');

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

/*
* EVENT HANDLER
*/
function errorHandler(event){
	if(event.target.id == 'email'){

		if(event.target.validity.typeMismatch){
			errorEmail.textContent = "The email address must be a valid one";
			email.classList.add('error-input');
			enableBtn();
			appendErrorItem(errorContainer, 'email', 'does not look like an email', 'email-error');
		}
		else {
			errorEmail.textContent = "";
			email.classList.remove('error-input');
			enableBtn();
			removeErrorItem(errorContainer, 'email-error')
		}
	}
	else if(event.target.id == 'tel'){

		if(event.target.validity.patternMismatch){
			errorTel.textContent = "You may enter your phone number digit after digit, or following this pattern 123-123-1234";
			tel.classList.add('error-input');
			enableBtn();
			appendErrorItem(errorContainer, 'phone number', 'pattern mismatch', 'tel-error');
		}

		else if(event.target.validity.tooShort){
			errorTel.textContent = "There are some digits missing";
			tel.classList.add('error-input');
			enableBtn();
			appendErrorItem(errorContainer, 'phone number', 'too short', 'tel-error');
		}

		else {
			errorTel.textContent = "";
			tel.classList.remove('error-input');
			enableBtn();
			removeErrorItem(errorContainer, 'tel-error');
		}
	}
	else if(event.target.id == 'psswd-confirm'){

		if(event.target.value !== password.value && password.value !== ""){
			errorPsswdConfirm.textContent = "This password does not coincide with the password previously entered"
			passwordConfirm.classList.add('error-input');
			enableBtn();
			appendErrorItem(errorContainer, 'confirm password', 'wrong password', 'psswd-confirm-error');
		}
		else {
			errorPsswdConfirm.textContent = "";
			passwordConfirm.classList.remove('error-input');
			enableBtn();
			removeErrorItem(errorContainer, 'psswd-confirm-error');
		}
	}
}

/*
* AUXILIAR FUNC
* Runs everytime an input actionates the input event. It disables or make available
* the submit btn depending on the presence of invalid inputs.
*/


function enableBtn(){
	let invalidInputs = document.querySelectorAll('input:invalid');
	let invalidClass = document.querySelectorAll('.error-input');

	if(invalidInputs.length == 0 && invalidClass.length == 0){
		submitBtn.removeAttribute('disabled');
		submitBtn.classList.add('valid-btn');
	}
	else{
		submitBtn.setAttribute('disabled', '');
		submitBtn.classList.remove('valid-btn');
	}
}

function createErrorItem(input, message, code){
	const div = document.createElement('div');
	const inputSpan = document.createElement('span');
	const messageSpan = document.createElement('span');

	div.classList.add('general-error');
	inputSpan.classList.add('input-span');
	messageSpan.classList.add('message-span');

	div.setAttribute('id', code);
	inputSpan.textContent = input;
	messageSpan.textContent = message;

	div.appendChild(inputSpan);
	div.appendChild(messageSpan);

	return div;
}

function appendErrorItem(parentEl, input, message, code){
	let boolMatch = false;
	let childNodes = parentEl.childNodes;

	for(let i = 0; i < childNodes.length; i++){
		if(childNodes[i].id == code){
			boolMatch = true;
		}
	}

	if(!boolMatch){
		parentEl.appendChild( createErrorItem(input, message, code) );
	}

	return;
}

function removeErrorItem(parentEl, code){
	let childNodes = parentEl.childNodes;

	for(let i = 0; i < childNodes.length; i++){
		if(childNodes[i].id == code){
			childNodes[i].remove();
		}
	}

	return;
}