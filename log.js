const fs = require('fs');
const path = require('path');

// ログを保存するファイルのパス
const logFilePath = path.join(__dirname, 'access.log');

/**
 * 訪問者のIPアドレスとアクセス日時をログに記録する関数
 * @param {string} ip - 訪問者のIPアドレス
 */
function logVisitorIP(ip) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] IP: ${ip}\n`;

    // コンソールに表示
    console.log(logMessage.trim());

    // access.log ファイルに追記
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('ログの保存に失敗しました:', err);
        }
    });
}

module.exports = { logVisitorIP };