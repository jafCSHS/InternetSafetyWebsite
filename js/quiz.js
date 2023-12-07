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
				question: 'What is the capital of France?',
				answers: [
					{ text: 'New York', correct: false },
					{ text: 'London', correct: false },
					{ text: 'Paris', correct: true },
					{ text: 'Dublin', correct: false },
				],
			},
			{
				question: 'Who is CEO of Tesla?',
				answers: [
					{ text: 'Jeff Bezos', correct: false },
					{ text: 'Elon Musk', correct: true },
					{ text: 'Bill Gates', correct: false },
					{ text: 'Tony Stark', correct: false },
				],
			},
			{
				question: 'The iPhone was created by which company?',
				answers: [
					{ text: 'Apple', correct: true },
					{ text: 'Intel', correct: false },
					{ text: 'Amazon', correct: false },
					{ text: 'Microsoft', correct: false },
				],
			},
			{
				question: 'How many Harry Potter books are there?',
				answers: [
					{ text: '1', correct: false },
					{ text: '4', correct: false },
					{ text: '6', correct: false },
					{ text: '7', correct: true },
				],
			},
		],
		medium: [],
		hard: [],
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
