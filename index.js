const express = require('express');
const app = express();
const fetch = require('node-fetch'); // 追加が必要
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.post('/webhook', async (req, res) => {
  res.sendStatus(200); // LINE用即レス

  console.log('✅ メッセージ受信:', req.body);

  // 👇 エアテーブル検索モジュールに渡す
  try {
    const response = await fetch('https://sakura-airtable-user-search-modules-production.up.railway.app/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: req.body.events?.[0]?.source?.userId || 'unknown',
        message: req.body.events?.[0]?.message?.text || ''
      })
    });

    const result = await response.json();
    console.log('🔁 次モジュールからの返答:', result);

  } catch (error) {
    console.error('❌ 次モジュールへの転送失敗:', error);
  }
});

app.get('/', (req, res) => {
  res.send('🌸 Sakura Webhook Running!');
});

app.listen(PORT, () => {
  console.log(`🌐 サーバー起動: http://localhost:${PORT}`);
});
