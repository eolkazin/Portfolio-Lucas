const input = document.getElementById("input");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");
let history = [];
let historyIndex = -1;

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

  certificates: `Udemy:
- Python Essencial
- Django Masterclass
- SQL Completo
- Algoritmos & Lógica de Programação`,

  contact: `📧 Email: lucasgueraa999@gmail.com
📱 WhatsApp: (31) 98703-5797
🌐 GitHub: github.com/eolkazin`,

  social: `🔗 LinkedIn: linkedin.com/in/lucasguerra-dev
🔗 GitHub: github.com/eolkazin`,

  download: `🎯 Baixe meu currículo: [simulado]
Abra o console do navegador e digite:
window.open("https://github.com/eolkazin", "_blank")`,

  clear: () => {
    output.innerHTML = "";
  },

  history: () => {
    return history.join("\n");
  },

  theme: () => {
    document.body.style.background =
      document.body.style.background === "black" ? "#111" : "black";
    return "Tema alternado.";
  },

  exit: "Encerrando terminal... Até mais!",

  sudo: "Permissão negada. Você não é root 😎",
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    history.push(cmd);
    historyIndex = history.length;
    output.innerHTML += `<div><span class="prompt">lucas@portfolio:~$</span> ${cmd}</div>`;

    if (commands[cmd]) {
      const response =
        typeof commands[cmd] === "function" ? commands[cmd]() : commands[cmd];
      output.innerHTML += `<pre>${response}</pre>`;
    } else {
      output.innerHTML += `<pre>Comando não encontrado: ${cmd}</pre>`;
    }

    input.value = "";
    terminal.scrollTop = terminal.scrollHeight;
  }

  // Navegar histórico ↑↓
  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
  }
  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      input.value = "";
    }
  }
});
