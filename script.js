const outputDiv = document.getElementById("output");
const userInput = document.getElementById("user-input");
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let matrixEffect = false;

// System info for Matrix command
const systemInfo = [
    () => `CPU Usage: ${Math.random().toFixed(2) * 100}%`,
    () => `Memory Usage: ${Math.floor(Math.random() * 80) + 20}GB`,
    () => `Disk Read: ${Math.floor(Math.random() * 500)} MB/s`,
    () => `Disk Write: ${Math.floor(Math.random() * 500)} MB/s`,
    () => `Temperature: ${Math.floor(Math.random() * 40) + 40}°C`,
    () => `Network Speed: ${Math.floor(Math.random() * 1000)} Mbps`,
    () => `Uptime: ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`
];

// Matrix rain effect
function startMatrixEffect() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }).fill(1);

    function drawMatrix() {
        if (!matrixEffect) return;

        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#33ff33";
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, x) => {
            const text = systemInfo[Math.floor(Math.random() * systemInfo.length)]();
            ctx.fillText(text, x * fontSize, y * fontSize);

            if (y * fontSize > canvas.height || Math.random() > 0.975) {
                drops[x] = 0;
            }
            drops[x]++;
        });

        requestAnimationFrame(drawMatrix);
    }

    matrixEffect = true;
    drawMatrix();
}

function stopMatrixEffect() {
    matrixEffect = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Simulated commands
const commands = {
    help: `Supported commands:
    - help: List all commands
    - dir: List directories and files
    - dir /s: Recursive directory listing
    - cls: Clear the terminal
    - echo [text]: Output the text
    - date: Show the current date and time
    - ver: Show version info
    - matrix: Start tech-themed Matrix rain effect
    - stop: Stop Matrix effect
    - mkdir [name]: Create a new directory
    - del [name]: Delete a file or directory
    - exit: Close the terminal simulation`,
    dir: `Volume in drive C has no label.
Directory of C:\\

01/06/2025  01:30 PM    <DIR>          Users
01/06/2025  01:30 PM    <DIR>          Program Files
01/06/2025  01:30 PM    <DIR>          Windows
01/06/2025  01:30 PM               0   file.txt`,
    ver: `Windows Terminal Emulation - Version 2.0 (GitHub Pages)`
};

// Execute commands
function executeCommand(input) {
    const args = input.split(" ");
    const cmd = args[0].toLowerCase();
    const params = args.slice(1).join(" ");

    switch (cmd) {
        case "help":
            appendOutput(commands.help);
            break;
        case "dir":
            appendOutput(commands.dir);
            break;
        case "dir /s":
            appendOutput("Simulating recursive directory listing...\n\n" + commands.dir);
            break;
        case "cls":
            outputDiv.innerHTML = "";
            break;
        case "echo":
            appendOutput(params || " ");
            break;
        case "date":
            appendOutput(new Date().toString());
            break;
        case "ver":
            appendOutput(commands.ver);
            break;
        case "matrix":
            appendOutput("Starting tech-themed Matrix effect...");
            startMatrixEffect();
            break;
        case "stop":
            appendOutput("Stopping Matrix effect...");
            stopMatrixEffect();
            break;
        case "mkdir":
            appendOutput(`Created directory: ${params || "new_folder"}`);
            break;
        case "del":
            appendOutput(`Deleted: ${params || "unknown_item"}`);
            break;
        case "exit":
            appendOutput("Terminal session ended.");
            userInput.disabled = true;
            break;
        default:
            appendOutput(`'${cmd}' is not recognized as an internal or external command.`);
    }
}

// Append output to terminal
function appendOutput(text) {
    const newLine = document.createElement("div");
    newLine.textContent = text;
    outputDiv.appendChild(newLine);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Handle user input
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const input = userInput.value.trim();
        appendOutput(`> ${input}`);
        executeCommand(input);
        userInput.value = "";
    }
});
