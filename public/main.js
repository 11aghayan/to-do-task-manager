const tasks = document.querySelectorAll('.tasks');
const taskBtn = document.querySelectorAll('.task-btn');
const newTaskBtn = document.querySelector('.new-task-btn');
const newTaskSection = document.querySelector('.new-task-section');
const newTaskCloseBtn = document.querySelector('.new-task-close-btn');
const chevronIcons = document.querySelectorAll('.task-btn-icon');
const addBtn = document.querySelector('.new-task-add-btn');
const newTask = document.querySelector('.new-task-input');
const editSection = document.querySelector('.edit-task-section');
const editBtn = document.querySelector('.edit-btn');
const editInput = document.querySelector('.edit-task-input');
const editCloseBtn = document.querySelector('.edit-task-close-btn');
const editRadios = document.getElementsByName('edit-radio');


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

editCloseBtn.addEventListener('click', () => {
  editSection.classList.remove('visible')
});


//fetch 

async function serve() {
  let response = await fetch('http://localhost:8000/api/v1/tasks/');
  let allTasks = await response.json();
  allTasks = allTasks.tasks;

  for (let task of allTasks) {
    const p = document.createElement('p');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');
    const iDelete = document.createElement('i');
    const iEdit = document.createElement('i');
    let taskParagraph;

    if (task.state === 0) {
      taskParagraph = tasks[0].appendChild(p);
      taskParagraph.classList.add('waiting-task-paragraph');
    } else if (task.state === 1) {
      taskParagraph = tasks[1].appendChild(p);
      taskParagraph.classList.add('pending-task-paragraph');
    } else {
      taskParagraph = tasks[2].appendChild(p);
      taskParagraph.classList.add('done-task-paragraph');
    }

    taskParagraph.textContent = task.name;
    taskParagraph.classList.add('task-paragraph');
    taskParagraph.setAttribute('id', task._id);

    const deleteBtn = taskParagraph.appendChild(btnDelete);
    deleteBtn.classList.add('task-delete-btn', 'task-paragraph-btn'); 
    deleteBtn.setAttribute('id', task._id);
    const iconDelete = deleteBtn.appendChild(iDelete);  
    iconDelete.classList.add('fa-regular', 'fa-trash-can');

    const editBtn = taskParagraph.appendChild(btnEdit);
    editBtn.classList.add('task-edit-btn', 'task-paragraph-btn');
    editBtn.setAttribute('id', task._id);
    const iconEdit = editBtn.appendChild(iEdit);
    iconEdit.classList.add("fa-regular", "fa-pen-to-square");
  }

  addBtn.addEventListener('click', async () => {
      const state = document.querySelector('input[name="state-radio"]:checked').value;
      const jsonBody = {
        "name": newTask.value,
        "state": Number(state)
      };
  
      await fetch('http://localhost:8000/api/v1/tasks/', {
        method: 'POST',
        body: JSON.stringify(jsonBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      location.reload();
  });

  const taskDeleteBtn = document.querySelectorAll('.task-delete-btn');
  const taskEditBtn = document.querySelectorAll('.task-edit-btn');

  taskDeleteBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('id');
      console.log(id)
      await fetch(`http://localhost:8000/api/v1/tasks/${id}`, {
        method: 'DELETE'
      });

      const taskP = document.getElementById(id);
      taskP.remove();
    })
  });

  taskEditBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('id');
      editSection.classList.add('visible');
      const req = await fetch(`http://localhost:8000/api/v1/tasks/${id}`);
      let task = await req.json();
      task = task.task;
      editInput.value = task.name;
      editInput.setAttribute('id', id);
      const state = task.state;
      editRadios[state].checked = true;
    });
  });

  editBtn.addEventListener('click', async () => {
    const id = editInput.getAttribute('id');
    const name = editInput.value;
    const state = document.querySelector('input[name="edit-radio"]:checked').value;
    const body = {
      name: name,
      state: Number(state)
    };

    await fetch(`http://localhost:8000/api/v1/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });

    location.reload();
  });
}

serve();