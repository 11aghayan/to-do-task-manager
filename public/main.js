const tasks = document.querySelectorAll('.tasks');
const taskBtn = document.querySelectorAll('.task-btn');
const newTaskBtn = document.querySelector('.new-task-btn');
const newTaskSection = document.querySelector('.new-task-section');
const newTaskCloseBtn = document.querySelector('.new-task-close-btn');
const chevronIcons = document.querySelectorAll('.task-btn-icon');
const addBtn = document.querySelector('.new-task-add-btn');
const newTask = document.querySelector('.new-task-input');


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
  newTaskSection.classList.remove('visible');
});


//fetch 

async function serve() {
  let response = await fetch('http://localhost:8000/api/v1/tasks/');
  let allTasks = await response.json();
  allTasks = allTasks.tasks;

  for (let task of allTasks) {
    const p = document.createElement('p');
    if (task.state === 0) {
      const a = tasks[0].appendChild(p);
      a.innerHTML = task.name;
    } else if (task.state === 1) {
      const a = tasks[1].appendChild(p);
      a.innerHTML = task.name;
    } else {
      const a = tasks[2].appendChild(p);
      a.innerHTML = task.name;
    }
  }

  addBtn.addEventListener('click', async () => {
    const state = document.querySelector('input[name="state-radio"]:checked').value;
    const jsonBody = {
      "name": newTask.value,
      "state": Number(state)
    };

    await fetch('http://localhost:8000/api/v1/tasks/', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(jsonBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    location.reload();
  });
}

serve();