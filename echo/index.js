const url = require('url')
require("now-env")
const axios = require("axios");

let telegram_url = "https://api.telegram.org/bot" + process.env.TELEGRAM_API_TOKEN +"/sendMessage";

// curl -F "url=https://echo-six.now.sh/webhook" https://api.telegram.org/bot572241835:AAF0iC2khD4Ti9gWOuuo_iELwlhxdaGjWeQ/setWebhook

const Telegraf = require("telegraf");
const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);
bot.telegram.setWebhook(process.env.WEBHOOK_URL);

bot.start(({ reply }) => reply("Hey there!"));
bot.command("help", ({ reply }) => reply("Help message"));
bot.command("about", ({ reply }) => reply("About message"));

bot.on("message", (ctx) => {
	ctx.reply('reply/' + ctx.message.text);
});

// bot.setWebhook(process.env.WEBHOOK_URL);

module.exports = (req, res) => {
	const urlString = url.parse(req.url, true)
	const path = urlString.pathname
	let reply = "Welcome to telegram weather bot";
	let body = ''

	req.on('data', data => {
		body += data
	})

	req.on('end', () => {
		if (path === '/') {
			res.write('Hello, it is Telegram bot.');
			res.writeHead(200);
			res.end()
		} else if (req.method !== 'POST' || path !== '/webhook') {
			res.writeHead(404);
			res.end()
		} else if (body !== '') {
			const telegramBody = JSON.parse(body);
			const message = telegramBody.message;
			bot.handleUpdate(telegramBody);
			res.writeHead(200);
			res.end();
		} else {
			res.writeHead(400);
			res.end()
		}
	})
}
