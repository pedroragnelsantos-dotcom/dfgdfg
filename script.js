// Dados das 3 luzes do Semáforo da Acessibilidade
const dadosSemaforo = {
    verde: {
        titulo: "🟢 Verde — Comunicação acolhedora",
        subtitulo: "PODE CONTINUAR",
        classe: "estado-verde",
        itens: [
            "Falar com respeito e clareza.",
            "Dar tempo para a pessoa responder.",
            "Utilizar imagens, textos e instruções objetivas.",
            "Respeitar as diferentes formas de comunicação."
        ]
    },
    amarelo: {
        titulo: "🟡 Amarelo — Atenção e adaptação",
        subtitulo: "OBSERVE E ADAPTE",
        classe: "estado-amarelo",
        itens: [
            "Verificar se a explicação foi compreendida.",
            "Reduzir informações excessivas na tela.",
            "Evitar estímulos visuais desnecessários.",
            "Oferecer alternativas de comunicação."
        ]
    },
    vermelho: {
        titulo: "🔴 Vermelho — Pare e reavalie",
        subtitulo: "EVITE ESSAS ATITUDES",
        classe: "estado-vermelho",
        itens: [
            "Não gritar ou pressionar para obter uma resposta.",
            "Não desrespeitar o tempo e os limites da pessoa.",
            "Não utilizar textos confusos ou difíceis de entender.",
            "Não presumir que todas as pessoas autistas são iguais."
        ]
    }
};

// Elementos do Semáforo
const botoesLuz = document.querySelectorAll(".luz-btn");
const painelExplicacao = document.getElementById("painel-explicacao");
const tituloStatus = document.getElementById("titulo-status");
const subtituloStatus = document.getElementById("subtitulo-status");
const listaOrientacoes = document.getElementById("lista-orientacoes");

// Evento de clique nos botões do semáforo
botoesLuz.forEach((botao) => {
    botao.addEventListener("click", () => {
        const corSelecionada = botao.getAttribute("data-cor");
        const info = dadosSemaforo[corSelecionada];

        // Atualiza estado aria-pressed para leitores de tela
        botoesLuz.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
        botao.setAttribute("aria-pressed", "true");

        // Atualiza classes visuais do painel
        painelExplicacao.className = `painel-explicacao ${info.classe}`;

        // Atualiza textos
        tituloStatus.textContent = info.titulo;
        subtituloStatus.textContent = info.subtitulo;

        // Preenche a lista de orientações
        listaOrientacoes.innerHTML = "";
        info.itens.forEach((texto) => {
            const li = document.createElement("li");
            li.textContent = texto;
            listaOrientacoes.appendChild(li);
        });
    });
});

// Lógica do Quiz Educativo
const formQuiz = document.getElementById("form-quiz");
const resultadoQuiz = document.getElementById("resultado-quiz");
const btnLimparQuiz = document.getElementById("btn-limpar-quiz");

const gabarito = {
    q1: "b",
    q2: "a",
    q3: "b"
};

formQuiz.addEventListener("submit", (evento) => {
    evento.preventDefault();

    let acertos = 0;
    const totalPerguntas = Object.keys(gabarito).length;
    let todasRespondidas = true;

    for (const pergunta in gabarito) {
        const opcaoMarcada = document.querySelector(`input[name="${pergunta}"]:checked`);
        if (!opcaoMarcada) {
            todasRespondidas = false;
            break;
        }
        if (opcaoMarcada.value === gabarito[pergunta]) {
            acertos++;
        }
    }

    resultadoQuiz.hidden = false;

    if (!todasRespondidas) {
        resultadoQuiz.textContent = "⚠️ Por favor, responda todas as 3 perguntas antes de verificar o resultado.";
        return;
    }

    if (acertos === totalPerguntas) {
        resultadoQuiz.textContent = `🎉 Parabéns! Você acertou ${acertos} de ${totalPerguntas} perguntas. Você domina os princípios da comunicação acessível!`;
    } else {
        resultadoQuiz.textContent = `Você acertou ${acertos} de ${totalPerguntas} perguntas. Revise o Semáforo Interativo acima e tente novamente!`;
    }
});

btnLimparQuiz.addEventListener("click", () => {
    formQuiz.reset();
    resultadoQuiz.hidden = true;
    resultadoQuiz.textContent = "";
});
