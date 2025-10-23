# 🐑 RecapBot

RecapBot is a small locally hosted Discord bot that makes quick summaries of what's been happening in your server.  
If you’ve been away for a bit, just type /recap [hours] and it’ll show you the main topics, who’s been actively messaging, most used reactions/most reacted to message, shared links, and a preview image if anyone has sent an image.

---

## ✨ What it does
- Gives you a quick summary of recent messages.  
- Lists the most active users and common topics.  
- Counts reactions and shows the top ones.  
- Finds links, files, and image attachments.  
- Shows the most reacted message in the channel.  
- Uses a calm sheep theme 🐑 with soft blue colors.

---
## 🧩 BEFORE Getting Started
You can make your own little custom discord bot/app in https://discord.com/developers. You should customize it and make it your own for the full experience. Setting up this part beforehand is very VERY important as it is needed to get TWO of the IDs and will also make me very happy.

## 🧩 Getting started

### 1. Clone this repo or get it into your system however you do it
```bash
git clone https://github.com/YOUR-USERNAME/RecapBot.git
cd RecapBot
```

2. PLEASE install what it needs
```bash
npm install
```

3. Add you Discord server ID and stuff and write it down in the .env file
 - In the project folder, create a file or rename the .env.example file into .env and edit the info inside!!
```bash
DISCORD_BOT_TOKEN=[You get this id from the https://discord.com/developers site.]
APPLICATION_IDENTIFIER=[found in discord app dev thingy]
SERVER_IDENTIFIER=[with dev mode on, right click your server and click "copy id"]
```
🔒 Don’t share this file!! 🔒
It holds your bot token! It's already listed in .gitignore, so it won’t be uploaded to GitHub if you happen to remake this in a much more proffesional way. Anyway I recommend not touching it.

4. Run it
```bash
Commands in case you need them:
npm run deploy
nom run dev
```
and when you see
```bash
RecapBot is online as RecapBot#(idnumber)
```
ITS READY!!!

### ✨ Instruccions on Discord ✨ 
After giving the bot the necessarry permissions and inviting it to your server, type:
```bash
/recap [Hours] (delete the brackets)
```
And RecapBot will check the specified amount of hours of messages and send a "summary" embed that includes:
- How many messages were sent
- Who’s been the most active
- Which topics came up most
- What reactions were used
- The message with the most reactions
- Any links, files, or image previews it finds

🧵 Example

🐑 recap — #general (last 24h)
✨ summary
• messages: 58
• people: 12
• reactions: 145
• top: update, bug, idea, fix

🐾 activity
• most active: @alex (13), @mara (10), @leo (8)
• images: 2 • links: 4 • files: 1
• top reacts: 👍 × 57 · 🐑 × 16

📌 most reacted message
mara (14 reacts):

finally got the build working 🎉

🔗 links & files
🔗 https://github.com/project/update

📎 screenshot.png

🛠 Built with
- Node.js
- Discord.js
- TypeScript
- dotenv

### ☁️ Keeping it online!!!!
If you want the bot to stay online all the time, you can host it on a service like Render, Railway, or any VPS that supports Node.js.
I tested it and it should work as fully intended so it’ll stay active as long as you keep your terminal open.
This project was just made for fun and im not planning on hosting it elsewhere for the moment but that could change so...

📄 License

MIT License-you can use, edit, and improve RecapBot freely.
If you like it and do something of the sort to improve it PLEASE let me know so I can congratulate you for understanding this mess of a code. Giving credit is always appreciated 🐑
