const palavras = ["LIMAO", "CARRO", "PIZZA", "NINJA", "PEDRA"];
const palavraCorreta = palavras[Math.floor(Math.random() * palavras.length)];

let tentativas = 0;
const maxTentativas = 6;

function criarLinha(palavra, resultado) {
  const board = document.getElementById("board");

  for (let i = 0; i < palavra.length; i++) {
    const letra = document.createElement("div");
    letra.classList.add("celula");

    const char = palavra[i].toUpperCase();
    letra.textContent = char;

    if (resultado[i] === "verde") {
      letra.classList.add("verde");
    } else if (resultado[i] === "amarelo") {
      letra.classList.add("amarelo");
    } else {
      letra.classList.add("cinza");
    }

    board.appendChild(letra);
  }
}

function tentar() {
  const input = document.getElementById("input-palavra");
  const palavra = input.value.toUpperCase();

  if (palavra.length !== 5) {
    alert("A palavra deve ter 5 letras.");
    return;
  }

  if (tentativas >= maxTentativas) return;

  let resultado = Array(5).fill("cinza");
  const palavraTemp = palavraCorreta.split("");

  // Verifica letras corretas na posição correta (verde)
  for (let i = 0; i < 5; i++) {
    if (palavra[i] === palavraCorreta[i]) {
      resultado[i] = "verde";
      palavraTemp[i] = null;
    }
  }

  // Verifica letras corretas em posição errada (amarelo)
  for (let i = 0; i < 5; i++) {
    if (resultado[i] === "verde") continue;
    const index = palavraTemp.indexOf(palavra[i]);
    if (index !== -1) {
      resultado[i] = "amarelo";
      palavraTemp[index] = null;
    }
  }

  criarLinha(palavra, resultado);

  if (palavra === palavraCorreta) {
    document.getElementById("mensagem").textContent = "Parabéns! Você acertou!";
    document.getElementById("input-palavra").disabled = true;
    return;
  }

  tentativas++;
  input.value = "";

  if (tentativas === maxTentativas) {
    document.getElementById("mensagem").textContent = `Fim de jogo! A palavra era ${palavraCorreta}`;
  }
}
document.getElementById("input-palavra").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      tentar();
    }
  });
