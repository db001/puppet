const puppeteer = require('puppeteer');
const url = process.argv[2];
if (!url) {
    throw 'Please provide URL as a first argument';
}
async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const id = Date.now();
    const path = `screenshots/screenshot${id}.png`;
    await page.goto(url);
    await page.screenshot({ path });
    browser.close();
}
run();
