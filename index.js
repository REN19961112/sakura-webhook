const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 8080;

const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf; // 署名検証用に保存
  }
}));

app.post('/webhook', (req, res) => {
  // 署名チェック
  const signature = req.headers['x-line-signature'];
  const hash = crypto
    .createHmac('SHA256', LINE_CHANNEL_SECRET)
    .update(req.rawBody)
    .digest('base64');

  if (signature !== hash) {
    console.log('❌ 署名が一致しません');
    return res.sendStatus(403);
  }

  // ログ出力
  console.log('✅ メッセージ受信:', JSON.stringify(req.body));

  // LINEへ200応答
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('🌸 Sakura Webhook Running!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 サーバー起動: http://localhost:${PORT}`);
});
