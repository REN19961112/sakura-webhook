const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('✅ メッセージ受信:', req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('🌸 Sakura Webhook Running!');
});

app.listen(PORT, () => {
  console.log(`🌐 サーバー起動: http://localhost:${PORT}`);
});
