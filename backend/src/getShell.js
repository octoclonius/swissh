const os = require("node:os");

const getShell = () => {
    switch (os.platform()) {
        case "win32":
            return "powershell.exe";
        case "darwin":
            return "zsh";
        default:
            return "bash";
    }
};

module.exports = {
    getShell,
};