const form = document.getElementById("formulario");
const nomeInput = document.getElementById("nome");
const telefoneInput = document.getElementById("telefone");
const emailInput = document.getElementById("email");
const tabela = document.querySelector("#tabela tbody");
const contador = document.getElementById("contador");

let dados = JSON.parse(localStorage.getItem('cadastro')) || [];
let idAtual = dados.length ? dados[dados.length - 1].id + 1 : 1;

function salvarDados(nome, telefone, email) {
    const novoRegistro = {id: idAtual++, nome, telefone, email};
    dados.push(novoRegistro);
    localStoragesetItem('cadastro', JSON.stringify(dados));
}

function verificarDuplicado(nome) {
    return dados.some(item => item.nome.toLowerCase() === nome.toLowerCase());
}

function atualizarTabela() {
    tabela.innerHTML = "";
    dados.forEach(dado => {
        const row = tabela.insertRow();
        row.insertCell().textContent = dado.nome;
        row.insertCell().textContent = dado.telefone;
        row.insertCell().textContent = dado.email;
    });

    contador.textContent = `${dados.length}`;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome) return;

    if (verificarDuplicado(nome)) {
        alert('Esse nome já foi cadastrado!');
        return;
    }

    salvarDados(nome, telefone, email);
    nomeInput.value = "";
    telefoneInput.value = "";
    emailInput.value = "";
    atualizarTabela();
});

atualizarTabela();