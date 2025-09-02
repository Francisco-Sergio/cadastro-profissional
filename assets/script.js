const form = document.getElementById("formulario");
const nomeInput = document.getElementById("nome");
const telefoneInput = document.getElementById("telefone");
const emailInput = document.getElementById("email");
const tabela = document.querySelector("#tabela tbody");
const contador = document.getElementById("contador");
let idEmEdicao = null;


const exBotao = document.createElement("button");
exBotao.className = "excluir";
exBotao.innerHTML = "Excluir";


let dados = JSON.parse(localStorage.getItem('cadastro')) || [];
let idAtual = dados.length ? dados[dados.length - 1].id + 1 : 1;

function salvarDados(nome, telefone, email) {
    const novoRegistro = {id: idAtual++, nome, telefone, email};
    dados.push(novoRegistro);
    localStorage.setItem('cadastro', JSON.stringify(dados));
}

function verificarDuplicado(nome, idIgnorado = null) {
    return dados.some(item => 
    item.nome.toLowerCase() === nome.toLowerCase() && 
    item.id !== idIgnorado);
}

function atualizarTabela() {
    
    tabela.style.overflow = "auto";
    tabela.innerHTML = "";
    dados.forEach(dado => {
        const row = tabela.insertRow();
        row.insertCell().textContent = dado.id;
        row.insertCell().textContent = dado.nome;
        row.insertCell().textContent = dado.telefone;
        row.insertCell().textContent = dado.email;

        const acaoCell = row.insertCell();

        // Botão editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "editar";
        btnEditar.onclick = () => editarContato(dado.id);

        // Botão exluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "excluir";
        btnExcluir.onclick = () => excluirContato(dado.id);

        acaoCell.appendChild(btnEditar);
        acaoCell.appendChild(btnExcluir);
    });
    
    contador.textContent = `${dados.length}`;
}

function editarContato(id) {
    const contato = dados.find(item => item.id === id);
    if (contato) {
        nomeInput.value = contato.nome;
        telefoneInput.value = contato.telefone;
        emailInput.value = contato.email;
        idEmEdicao = id;
    }
}

function excluirContato(id) {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
        dados = dados.filter(item => item.id !== id);
        localStorage.setItem('cadastro', JSON.stringify(dados));
        atualizarTabela();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome) return;

    if (idEmEdicao !== null) {
        if (verificarDuplicado(nome, idEmEdicao)) {
            alert('Esse nome já está em uso por outro contato!');
            return;
        }

        const index = dados.findIndex(item => item.id === idEmEdicao);
        if (index !== -1) {
            dados[index] = { id: idEmEdicao, nome, telefone, email };
            localStorage.setItem('cadastro', JSON.stringify(dados));
            idEmEdicao = null;
        }
    } else {
        if (verificarDuplicado(nome)) {
            alert('Esse nome já foi cadastrado!');
            return;
        }
        salvarDados(nome, telefone, email);
    }

    nomeInput.value = "";
    telefoneInput.value = "";
    emailInput.value = "";
    atualizarTabela();
});

atualizarTabela();