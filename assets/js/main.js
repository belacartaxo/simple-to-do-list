const inputText = document.querySelector('#input-text')
const add = document.querySelector('#btn-add');
/* const edit = document.querySelector('.btn-edit');
const del = document.querySelector('.btn-delete'); */

add.addEventListener('click', () =>{
    createTask();
})

inputText.addEventListener('keydown', (e) =>{
    if (e.keyCode===13){
        createTask();
    }
})

function createTask(){
    let ul = document.querySelector('.box-content');
    const li = createLi();
    ul.appendChild(li);
}

function createLi(){
    let li = document.createElement('li');

    
    li.appendChild(createSpan())
    li.appendChild(createDiv());
    return li;    
}

function createSpan(){
    let span = document.createElement('span');
    span.classList.add('txt-list')
    span.innerText = inputText.value;
    return span;
}

function createDiv(){
    let div = document.createElement('div');
    div.classList.add('buttons');
    let btnEdit = createButton('btn','btn-edit', '<i class="fa-solid fa-pencil"></i>');
    let btnDel = createButton('btn', 'btn-del', '<i class="fa-solid fa-trash"></i>');
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