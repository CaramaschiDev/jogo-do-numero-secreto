let listaDeNumeros = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function resumirCodigos(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    resumirCodigos('h1', 'Jogo do Número Secreto');
    resumirCodigos('p', 'Escolha um número entre 1 e 10.');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        resumirCodigos('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}!`;
        resumirCodigos('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            resumirCodigos('p', 'O número secreto é menor');
        } else {
            resumirCodigos('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeNumeros = listaDeNumeros.length;

    if (quantidadeNumeros == numeroMaximo) {
        listaDeNumeros = [];
    }

    if (listaDeNumeros.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        listaDeNumeros.push(numeroEscolhido);
        console.log(listaDeNumeros);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}