const puppeteer = require('puppeteer');

async function run() {

    const options = {
        headless: true,
        defaultViewport: null,
        args: ['--window-size=1920,1080']
    }

    const browser = await puppeteer.launch(options);

    const page = await browser.newPage();

    process.on('unhandledRejection', (reason, p) => {
        console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
        browser.close();
    });

    await page.goto('https://www.dndbeyond.com/characters/43076524/O5pBIQ', {
        waitUntil: 'domcontentloaded'
    });

    const char = {};

    await page.waitForSelector(
        '.ct-quick-info__abilities .ct-quick-info__ability .ddbc-ability-summary__label', {
        visible: true
    })

    await page.waitForSelector('.ddbc-character-name', {
        visible: true
    })

    const name = await page.$eval('.ddbc-character-name',
        el => el.textContent
    );

    console.log(name);

    char.name = name;

    const abilities = await page.$$eval('.ddbc-ability-summary',
        el => el.map(e => {
            return {
                attr: e.querySelector('.ddbc-ability-summary__label').textContent,
                mod: `${e.querySelector('.ddbc-signed-number__sign').textContent}${e.querySelector('.ddbc-signed-number__number').textContent}`,
                total: e.querySelector('.ddbc-ability-summary__secondary').textContent
            }
        })
    )
    /* Returns array of headings - yay! */

    char.abilities = abilities;

    // console.log(abilities);

    const initiative = await page.$eval('.ct-initiative-box__value',
        el => {
            return el.querySelector('.ddbc-signed-number__sign').textContent + el.querySelector('.ddbc-signed-number__number').textContent;
        }
    )

    char.initiative = initiative;

    console.log(char);

    await browser.close();
}

run();