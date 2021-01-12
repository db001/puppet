const puppeteer = require('puppeteer');


async function run() {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://www.tui.co.uk');

    const departures = 'input[name="Departure Airport"]';
    const date = 'input[name="Departure Date"]';

    await page.click(departures);

    const airports = page.waitForSelector('aria-label="airport list"')
        .then(async function () {
            await page.evaluate(() => {
                let airportsArr = [];
                let airports = document.querySelectorAll('.SelectAirports__listStyle .inputs__text');

                airports.forEach(el => {
                    airportsArr.push({
                        text: el.innerText
                    });
                });

                return airportsArr;
            });
        });

    console.log(airports);

    browser.close();
}

run();