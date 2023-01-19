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
    createLi();
}

function createLi(){
    
}