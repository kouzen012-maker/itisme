const express = require('express');
const path = require('path');
const { logVisitorIP } = require('./log');

const app = express();

const PORT = 80;

app.set('trust proxy', true);

app.use((req, res, next) => {
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const clientIp = rawIp ? rawIp.replace(/^.*:/, '') : '不明';

    logVisitorIP(clientIp);
    next();
});

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});