const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/log-entry-click', async (req, res) => {
  const { fullName, entry, timestamp, linkHref } = req.body;

  const webhookUrl = 'https://hooks.slack.com/services/XXX/YYY/ZZZ'; // Replace with yours
  const message = {
    text: `:mag: *${fullName}* clicked: *${entry}*\nTime: ${timestamp}\nLink: ${linkHref}`,
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    res.status(200).send('Message sent to Slack');
  } catch (err) {
    console.error('Slack error:', err);
    res.status(500).send('Error sending to Slack');
  }
});

app.get('/', (req, res) => res.send('Slack Proxy is Running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
