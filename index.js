const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('✅ メッセージ受信:', JSON.stringify(req.body));
  res.sendStatus(200); // LINEが200を受け取らないと再送する
});

app.get('/', (req, res) => {
  res.send('🌸 Sakura Webhook Running!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 サーバー起動: http://localhost:${PORT}`);
});
