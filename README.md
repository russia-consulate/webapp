<h1 align="center">Russia Consulate Bot WebApp</h1>

<div align="center">
  <video src="https://github.com/russia-consulate/webapp/assets/35740512/d691b0e1-a64a-4839-ac6c-ef8aa5cc132d" width="330" />
</div>

## Development

1. `cp .env.example .env`
2. `yarn dev`
3. The app is ready at https://192.168.1.127:3001

### Local settings

To open the Web App in your browser, you can mock the init_data value using the `DEV_INIT_DATA` env-variable. The value of init_data can be retrieved through the console inside the Web App in Telegram: `Telegram.WebApp.initData`.

### Bot setup

1. Go to [BotFather](https://t.me/botfather)
2. Create a new bot
3. Select the bot in the BotFather menu
4. Go to `Bot Settings` -> `Menu Button`
5. Choose any name and this link: https://192.168.1.127:3001
6. Now you can see a menu button that opens your Web App when clicked

### Certificate renewing

- Install [mkcert](https://github.com/FiloSottile/mkcert)
- Execute `yarn certs:generate`
