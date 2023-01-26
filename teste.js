let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');


let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
const qtdIdsDisponiveis = Number.MAX_VALUE;

inputNovaTarefa.addEventListener('keypress', (e) => {

    if(e.keyCode == 13) {
        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarIdV2(),
        }
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

btnAddTarefa.addEventListener('click', (e) => {

    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarIdV2(),
    }
    adicionarTarefa(tarefa);
});

btnAtualizarTarefa.addEventListener('click', (e) => { //quando clicar no btn de editar
    e.preventDefault();

    let idTarefa = idTarefaEdicao.innerHTML.replace('#', ''); //vai pegar o id do li

    let tarefa = { //cria um objeto ccom #################################### e o id correspondente
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa
    }

    let tarefaAtual = document.getElementById(''+idTarefa+''); //pega o conteudo do li

    if(tarefaAtual) { // se o li foe encontrado
        let li = criarTagLI(tarefa); //cria o li com a tarefa atualizada
        listaTarefas.replaceChild(li, tarefaAtual); // e troca o li antigo pelo novo
        alternarJanelaEdicao(); //fecha a janela
    } else {
        alert('Elemento HTML não encontrado!');
    } 
});

function gerarId() {
    return Math.floor(Math.random() * qtdIdsDisponiveis); // gera um valor arredondado aleatorio #########################
}

function gerarIdV2() { //##################################################
    return gerarIdUnico();
}

function gerarIdUnico() {

    // debugger;
    let itensDaLista = document.querySelector('#listaTarefas').children; // vai pegar todos os li's da lista
    let idsGerados = [];

    for(let i=0;i<itensDaLista.length;i++) { //vai percorrer os li's da lista de tarefas
        idsGerados.push(itensDaLista[i].id); // vai pegar o id de cada li e vai colocalo na ver idsGerados
    }

    let contadorIds = 0;
    let id = gerarId(); //vai solicitar um número aleatório

    while(contadorIds <= qtdIdsDisponiveis && idsGerados.indexOf(id.toString()) > -1) {  //id.toString()########################################
        /*enquanto o contador for menor q os ids disponiveis e a quantidade de ids gerados for maior que -1, que signica que a cadeia irá continuar*/ 
        id = gerarId(); //assim outro id será gerado até que a condição seja atendida
        contadorIds++;

        if(contadorIds >= qtdIdsDisponiveis) { //caso a quantidade de ids seja atingida
            alert("Oops, ficamos sem IDS :/");
            throw new Error("Acabou os IDs :/");
        }
    }

    return id;
}

function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);  
    inputNovaTarefa.value = '';  
}

function criarTagLI(tarefa) {

    let li = document.createElement('li');
    li.id = tarefa.id; //vai pegar o id que está no objeto tarefa

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome; //novo conteúdo da li

    let div  = document.createElement('div');

    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')');///////////////////////////////////////////////////////////////////////*** */
    
    let btnExcluir  = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')'); //************************************************* */

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idTarefa) {
    let li = document.getElementById(''+ idTarefa + '');
    if(li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
}

function excluir(idTarefa) {
    let confirmacao = window.confirm('Tem certeza que deseja excluir? ');
    if(confirmacao) {
        let li = document.getElementById(''+ idTarefa + '');
        if(li) {
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}