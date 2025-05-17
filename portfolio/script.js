const input = document.getElementById("input");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

let history = [];
let historyIndex = -1;

const CV_URL =
  "https://raw.githubusercontent.com/eolkazin/Portfolio-Lucas/main/assets/Cv_LucasGuerra.pdf";

const commands = {
  help: `
<pre class="cmd-block">📜 <strong>Available commands</strong>:
- <span class="cmd">about</span>: About me
- <span class="cmd">skills</span>: My skills
- <span class="cmd">projects</span>: Projects
- <span class="cmd">certificates</span>: Certificates
- <span class="cmd">contact</span>: Contact info
- <span class="cmd">social</span>: Social media
- <span class="cmd">download</span>: Download CV
- <span class="cmd">theme</span>: Toggle theme
- <span class="cmd">clear</span>: Clear terminal
- <span class="cmd">history</span>: Command history
- <span class="cmd">exit</span>: Exit terminal
- <span class="cmd">sudo</span>: Permission denied (just kidding)</pre>`,

  about: `
<pre class="cmd-block">👨‍💻 <strong>About me</strong>:
I'm Lucas Guerra, backend developer from Minas Gerais.
Focused on Python & Django with strong REST API skills.
Currently studying Analysis and Development of Systems (ADS).
Experienced in PostgreSQL, SQLite, Git, GitHub.
Passionate about clean, scalable code and solving problems fast.
Open to hybrid/presencial roles in BH metro area.
Check my GitHub for projects & contributions.</pre>`,

  skills: `
<pre class="cmd-block">🛠 <strong>Skills:</strong>
- Python (Django, REST APIs)
- HTML, CSS, JavaScript (básico)
- PostgreSQL, SQLite
- Git, GitHub
- Agile methodologies & teamwork</pre>`,

  projects: `
<pre class="cmd-block">📁 <strong>Projects:</strong>
- Task System: Django + SQLite, task manager CRUD
- Products API: Django REST + PostgreSQL, full API backend
- Visual CRUD: Frontend CRUD com HTML/CSS/JS</pre>`,

  certificates: `
<pre class="cmd-block">🎓 <strong>Udemy Certificates:</strong>
- Essential Python
- Django Masterclass
- Complete SQL
- Algorithms & Programming Logic</pre>`,

  contact: `
<pre class="cmd-block">📬 <strong>Contact:</strong>
📧 Email: <span class="highlight">lucasgueraa999@gmail.com</span>
📱 WhatsApp: <span class="highlight">(31) 98703-5797</span>
🌐 GitHub: <a href="https://github.com/eolkazin" target="_blank" class="link">eolkazin</a></pre>`,

  social: `
<pre class="cmd-block">🌐 <strong>Social Media:</strong>
🔗 LinkedIn: <a href="https://www.linkedin.com/in/lucas-guerra-85225826a/" target="_blank" class="link">lucasguerra-dev</a>
🔗 GitHub: <a href="https://github.com/eolkazin" target="_blank" class="link">eolkazin</a></pre>`,

  download: () => `
<pre class="cmd-block">⬇️ <strong>Resume:</strong>
<a href="${CV_URL}" target="_blank" download="LucasGuerra_Resume.pdf" class="link">Click here to download</a></pre>`,

  clear: () => {
    output.innerHTML = "";
    return "";
  },

  history: () => `<pre class="cmd-block">${history.join("\n")}</pre>`,

  theme: () => {
    const isDark = document.body.classList.toggle("dark-theme");
    return `<pre class="cmd-block">${
      isDark ? "🌑 Dark theme enabled." : "🌕 Light theme enabled."
    }</pre>`;
  },

  exit: `<pre class="cmd-block">👋 Closing terminal... See you!</pre>`,

  sudo: `<pre class="cmd-block">❌ Permission denied. You are not root 😎</pre>`,
};

function appendOutput(content, isHTML = false) {
  const div = document.createElement("div");
  div.classList.add("terminal-output");
  if (isHTML) div.innerHTML = content;
  else div.textContent = content;
  output.appendChild(div);
  requestAnimationFrame(() => {
    terminal.scrollTop = terminal.scrollHeight;
  });
}

function handleCommand(inputText) {
  const commandText = inputText.toLowerCase().trim();
  if (!commandText) return;

  appendOutput(`lucas@portfolio:~$ ${inputText}`);

  history.push(inputText);
  historyIndex = history.length;

  const command = commands[commandText];
  if (!command) {
    appendOutput(`Command not found: ${inputText}`);
    return;
  }

  if (commandText === "clear") {
    output.innerHTML = "";
    return;
  }

  if (commandText === "exit") {
    input.disabled = true;
  }

  const result = typeof command === "function" ? command() : command;
  appendOutput(result, true);
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCommand(input.value);
    input.value = "";
  }

  if (e.key === "ArrowUp") {
    if (historyIndex > 0) historyIndex--;
    input.value = history[historyIndex] || "";
    e.preventDefault();
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) historyIndex++;
    else historyIndex = history.length;
    input.value = history[historyIndex] || "";
    e.preventDefault();
  }
});
