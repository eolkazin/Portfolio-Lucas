const input = document.getElementById("input");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

let history = [];
let historyIndex = -1;

const CV_URL = "https://github.com/eolkazin/raw/main/curriculo.pdf"; // link direto para o PDF do currículo

const commands = {
  help: `Comandos disponíveis:
- about: Sobre mim
- skills: Minhas habilidades
- projects: Projetos
- certificates: Certificados
- contact: Contato
- social: Redes sociais
- download: Baixar currículo
- theme: Alternar tema
- clear: Limpar terminal
- history: Histórico de comandos
- exit: Encerrar
- sudo: Acesso negado (brincadeira)
`,

  about: `Sou Lucas Guerra, Dev backend com foco em Python, Django e APIs REST. Estudante de ADS e apaixonado por resolver problemas com código.`,

  skills: `Python, Django, HTML, CSS, JavaScript, PostgreSQL, SQLite, Git, GitHub, RESTful APIs`,

  projects: `Projetos:
- Sistema de Tarefas (Django + SQLite)
- API de Produtos (Django REST + PostgreSQL)
- CRUD Visual (HTML/CSS/JS)`,

  certificates: `Certificados Udemy:
- Python Essencial
- Django Masterclass
- SQL Completo
- Algoritmos & Lógica de Programação`,

  contact: `📧 Email: lucasgueraa999@gmail.com
📱 WhatsApp: (31) 98703-5797
🌐 GitHub: https://github.com/eolkazin`,

  social: `🔗 LinkedIn: https://linkedin.com/in/lucasguerra-dev
🔗 GitHub: https://github.com/eolkazin`,

  download: () => {
    // Gera link clicável para baixar o currículo
    return `🎯 Clique para baixar meu currículo: 
<a href="${CV_URL}" target="_blank" download="LucasGuerra_Curriculo.pdf" style="color:#ff5555; text-decoration:underline;">Download CV</a>`;
  },

  clear: () => {
    output.innerHTML = "";
    return "";
  },

  history: () => history.join("\n"),

  theme: () => {
    const isDark = document.body.classList.toggle("dark-theme");
    return isDark ? "Tema escuro ativado." : "Tema claro ativado.";
  },

  exit: "Encerrando terminal... Até mais!",

  sudo: "Permissão negada. Você não é root 😎",
};

// Função para adicionar saída formatada no terminal
function appendOutput(text, isHTML = false) {
  const div = document.createElement("div");
  div.classList.add("terminal-output");
  if (isHTML) div.innerHTML = text;
  else div.textContent = text;
  output.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

// Evento principal do input
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    if (!cmd) return;

    // Salvar no histórico
    history.push(cmd);
    historyIndex = history.length;

    appendOutput(`lucas@portfolio:~$ ${cmd}`);

    const command = commands[cmd.toLowerCase()];

    if (command) {
      const result = typeof command === "function" ? command() : command;
      appendOutput(result, typeof command === "function" && cmd === "download");
      if (cmd === "clear") output.innerHTML = "";
      if (cmd === "exit") input.disabled = true;
    } else {
      appendOutput(`Comando não encontrado: ${cmd}`);
    }

    input.value = "";
  }

  // Navegação no histórico
  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
    e.preventDefault();
  }
  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = "";
    }
    e.preventDefault();
  }
});
