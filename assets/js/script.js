// get required elements that enable us to switch and interface the pages

var start_btn = document.querySelector(".quiz_start_btn button");
var quiz_info_container = document.querySelector(".quiz_info_container");
var exit_btn = quiz_info_container.querySelector(".buttons .exit");
var continue_btn = quiz_info_container.querySelector(".buttons .btn");
var quiz_container = document.querySelector(".question_list_wrapper");
var choiceList = document.querySelector(".choice_list");
var time_container = document.querySelector(".app_header");
var time_left = time_container.querySelector("#count_down_timer");

// When the start button is clicked, we are taken to the quiz's rules page
start_btn.onclick = function () {
  quiz_info_container.classList.add("activeInfo");
};

// When the exit button is clicked, we are taken back to the start page
exit_btn.onclick = function () {
  quiz_info_container.classList.remove("activeInfo");
};

// number_of_question = next.onclick.number_of_question++;

function fetch_questions(index) {
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
let correctAnswer =
  "<p>&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbspCorrect!</p>";
let wrongAnswer =
  "<p> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Wrong!</div>";

function optionSelected(answer) {
  clearInterval(time_linterval);
  let userSelectedAnswer = answer.textContent;
  let rightAnswer = questions[count_of_question].answer;
  let allChoices = choiceList.children.length;

  if (userSelectedAnswer == rightAnswer) {
    answer.classList.add("correct");
    console.log("correct");
    answer.insertAdjacentHTML("beforeend", correctAnswer);
  } else {
    answer.classList.add("wrong");
    console.log("incorrect");
    answer.insertAdjacentHTML("beforeend", wrongAnswer);

    // If the wrong answer is selected, select the correct one and display it to the user
    for (let i = 0; i < allChoices; i++) {
      if (choiceList.children[i].textContent == rightAnswer) {
        choiceList.children[i].setAttribute("class", "choice correct");
      }
    }
  }

  // One chance is given to the user to choose the answer; once the answer is selected, options will be disabled

  for (let i = 0; i < allChoices; i++) {
    choiceList.children[i].classList.add("block");
  }
  next.style.display = "block";
}

// If the continue button is clicked, we are taken forward to the actual quiz page
continue_btn.onclick = function () {
  quiz_info_container.classList.remove("activeInfo");
  quiz_container.classList.add("activeQuiz");
  fetch_questions(0);
  // timeLeft(30);
  count_down_timer(15);
};

// Adding a timer function
var count_of_question = 0;
var number_of_question = 1;
var time_linterval;
var actual_time = 15;

function count_down_timer(time) {
  time_linterval = setInterval(timer, 1000);
  function timer() {
    time_left.textContent = time;
    time--;

    // Timer with one digit is converted to two digit when it is less than nine
    if (time < 9) {
      time_left.textContent = "0" + time_left.textContent; // This line adds a prefix zero only to the timers less than ten
    }

    // If the time limit has expired before the answer has been selected, then the following will apply
    if (time < 0) {
      clearInterval(time_linterval);
    }
  }
}
// function change_timer_background() {
//   var background = document.getElementById("time_left");
//   var text = document.getElementById("count_down_timer");
//   var background_color = ["green", "orange", "red"];
//   var text_color = ["white", "blue"];
//   if (this.time <= 10) {
//     background.style.backgroundColor = background_color[0];
//   } else if (this.time <= 5) {
//     (background.style.backgroundColor = background_color[1]),
//       (text.style.color = text_color[1]);
//   } else {
//     (background.style.backgroundColor = background_color[2]),
//       (text.style.color = text_color[0]);
//   }
//   setInterval(change_timer_background, 1000);
//   if (this.time > 549) {
//     clearInterval(time_left_indicator_background_interval);
//   }
// }

var next = quiz_container.querySelector(".next");
next.onclick = function () {
  if (count_of_question < questions.length - 1) {
    count_of_question++;
    number_of_question++;
    fetch_questions(count_of_question);
    clearInterval(time_linterval);
    count_down_timer(actual_time);
    next.style.display = "none";
    // questionItself(number_of_question);
  } else {
    console.log("Questions complited");
  }

  // change_timer_background();
};
