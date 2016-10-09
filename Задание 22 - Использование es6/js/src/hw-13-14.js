'use strict';

// object with questions and answers for the test
// as well as data for a temlate
let test = {
  testTitle: 'Тест по программированию',
  questions: [
    {title: 'Какие конструкции для циклов есть в javascript?',
      answers: [
        {text: 'Только две: for и while.'},
        {text: 'Только одна: for.'},
        {text: 'Три: for, while и do...while.'}
      ]
    },
    {title: 'В каком случае из перечисленных событие не попадет на обработку javascript?',
      answers: [
        {text: 'Если в момент его наступления обрабатывается другое событие.'},
        {text: 'Если страничка просматривается локально, т.е offline.'},
        {text: 'Только если javascript отключен.'}
      ]
    },
    {title: 'Какое событие не вызывается кликом мыши ?',
      answers: [
        {text: 'onfocus'},
        {text: 'onclick'},
        {text: 'onkeydown'}
      ]
    }],
  buttonTitle: 'Проверить мои результаты'
};

// saving and retrieving the object to and from localStorage
test = JSON.stringify(test);
localStorage.setItem('test', test);
let objTest = localStorage.getItem('test');
objTest = JSON.parse(objTest);

// creating the template
let questions = objTest.questions;
let tmpl = _.template(document.getElementById('form-template').innerHTML);
let result = tmpl(objTest);
document.body.insertAdjacentHTML("beforeBegin", result);

// on-click data validation and displaying a modal
let userAnswers, copyUserAnswers, rightAnswers;

let modalMessage = document.getElementById('modalMessage');
let resetButton = document.getElementById('testResetButon');

// right answers array:
// first digit of an item = number of the question,
// second digit = number of the rigth answer
rightAnswers = ['1.3', '2.1', '3.3'];

document.querySelector("button").addEventListener("click", function(event){
  event.preventDefault();
  userAnswers = document.querySelectorAll("input:checked");
  copyUserAnswers = userAnswers;

  // checking for correctness of the user's input
  function correctUserInput() {
    if (userAnswers.length < objTest.questions.length) {
      displayModal('Выберите один вариант ответа в каждом вопросе.');
      return false;
    } else {
      for (let i = 0; i < userAnswers.length - 1; i++) {
        if (userAnswers[i].id[0] == copyUserAnswers[i + 1].id[0]) {
          displayModal('В каждом вопросе можно выбрать только один вариант ответа.');
          return false;
          break;
        }
      }
    }
    return true;
  }

  // checking for correctness of the user's answers
  if (correctUserInput()) {
    let modalRightAnswers = [];
    let modalWrongAnswers = [];

    for (let i = 0; i < userAnswers.length; i++) {
      if (userAnswers[i].id == rightAnswers[i]) {
        modalRightAnswers.push(userAnswers[i].id[0]);
      } else {
        modalWrongAnswers.push(userAnswers[i].id[0]);
      }
    }

    //displaying feedback on the user's annswers
    if (modalRightAnswers.length === 3) {
      displayModal('Поздравляем, вы правильно ответили на все вопросы!');
      resetButton.style.display = "block"; // displaying the reset button
    } else {
      displayModal(`Вы неправильно ответили на вопрос № ${modalWrongAnswers.toString()}.`);
      resetButton.style.display = "block"; // displaying the reset button
    }
  }

  function displayModal(messageText) {
    //Get the modal
    let modal = document.getElementById('myModal');

    // Get the button that opens the modal
    let btn = document.getElementById("checkResults");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // Insert the message text into the modal
    modalMessage.innerHTML = messageText;

    // Show the modal by changing display properties
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
      modal.style.display = "none"
      resetButton.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
        resetButton.style.display = "none";
      }
    }

    // When the user clicks reset button,
    // reset the form, close the modal and hide the button
    resetButton.onclick = () => {
       document.getElementById("testForm").reset();
       modal.style.display = "none";
       resetButton.style.display = "none";
    }
  }
});
