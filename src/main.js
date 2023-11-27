const todoList = document.getElementById('todolist')
const textInput = document.getElementById('text-task')
const removeButton = document.getElementById('remove-button')

textInput.value = ''

const TAG_O = { value: '(o)', color: 'gray' }
const TAG_A = { value: '(A)', color: 'red' }
const TAG_B = { value: '(B)', color: 'pink' }
const TAG_C = { value: '(C)', color: 'orange' }
const TAG_D = { value: '(D)', color: 'yellow' }
const TAG_E = { value: '(E)', color: 'blue' }
const TAG_F = { value: '(F)', color: 'green' }

const TAGS = [TAG_O, TAG_A, TAG_B, TAG_C, TAG_D, TAG_E, TAG_F]

let tasks = []
let completedTasks = []

class Task {
  constructor(text, tag = TAG_O, status = 'uncompleted') {
    this.text = text
    this.tag = tag
    this.status = status
  }
  printTask(div, id) {
    this.id = parseInt(id) + 1
    let completed = ''
    if (this.status == 'completed') completed = 'completed'
    div.innerHTML = `
            <p>${this.id}</p>
            <p id="${this.id}" class="task ${completed}">
                <input type="button" class="${this.tag.color} ${completed}" value="${this.tag.value}" onclick="completTask(event, ${this.index})">
                ${this.text}
            </p>
        `
  }
}

function drawTasks() {
  const fragment = document.createDocumentFragment()
  todoList.innerHTML = ``

  tasks.sort((a, b) => a.tag.value.charCodeAt(1) - b.tag.value.charCodeAt(1))
  for (index in tasks) {
    const div = document.createElement('div')
    const br = document.createElement('br')

    tasks[index].printTask(div, index)
    fragment.appendChild(div)
    fragment.appendChild(br)
  }
  todoList.appendChild(fragment)
}

function completTask(event) {
  const input = event.originalTarget
  const parent = input.parentElement
  const index = parseInt(parent.id) - 1
  const task = tasks[index]

  if (task.status == 'completed') task.status = 'uncompleted'
  else task.status = 'completed'
  input.classList.toggle('completed')
  parent.classList.toggle('completed')
}

function removeTasks() {
  for (let task of tasks) {
    if (task.status == 'completed') {
      completedTasks.push(task.id)
    }
  }
  if (completedTasks.length == 0) return
  let difference = tasks.filter((task) => !completedTasks.includes(task.id))
  tasks = difference
  drawTasks()
  completedTasks = []
}

function clearTodoList() {
  todoList.innerHTML = ''
  textInput.value = ''
  tasks = []
}

removeButton.addEventListener('keyup', (event) => {
  if (event.key == 'Control') clearTodoList()
})

textInput.addEventListener('keyup', (event) => {
  event.preventDefault()
  if (event.key == 'Enter') addTask()
})
function addTask() {
  let taskTag
  let textValue = textInput.value.trim()
  let firstWord = textValue.toLowerCase().split(' ')[0]

  for (let tag of TAGS) {
    if (firstWord == tag.value.toLowerCase()) {
      taskTag = tag
      textValue = textValue.substring(4)
    }
  }
  if (textValue == '') return
  if (firstWord == 'clear') {
    clearTodoList()
    return
  }

  const task = new Task(textValue, taskTag)
  tasks.push(task)
  drawTasks()

  textInput.value = ''
}

function lightMode() {
  const container = document.getElementById('container')
  container.classList.toggle('lightMode')
}
