//#region Handle Quiz Difficulty Selection
function setButtonActive(enabled) {
	var buttonGroup = document.body.querySelector('#difficultySelector');
	buttonGroup.classList.toggle('disabled', !enabled);
}

//#endregion
//#region Utility Functions
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
//#endregion
//#region Initial Game Data
const gameData = {
	difficulty: 'easy',
	questions: {
		easy: [
			{
				question: 'What is phishing?',
				answers: [
					{ text: 'A type of fishing technique', correct: false },
					{ text: 'A method of collecting seashells', correct: false },
					{
						text: 'An attempt to trick individuals into revealing sensitive information',
						correct: true,
					},
					{ text: 'A form of physical exercise', correct: false },
				],
			},
			{
				question: 'What is a strong password?',
				answers: [
					{ text: '"123456"', correct: false },
					{ text: '"password123"', correct: false },
					{ text: '"Secure@P@ssw0rd!"', correct: true },
					{ text: '"abcde"', correct: false },
				],
			},
			{
				question: 'How can you verify the safety of a link?',
				answers: [
					{ text: 'Click on it and see where it leads', correct: false },
					{ text: 'Ensure that the domain name is correct', correct: true },
					{ text: 'Ignore it, as all links are safe', correct: false },
					{ text: 'Share it with friends before opening', correct: false },
				],
			},
		],
		medium: [
			{
				question: 'What is a common phishing method?',
				answers: [
					{ text: 'Encryption', correct: false },
					{ text: 'Fake Email', correct: true },
					{ text: 'Firewall', correct: false },
					{ text: 'Authentication', correct: false },
				],
			},
			{
				question:
					'Which of the following is a good practice for password safety?',
				answers: [
					{
						text: 'Using the same password for multiple accounts',
						correct: false,
					},
					{ text: 'Keeping the same password for a long time', correct: false },
					{
						text: 'Sharing passwords with friends when requested',
						correct: false,
					},
					{ text: 'Enabling two-factor authentication', correct: true },
				],
			},
			{
				question: 'Why can URL shortening be a concern for link safety?',
				answers: [
					{ text: 'It improves link performance', correct: false },
					{
						text: 'It shortens the time it takes to load a webpage',
						correct: false,
					},
					{
						text: 'It can hide the destination URL, and thus the safety of the link',
						correct: true,
					},
					{
						text: 'It reduces the likelihood of phishing attacks',
						correct: false,
					},
				],
			},
			{
				question: 'What is spear phishing?',
				answers: [
					{ text: 'A fishing technique using a spear', correct: false },
					{
						text: 'Targeted phishing attacks on specific individuals or organizations',
						correct: true,
					},
					{ text: 'A form of deep-sea fishing', correct: false },
					{
						text: 'A phishing attack involving multiple attackers',
						correct: false,
					},
				],
			},
			{
				question:
					'Why is it important to avoid using easily guessable passwords?',
				answers: [
					{ text: 'They make login faster', correct: false },
					{ text: 'They are more memorable', correct: false },
					{ text: 'They provide better security', correct: true },
					{ text: 'They are easier to guess', correct: false },
				],
			},
			{
				question: 'What is the purpose of a link in an email?',
				answers: [
					{ text: 'To confuse the reader', correct: false },
					{ text: 'To add visual appeal', correct: false },
					{ text: 'To redirect to a website or resource', correct: true },
					{ text: 'To increase email length', correct: false },
				],
			},
		],
		hard: [
			{
				question: 'What is the difference between phishing and scamming?',
				answers: [
					{ text: 'Phishing is a type of scam', correct: true },
					{ text: 'Scamming is a type of phishing', correct: false },
					{ text: 'Phishing is a type of fishing', correct: false },
					{ text: 'Scamming is a type of fishing', correct: false },
				],
			},
			{
				question:
					'What is the role of a password manager in enhancing password safety?',
				answers: [
					{
						text: 'It generates random passwords and stores them securely',
						correct: true,
					},
					{ text: 'It encrypts all incoming emails', correct: false },
					{
						text: 'It increases the speed of internet connections',
						correct: false,
					},
					{
						text: 'It automatically changes passwords every hour',
						correct: false,
					},
				],
			},
			{
				question: 'How can a man-in-the-middle attack compromise link safety?',
				answers: [
					{
						text: 'By intercepting communication between two parties',
						correct: true,
					},
					{ text: 'By strengthening the encryption of links', correct: false },
					{ text: 'By redirecting links to a secure server', correct: false },
					{ text: 'By using stronger passwords', correct: false },
				],
			},
			{
				question: 'What is pretexting in the context of phishing?',
				answers: [
					{
						text: 'Creating a false narrative to obtain information',
						correct: true,
					},
					{
						text: 'Pretending to be a law enforcement officer',
						correct: false,
					},
					{ text: 'Using advanced encryption techniques', correct: false },
					{
						text: 'Initiating a phishing attack on a specific target',
						correct: false,
					},
				],
			},
			{
				question: 'How does biometric authentication enhance password safety?',
				answers: [
					{
						text: 'By requiring users to remember complex passwords',
						correct: false,
					},
					{
						text: 'By using physical or behavioral characteristics for authentication',
						correct: true,
					},
					{ text: 'By disabling password protection entirely', correct: false },
					{ text: 'By allowing easy password recovery', correct: false },
				],
			},
			{
				question: 'Why is it risky to download files from untrusted links?',
				answers: [
					{ text: 'Untrusted links always contain viruses', correct: false },
					{
						text: 'Files from untrusted links may contain malware or ransomware',
						correct: true,
					},
					{ text: 'Untrusted links are illegal', correct: false },
					{
						text: 'Downloading from untrusted links improves internet speed',
						correct: false,
					},
				],
			},
			{
				question: 'What is the purpose of a CAPTCHA in phishing prevention?',
				answers: [
					{ text: 'To verify the authenticity of the sender', correct: false },
					{
						text: 'To prevent automated bots from accessing websites or submitting forms with stolen info',
						correct: true,
					},
					{
						text: 'To encrypt sensitive information in emails',
						correct: false,
					},
					{ text: 'To track the location of phishing attacks', correct: false },
				],
			},
			{
				question:
					'What is the danger of using the same password across multiple accounts?',
				answers: [
					{ text: 'It simplifies password management', correct: false },
					{
						text: 'It reduces the risk of forgetting passwords',
						correct: false,
					},
					{
						text: 'If one account is compromised, all accounts become vulnerable',
						correct: true,
					},
					{ text: 'It enhances overall security', correct: false },
				],
			},
			{
				question: 'How can an HTTPS certificate contribute to link safety?',
				answers: [
					{
						text: 'By encrypting data transmitted between the user and the website',
						correct: true,
					},
					{
						text: 'By slowing down the loading time of webpages',
						correct: false,
					},
					{ text: 'By displaying targeted advertisements', correct: false },
					{
						text: 'By preventing users from clicking on links',
						correct: false,
					},
				],
			},
		],
	},
	questionIndex: 0,
	score: 0,
};

function getHighScore() {
	const highScore = localStorage.getItem('highScore');
	if (highScore) {
		return parseInt(highScore);
	}
	return 0;
}

function setHighScore(score) {
	localStorage.setItem('highScore', score);
}

//#endregion
//#region Handle clicks on the selectors

const buttons = {
	/** @type {HTMLInputElement} */
	easy: document.getElementById('easy'),
	/** @type {HTMLInputElement} */
	medium: document.getElementById('medium'),
	/** @type {HTMLInputElement} */
	hard: document.getElementById('hard'),
};

/**
 * @param {keyof (typeof buttons)} difficulty
 */
function setDifficulty(difficulty) {
	if (difficulty in buttons) {
		for (const key in buttons) {
			const element = buttons[key];
			element.checked = false;
			element.parentElement.classList.remove('active');
		}

		const check = buttons[difficulty];
		check.checked = true;
		check.parentElement.classList.add('active');

		// Set the difficulty in the game data
		gameData.difficulty = difficulty;
		gameData.score = 0;
	}
}

for (const key in buttons) {
	const element = buttons[key];
	element.addEventListener('click', () => {
		setDifficulty(key);
	});
}

//#endregion

//#region Program Quiz Logic

/**
 * @param {HTMLElement} element
 */
function waitForClick(element) {
	return new Promise((resolve) => {
		element.addEventListener(
			'click',
			() => {
				resolve();
			},
			{ once: true }
		);
	});
}

const startButton = document.getElementById('start');
const quiz = document.getElementById('quiz');
const scoreLabel = document.getElementById('score');
const highScoreLabel = document.getElementById('highscore');

highScoreLabel.innerText = getHighScore();

startButton.addEventListener('click', async () => {
	// Reset the score
	gameData.score = 0;
	scoreLabel.innerText = gameData.score;

	// Disable the difficulty selector
	setButtonActive(false);

	// Hide the start button
	startButton.hidden = true;

	// Show the quiz
	quiz.hidden = false;

	// Get important quiz parts
	const submitButton = quiz.querySelector('.submit');
	const answerElements = quiz.querySelectorAll('.answer');
	const questionText = quiz.querySelector('.question p');

	const answerInfo = {
		selected: null,
	};

	// Make answer options work
	function selectAnswer(index) {
		submitButton.classList.toggle('disabled', index === null);

		answerInfo.selected = index;
		for (let i = 0; i < answerElements.length; i++) {
			const element = answerElements[i];
			element.classList.toggle('active', i === index);
		}
	}

	for (let i = 0; i < answerElements.length; i++) {
		const element = answerElements[i];
		element.addEventListener('click', () => {
			selectAnswer(i);
		});
	}

	// Get questions
	/** @type {{
	 *     question: string;
	 *     answers: {
	 *         text: string;
	 *         correct: boolean;
	 *     }[];
	 * }[]} */
	const questions = gameData.questions[gameData.difficulty];

	for (const question of questions) {
		// Show the question
		questionText.innerText = question.question;

		// Show the answers
		for (let i = 0; i < question.answers.length; i++) {
			const answer = question.answers[i];
			const answerElement = answerElements[i];
			if (answerElement) {
				answerElement.hidden = false;
				answerElement.innerText = answer.text;
				answerElement.classList.remove('btn-danger');
				answerElement.classList.add('btn-primary');
				answerElement.classList.remove('disabled');
			} else {
				answerElement.hidden = true;
			}
		}

		selectAnswer(null);

		let isCorrectAnswer = false;

		let tries = 0;

		while (!isCorrectAnswer) {
			// Wait for the user to click the submit button
			await waitForClick(submitButton);

			// Disable the submit button
			submitButton.classList.add('disabled');

			// Increment the number of tries
			tries++;

			// Check the answer
			const correctAnswer = question.answers.findIndex(
				(answer) => answer.correct
			);
			const userAnswer = answerInfo.selected === correctAnswer;

			// Update the score if the user got it right
			if (userAnswer) {
				gameData.score += (100 / tries) | 0;
				scoreLabel.innerText = gameData.score;

				// Check if the user got a high score
				const highScore = getHighScore();
				if (gameData.score > highScore) {
					setHighScore(gameData.score);
					highScoreLabel.innerText = gameData.score;
				}

				break;
			} else {
				answerElements[answerInfo.selected].classList.add('disabled');
				answerElements[answerInfo.selected].classList.remove('btn-primary');
				answerElements[answerInfo.selected].classList.add('btn-danger');
				selectAnswer(null);
			}
		}
	}

	// Show the start button and hide the quiz
	startButton.hidden = false;
	quiz.hidden = true;
	setButtonActive(true);
});

//#endregion
