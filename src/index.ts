const form = document.querySelector<HTMLFormElement>('#form');
const userInput = document.querySelector<HTMLInputElement>('#user-input');
const ul = document.querySelector<HTMLUListElement>('#ul');

let reqData: Task[] = []; 
const tasks: Task[] = getSavedTasks();

async function getData () {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos');
    reqData = await data.json();
    reqData.forEach(data => tasks.push(data));
    tasks.forEach(data => addTask(data));
}
getData();

type Task = {
    title: string
    id: number
    userId: number
    completed: boolean
}

form?.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    if(userInput?.value == '' || userInput?.value == null) return;

    const task: Task = {
        title: userInput.value,
        id: Math.floor(Math.random()),
        userId: 1,
        completed: false,
    }
    addTask(task);
    tasks.unshift(task);
    userInput.value = '';
})

function addTask (task: Task) {
    const li = document.createElement('li') as HTMLLIElement;
    const label = document.createElement('label') as HTMLLabelElement;
    const input = document.createElement('input') as HTMLInputElement;

    input.type = 'checkbox';
    input.id = String(task.id);
    input.checked = task.completed;
    input.addEventListener('change', () => {
        task.completed = input.checked;
        console.log(input.checked);
        savedTasks();
    });
    label.textContent = task.title;
    label.htmlFor = String(task.id);
    li.appendChild(input);
    li.appendChild(label);
    ul?.appendChild(li);
}

function savedTasks () {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function getSavedTasks (): [] {
    const saved = localStorage.getItem('TASKS');
    if(saved == null)  return [];
    return JSON.parse(saved);
}