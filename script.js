particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    color: { value: "#00ff00" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: 2 },
    move: { enable: true, speed: 2.5 },
  },
  interactivity: { detect_on: "canvas" },
});

const btn = document.getElementById("enterBtn");
const term = document.getElementById("terminal");
const loadingSection = document.getElementById("loadingSection");
const loadingText = loadingSection.querySelector("span");
const cmdInput = document.getElementById("cmd");
const beep = document.getElementById("beep");
const cursor = document.getElementById("custom-cursor");
const output = document.getElementById("output");

const bootTexts = [
  "Booting up virtual environment...",
  "BIOS check: OK",
  "Loading Linux kernel 5.15.0 ... done.",
  "Decrypting data partition ... success.",
  "Mounting root filesystem ... done.",
  "Initializing services ...",
  "[ OK ] SSH daemon started",
  "[ OK ] Web server initialized",
  "[ OK ] Database engine online",
  "Launching Lucas' personal system ...",
  "===============================",
  ">>> ACCESS GRANTED <<<",
  "===============================",
];

const infoTexts = [
  "User: lucas",
  "Device: Alienware-X1",
  "Processor: Xeon E5 2680 v4 @ 3.6GHz",
  "Memory: 16GB DDR4 RAM (3200 MHz)",
  "Storage: 480GB NVMe SSD (Read: 3500 MB/s)",
  "OS: LK_sys 20.04 LTS (Kernel 5.15.0)",
  "Network: 192.168.0.102 (Online, 1Gbps)",
  "GitHub Sync: Connected (Auto-Push Enabled)",
  "Docker Containers: 5 Running",
  "API Endpoints: 12 Active",
  "Last Login: 2025-05-16 03:42",
  "System ready. Type 'start-portfolio' to launch.",
];

function playBeep() {
  beep.currentTime = 0;
  beep.play();
}

function typeLine(line, container, delay = 10) {
  // 10ms por caractere
  return new Promise((resolve) => {
    let i = 0;
    function typeChar() {
      if (i < line.length) {
        container.textContent += line[i];
        playBeep();
        i++;
        container.scrollTop = container.scrollHeight;
        setTimeout(typeChar, delay);
      } else {
        container.textContent += "\n";
        resolve();
      }
    }
    typeChar();
  });
}

async function printLines(lines, container, delay = 100) {
  // 100ms entre linhas
  for (const line of lines) {
    await typeLine(line, container);
    await new Promise((r) => setTimeout(r, delay));
  }
}

async function startBootSequence() {
  btn.classList.add("fade-out");
  setTimeout(() => {
    btn.style.display = "none";
    term.style.display = "flex";
  }, 300); // deixa o fade mais rápido também

  output.textContent = "";

  await new Promise((r) => setTimeout(r, 300)); // delay inicial reduzido
  await printLines(bootTexts, output, 300);
  await new Promise((r) => setTimeout(r, 500));
  await printLines(infoTexts, output, 150);

  cmdInput.style.display = "inline-block";
  cmdInput.focus();
}

cmdInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = cmdInput.value.trim().toLowerCase();
    if (cmd === "start-portfolio") {
      loadingText.textContent = "Indo para portfolio...";
      loadingSection.style.display = "flex";
      cmdInput.disabled = true;

      setTimeout(() => {
        // Altere a URL para seu portfolio real
        window.location.href = "/portfolio/portfolio.html";
      }, 2500);
    } else {
      // Comando inválido, avisa no terminal
      output.textContent += `> ${cmd}\nComando não reconhecido.\n`;
      cmdInput.value = "";
      output.scrollTop = output.scrollHeight;
    }
  }
});

btn.addEventListener("click", startBootSequence);

// Cursor custom
document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

document.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});
