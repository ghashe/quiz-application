// get required elements that enable us to switch and interface the pages

var start_btn = document.querySelector(".quiz_start_btn button");
var quiz_info_container = document.querySelector(".quiz_info_container");
var exit_btn = quiz_info_container.querySelector(".buttons .exit");
var continue_btn = quiz_info_container.querySelector(".buttons .btn");
var quiz_container = document.querySelector(".question_list_wrapper");
var choiceList = document.querySelector(".choice_list");

// When the start button is clicked, we are taken to the quiz's rules page
start_btn.onclick = function () {
  quiz_info_container.classList.add("activeInfo");
};

// When the exit button is clicked, we are taken back to the start page
exit_btn.onclick = function () {
  quiz_info_container.classList.remove("activeInfo");
};

// If the continue button is clicked, we are taken forward to the actual quiz page
continue_btn.onclick = function () {
  quiz_info_container.classList.remove("activeInfo");
  quiz_container.classList.add("activeQuiz");
  fetchQuestions(0);
  timeLeft(30);
};

// Adding a method to get an array that returns questions and answers and displays them in the user interface
var numberOfQuestion = 0;
// numberOfQuestion = next.onclick.numberOfQuestion++;

function fetchQuestions(index) {
  var questionClassName = document.querySelector(".question");

  var questionNumberClassName = document.querySelector(".number_of_question");
  questionItself =
    "<p>" + questions[index].no + ". " + questions[index].question + "</p>";
  var questionNumber =
    "<p>" +
    "Question" +
    " " +
    questions[index].no +
    " " +
    "of" +
    " " +
    questions.length +
    "</p>";

  let optionLists =
    '<div class="choice">' +
    questions[index].options[0] +
    "<p></p></div>" +
    '<div class="choice">' +
    questions[index].options[1] +
    "<p></p></div>" +
    '<div class="choice">' +
    questions[index].options[2] +
    "<p></p></div>" +
    '<div class="choice">' +
    questions[index].options[3] +
    "<p></p></div>";
  questionClassName.innerHTML = questionItself;
  choiceList.innerHTML = optionLists;
  questionNumberClassName.innerHTML = questionNumber;

  const option = choiceList.querySelectorAll(".choice");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// Answer selected message
let correctAnswer = "<p>Correct!</p>";
let wrongAnswer = "<p>Wrong!</div>";

function optionSelected(answer) {
  let userSelectedAnswer = answer.textContent;
  let rightAnswer = questions[numberOfQuestion].answer;
  let allChoices = choiceList.children.length;

  if (userSelectedAnswer == rightAnswer) {
    answer.classList.add("correct");
    console.log("correct");
    answer.insertAdjacentHTML("beforeend", correctAnswer);
  } else {
    answer.classList.add("wrong");
    answer.insertAdjacentHTML("beforeend", wrongAnswer);

    // If the wrong answer is selected, select the correct one and display it to the user
    for (let i = 0; i < allChoices; i++) {
      if (choiceList.children[i].textContent == rightAnswer) {
        choiceList.children[i].setAttribute("class", "choice correct");
      }
    }
  }

  // One chance is given to the user to choose the answer; once the answer is selected, options are disabled

  for (let i = 0; i < allChoices; i++) {
    choiceList.children[i].classList.add("disabled");
  }
}

var next = quiz_container.querySelector(".next");
next.onclick = function () {
  numberOfQuestion++;
  fetchQuestions(numberOfQuestion);
};

//  Add a div that inserts the results of the selected option (Correct! or Wrong!)
let correctAlert = '<div class="correct_asnwer"><p>Correct!</p></div>';
let wrongAlert = '<div class="correct_asnwer"><p>Wrong!</p></div>';

var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// Update the count down every 1 second
imeleft = timeGiven - timePassed;

function timeLeft(count) {
  // document.getElementById("countdowntimer").innerHTML = 15;
  var count;
  var interval = setInterval(function () {
    document.getElementById("countdowntimer").innerHTML = count;
    count--;
    if (count === 0) {
      clearInterval(interval);
      document.getElementById("countdowntimer").innerHTML = "Expired";
    }
  }, 1000);
}
