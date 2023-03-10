const inputText = document.querySelector('#input-text')
const add = document.querySelector('#btn-add');
const editWindow = document.querySelector('#edit-window');
const editWindowBackground = document.querySelector('#background-edit-window');
const inputEdit = document.querySelector('#input-edit');
const closeBtn = document.querySelector('#close');
const updateBtn = document.querySelector('.edit button')
let ul = document.querySelector('.box-content');
let spanEdit = '';

inputText.focus()

add.addEventListener('click', () =>{
    let inputTextValue = inputText.value;
    inputTextValue = inputTextValue.trim();
    if (inputTextValue.length > 0){
        createTask();
    }
    inputText.focus()
})

closeBtn.addEventListener('click', ()=>{
    closeWindow();
})

inputText.addEventListener('keydown', (e) =>{
    if (e.keyCode===13){
        let inputTextValue = inputText.value;
        inputTextValue = inputTextValue.trim();
        if (inputTextValue.length > 0){
            createTask();
        }
    }
})

updateBtn.addEventListener('click', ()=>{
    let inputEditValue = inputEdit.value;
    inputEditValue = inputEditValue.trim();
    if (inputEditValue.length > 0){
        changeTask(spanEdit);
        inputEdit.value='';
        closeWindow();
    }
    inputEdit.focus();
})

inputEdit.addEventListener('keydown', (e)=>{
    if (e.keyCode===13){
        let inputEditValue = inputEdit.value;
        inputEditValue = inputEditValue.trim();
        if (inputEditValue.length > 0){
            changeTask(spanEdit);
            inputEdit.value='';
            closeWindow();
        }
    }
})

function createTask(){
    const task = {
        value: inputText.value,
        id: criateId()
    }
    const li = createLi(task);
    ul.appendChild(li);
    inputText.value = '';
}

function createLi(task){
    let li = document.createElement('li');
    li.id = task.id;
    li.appendChild(createSpan(task))
    li.appendChild(createDiv(task));
    return li;    
}

function createSpan(task){
    let span = document.createElement('span');
    span.classList.add('txt-list')
    span.innerText = task.value;
    return span;
}

function createDiv(task){
    let div = document.createElement('div');
    div.classList.add('buttons');

    let btnEdit = createButton('btn','btn-edit', '<i class="fa-solid fa-pencil"></i>');
    let btnDel = createButton('btn', 'btn-delete', '<i class="fa-solid fa-trash"></i>');

    btnDel.setAttribute('onclick', `deleteTask('${task.id}')`)
    btnEdit.setAttribute('onclick', `editTask('${task.id}')`)

    div.appendChild(btnEdit);
    div.appendChild(btnDel);
    return div;
    
}

function createButton(classBtn1, classBtn2, tagI){
    let btn = document.createElement('button');
    btn.classList.add(classBtn1, classBtn2);
    btn.innerHTML= tagI;
    return btn;
}

function criateId(){
    idList = createIdList();
    
    const newId = generateId();

    let c=0;
    for(let i; i<=idList.indexOf(); i++){
        if (newId === idList[i]){
            newId = generateId();
            i=0;
        }

        if(i===10000){
            alert('Insufficient ids... Delete some task!');
        }
    }
    return newId;
}

function generateId(){
    return Math.floor(Math.random()*10000);
}
    
function createIdList(){
    const listItems = ul.children;
    const idItems = [];
    
    for(let idValue of listItems){
        idItems.push(idValue.id);
    }

    return idItems;
}

function editTask(id){
    const li = document.getElementById(`${id}`);
    spanEdit = li.querySelector('span');
    openWindow(editWindow);
}

function changeTask(span){
    const txt = inputEdit.value;
    span.innerHTML = txt;
}

function openWindow(){
    editWindow.classList.add('open');
    editWindowBackground.classList.add('open');
    inputEdit.focus();
}

function closeWindow(){
    editWindow.classList.remove('open');
    editWindowBackground.classList.remove('open');
}

function deleteTask(id) {
    const li = document.getElementById(`${id}`);
    ul.removeChild(li);
}