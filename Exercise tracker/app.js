// Selectors

const exerciseInput = document.querySelector('#exercise-input');
const durationInput = document.querySelector('#duration-input');
const dayInput = document.querySelector('#day-input');
const exerciseButton = document.querySelector('.exercise-button');
const filterDay = document.querySelector('.day-filter');
const exerciseList = document.querySelector('.exercise-list');

// Event Listeners

document.addEventListener('DOMContentLoaded', getExercises)
exerciseButton.addEventListener('click', addExercise)
exerciseList.addEventListener('click', deleteExercise)
filterDay.addEventListener('click', filterDays)

// Functions

function addExercise(e) {
    e.preventDefault();

    if (exerciseInput.value === '') {
        alert('Exercise item cannot be empty')
        return;
    }
    if (durationInput.value === '') {
        alert('Duration value cannot be empty')
        return;
    }
    // exercise div
    const exerciseDiv = document.createElement('div');
    exerciseDiv.classList.add('exercise');

    // Create new exercise li
    const newExercise = document.createElement('li');
    newExercise.innerHTML = `${exerciseInput.value}: ${durationInput.value} minutes - ${dayInput.value}`;
    exerciseDiv.id = `${dayInput.value}`
    newExercise.classList.add('exercise-item');
    exerciseDiv.appendChild(newExercise);

    // Add to local storage
    saveLocalExercises(`${exerciseInput.value}: ${durationInput.value} minutes - ${dayInput.value}`);
    exerciseInput.value = "";
    // Create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="far fa-times-circle"></i>'

    trashButton.classList.add('trash-btn');
    exerciseDiv.appendChild(trashButton);

    // Append to list
    exerciseList.appendChild(exerciseDiv);
    exerciseInput.value = '';
    durationInput.value = '';

}

function deleteExercise(e) {
    const item = e.target.parentElement;
    if (item.classList[0] === 'trash-btn') {
        const exercise = item.parentElement;
        // Animation
        exercise.classList.add('fall');
        removeLocalExercises(exercise);
        // this will wait until the transition from the animation to complete
        exercise.addEventListener('transitionend', function () {
            exercise.remove();
        })
    }
}

function filterDays(e) {
    const days = document.querySelectorAll('.exercise')
    days.forEach(function (day) {
        if (day.id === e.target.value) {
            day.style.display = 'flex'
        } else if (e.target.value === 'All') {
            day.style.display = 'flex'
        } else {
            day.style.display = 'none'
        }
    })
}

function saveLocalExercises(exercise) {
    let exercises;
    if (localStorage.getItem("exercises") === null) {
        exercises = [];
    } else {
        exercises = JSON.parse(localStorage.getItem("exercises"));
    }
    exercises.push(exercise);
    localStorage.setItem("exercises", JSON.stringify(exercises));
}

function removeLocalExercises(exercise) {
    let exercises;
    if (localStorage.getItem("exercises") === null) {
        exercises = [];
    } else {
        exercises = JSON.parse(localStorage.getItem("exercises"));
    }
    // gets exercise content
    const exerciseIndex = exercise.children[0].innerText;
    exercises.splice(exercises.indexOf(exerciseIndex), 1);
    localStorage.setItem("exercises", JSON.stringify(exercises));
}

function getExercises() {
    let exercises;
    if (localStorage.getItem('exercises') === null) {
        exercises = [];
    } else {
        exercises = JSON.parse(localStorage.getItem('exercises'));
    }
    exercises.forEach(function (exercise) {
        // exercise div
        const exerciseDiv = document.createElement('div');
        exerciseDiv.classList.add('exercise');
        // Create new exercise li
        const newExercise = document.createElement('li');
        newExercise.innerHTML = exercise;
        exerciseDiv.id = `${dayInput.value}`
        newExercise.classList.add('exercise-item');
        exerciseDiv.appendChild(newExercise);
        // Create trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
        trashButton.classList.add('trash-btn');
        exerciseDiv.appendChild(trashButton);
        // Append to list
        exerciseList.appendChild(exerciseDiv);
    })
}