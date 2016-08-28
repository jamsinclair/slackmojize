# Slackmoji

Slack emoji uploads are restrictive:
> Image can't be larger than 128px in width or height, and must be smaller than 64K in file size.
> - https://get.slack.help/hc/en-us/articles/206870177-Creating-custom-emoji

To make this resize process easier I made this very simple and hacky web tool.

Hopefully this makes it easier to quickly resize images and upload to Slack :smile_cat:

I'm hackily piggy backing on the free image resize API over at http://img-resize.com/, to resize the images for me. My app is merely a simple web client that proxies the resize requests to that API.

To run the app locally:
`npm install && npm start`
