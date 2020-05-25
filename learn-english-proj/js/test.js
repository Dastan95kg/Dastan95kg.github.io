const baseURL = 'https://demo9551996.mockable.io/test';

function test() {
    const startBtn = document.querySelector('.test__intro button');
    const intro = document.querySelector('.test__intro');
    const testResults = document.querySelector('.test__results');

    startBtn.addEventListener('click', async () => {
        intro.style.display = 'none';
        testResults.style.display = 'block';

        // fetch data from API
        const response = await fetch(baseURL);
        if (response.status === 200) {
            const data = await response.json();
            createCard(data);
            localStorage.setItem('data', JSON.stringify(data));
        }
    });

    // Creating cards with question and options
    const createCard = (data) => {
        const form = document.createElement('form');
        const submitBtn = document.createElement('button');
        submitBtn.setAttribute('type', 'submit');
        submitBtn.textContent = 'Submit';

        const options = data.map(item => item.options); // ??????

        // creating card
        data.forEach(item => {
            const { id, question: apiQuestion, options } = item;

            const card = document.createElement('div');
            const question = document.createElement('div');
            const questionNumber = document.createElement('span');
            const questionText = document.createElement('div');

            question.className = 'question';
            question.appendChild(questionNumber);
            question.appendChild(questionText);

            card.className = 'test__card';
            card.appendChild(question);
            testResults.appendChild(form);

            questionNumber.textContent = id;
            questionText.textContent = apiQuestion;

            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'test__card-options';
            card.appendChild(optionsContainer);

            // Creating each option
            options.forEach(item => {
                const option = document.createElement('div');
                const radio = document.createElement('input');
                const optionText = document.createElement('label');

                option.className = 'test__card-option';
                radio.setAttribute('type', 'radio');
                radio.setAttribute('name', id);
                radio.setAttribute('id', item);
                radio.setAttribute('value', item);

                optionText.textContent = item;
                optionText.setAttribute('for', item);

                optionsContainer.appendChild(option);
                option.appendChild(radio);
                option.appendChild(optionText);
            });

            form.appendChild(card);
            form.appendChild(submitBtn);
        });

        submitBtn.addEventListener('click', (e) => getFormData(e, data.length));
    };

    // get data from form
    function getFormData(e, length) {
        e.preventDefault();
        const selected = document.querySelectorAll('input[type="radio"]:checked');

        if (selected.length < length) {
            alert('Your answers is not enough. Please answer all the questions!');
        } else {
            countRightAnswers(selected);
        }
    }

    function countRightAnswers(userAnswers) {
        const data = JSON.parse(localStorage.getItem('data'));
        let counter = 0;

        userAnswers.forEach(userAnswer => {
            data.find(obj => {
                if (obj.id === userAnswer.name) {
                    if (obj.answer === userAnswer.value) {
                        counter++;
                    }
                }
            });
        });
        defineLevel(counter);
    }

    function defineLevel(answers) {
        const levels = ['Beginner', 'Elementary', 'Pre-Intermediate', 'Intermediate', 'Upper-Intermediate', 'Advanced'];
        if (answers >= 0 && answers <= 5) {
            createResultForUser(answers, levels[0]);
        } else if (answers >= 6 && answers <= 15) {
            createResultForUser(answers, levels[1]);
        } else if (answers >= 16 && answers <= 20) {
            createResultForUser(answers, levels[2]);
        } else if (answers >= 21 && answers <= 35) {
            createResultForUser(answers, levels[3]);
        } else if (answers >= 36 && answers <= 47) {
            createResultForUser(answers, levels[4]);
        } else if (answers >= 48 && answers <= 50) {
            createResultForUser(answers, levels[5]);
        } else {
            alert('Error');
        }
    }

    function createResultForUser(answers, level) {
        const totalQuestions = JSON.parse(localStorage.getItem('data')).length;
        // Removing tests
        const resultsDiv = document.querySelector('.test__results');
        const container = document.querySelector('.container');
        container.removeChild(resultsDiv);

        // Creating results for user
        const finalResultDiv = document.createElement('div');
        const title = document.createElement('h3');
        const resultText = document.createElement('div');

        finalResultDiv.className = 'final';

        title.innerHTML = `Your result: <span class="final__num">${answers}</span> out of ${totalQuestions}`;
        resultText.innerHTML = `Your level: <span class="final__num">${level}</span>`;

        finalResultDiv.appendChild(title);
        finalResultDiv.appendChild(resultText);
        container.appendChild(finalResultDiv);

        const backBtn = document.createElement('button');
        backBtn.setAttribute('type', 'button');
        backBtn.textContent = 'Main page';
        finalResultDiv.appendChild(backBtn);

        backBtn.addEventListener('click', () => {
            window.location.href = '../html/index.html';
        });
    }
}

test();