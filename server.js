const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth', (req, res) => {
    const { playerName, password, email } = req.body;
    
    console.log('Nick:', playerName);
    console.log('Hasło:', password);
    console.log('Email:', email);
    
    // Tutaj możesz zalogować w bazę, Discord, itp.
    
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
