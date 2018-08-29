# Slackmojize

https://jamsinclair.nz/slackmojize

Slack emoji uploads used to be quite restrictive:
> Image can't be larger than 128px in width or height, and must be smaller than 64K in file size.

To make this resize process easier I made this simple tool to resize emoji to be suitable for upload. 

ℹ️ Slack has now updated there emoji creation form to allow larger files. Their servers then try and resize the files correctly. For one off emoji creation, especially gifs, their form is a faster approach.

The app can batch resize jpgs and pngs in your browser entirely clientside. Gif support pending, trickier to do in the browser.

To run the app locally:
```shell
yarn install && yarn start
# or npm install && npm start
```
