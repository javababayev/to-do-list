"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector('#form');
const userInput = document.querySelector('#user-input');
const ul = document.querySelector('#ul');
let reqData = [];
const tasks = getSavedTasks();
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch('https://jsonplaceholder.typicode.com/todos');
        reqData = yield data.json();
        reqData.forEach(data => tasks.push(data));
        tasks.forEach(data => addTask(data));
    });
}
getData();
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    if ((userInput === null || userInput === void 0 ? void 0 : userInput.value) == '' || (userInput === null || userInput === void 0 ? void 0 : userInput.value) == null)
        return;
    const task = {
        title: userInput.value,
        id: Math.floor(Math.random()),
        userId: 1,
        completed: false,
    };
    addTask(task);
    tasks.unshift(task);
    userInput.value = '';
});
function addTask(task) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
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
    ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
}
function savedTasks() {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
}
function getSavedTasks() {
    const saved = localStorage.getItem('TASKS');
    if (saved == null)
        return [];
    return JSON.parse(saved);
}
