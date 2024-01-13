const { getShell } = require('../getShell');
const { platform } = require('node:process');

test('it selects the correct shell', async () => {
    const shell = getShell();
    switch (platform) {
        case 'win32':
            expect(shell).toBe('powershell.exe');
            break;
        case 'darwin':
            expect(shell).toBe('zsh');
            break;
        default:
            expect(shell).toBe('bash');
            break;
    }
});