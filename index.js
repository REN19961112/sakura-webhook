const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.post('/webhook', (req, res) => {
  // ★ LINEのWebhook検証はレスポンスが早くないとタイムアウトする
  res.sendStatus(200);

  // あとでログだけ残す（これは後から処理でも問題ない）
  console.log('✅ メッセージ受信:', req.body);
});

app.get('/', (req, res) => {
  res.send('🌸 Sakura Webhook Running!');
});

app.listen(PORT, () => {
  console.log(`🌐 サーバー起動: http://localhost:${PORT}`);
});
