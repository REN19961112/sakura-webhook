const express = require('express');
const app = express();

// Railwayで必要：PORTは環境変数から取得
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Webhookの受け口（LINEが叩いてくる場所）
app.post('/webhook', (req, res) => {
  console.log('✅ メッセージ受信:', req.body); // ← ログに出す
  res.sendStatus(200); // ← LINEに「OKだよ」って返す
});

// テスト用ルート（確認用）
app.get('/', (req, res) => {
  res.send('🌸 Sakura Webhook Running!');
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🌐 サーバー起動: http://localhost:${PORT}`);
});
