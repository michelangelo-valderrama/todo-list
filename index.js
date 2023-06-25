
// -- START VARIABLES -- \\
const todoList = document.getElementById('todolist')
const textInput = document.getElementById('text-task')

textInput.value = ''

const TAG_O = {value: '(o)', color: 'gray'}
const TAG_A = {value: '(a)', color: 'red'}
const TAG_B = {value: '(b)', color: 'pink'}
const TAG_C = {value: '(c)', color: 'orange'}
const TAG_D = {value: '(d)', color: 'yellow'}
const TAG_E = {value: '(e)', color: 'blue'}
const TAG_F = {value: '(f)', color: 'green'}

const TAGS = [TAG_O, TAG_A, TAG_B, TAG_C, TAG_D, TAG_E, TAG_F]
// -- END VARIABLES -- \\


// -- START MAIN -- \\
// Tasks
let tasks = []
let completedTasks = []

class Task {
    constructor(text, tag=TAG_O) {
        this.text = text;
        this.value = tag.value;
        this.color = tag.color;
    }
    printTask(div, index) {
        this.index = parseInt(index) + 1
        div.innerHTML = `
            <p>${this.index}</p>
            <p class="task">
                <input type="button" class="${this.color}" value="${this.value}" onclick="completTask(event, ${this.index})">
                ${this.text}
            </p>
        `
    }
}

function drawTask() {
    const fragment = document.createDocumentFragment()
    todoList.innerHTML = ``

    tasks.sort((a, b) => a.value.charCodeAt(1) - b.value.charCodeAt(1))
    for (index in tasks) {
        const div = document.createElement('div')
        const br = document.createElement('br')
        
        tasks[index].printTask(div, index)
        fragment.appendChild(div)
        fragment.appendChild(br)
    }
    todoList.appendChild(fragment)
}

function completTask(event, index) {
    const input = event.originalTarget

    if (input.classList[1] == 'completed') {
        input.classList.remove('completed')
        input.parentElement.classList.remove('completed')
    } else {
        input.classList.add('completed')
        input.parentElement.classList.add('completed')
    }
}
// -- END MAIN -- \\


// -- START PROMPT -- \\
// Remove task
function removeTask(event) {
    console.log(event)
}

function clearTodoList() {
    todoList.innerHTML = ''
    textInput.value = ''
    tasks = []
}

// Add task
textInput.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.key == 'Enter') addTask()
})
function addTask() {
    let taskTag;
    let textValue = textInput.value.trim()
    let firstWord = textValue.toLowerCase().split(" ")[0]
    
    for (let tag of TAGS) {
        if (firstWord == tag.value) {
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
    drawTask()

    textInput.value = ''
}
// -- END PROMPT -- \\