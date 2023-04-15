const tasks = document.querySelectorAll('.tasks');
const taskBtn = document.querySelectorAll('.task-btn');
const newTaskBtn = document.querySelector('.new-task-btn');
const newTaskSection = document.querySelector('.new-task-section');
const newTaskCloseBtn = document.querySelector('.new-task-close-btn');
const chevronIcons = document.querySelectorAll('.task-btn-icon');


taskBtn.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        tasks[i].classList.toggle('open');
        chevronIcons[i].classList.toggle('task-btn-rotated');
    });
});

newTaskBtn.addEventListener('click', () => {
  newTaskSection.classList.add('visible')
});

newTaskCloseBtn.addEventListener('click', () => {
  newTaskSection.classList.remove('visible')
});