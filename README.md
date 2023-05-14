# Installation
Command:
Starting App:
- npm i --legacy-peer-deps
- npm run start

Build:
- npm i --legacy-peer-deps
- npm run build

Because Node server have not config SSL certificate. So you need disable-security-web to run this source in chrome
If you using MacOS or Linux:
- You need open terminal and execute this command: open -na /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=""
- After that you can open chrome and run this app

If you using window: 
- First, type : window + R to open run
- Paste this line to Run: chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
- Enter to open chrome
- After that you can open chrome and run this app