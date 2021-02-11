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


    await page.waitForSelector('.ct-quick-info__abilities .ct-quick-info__ability .ddbc-ability-summary__label', {
            visible: true
        })

    // const abilities = await page.$eval('.ct-quick-info__abilities .ct-quick-info__ability .ddbc-ability-summary__label',
    //     element => element.innerText
    // )

    const abilities = await page.$eval('.ct-quick-info__abilities .ct-quick-info__ability .ddbc-ability-summary__label',
        e => e.innerHTML
    );

    console.log(abilities)

    await page.waitForSelector('.ddbc-character-name', {
        visible: true
    })

    const name = await page.$eval('.ddbc-character-name',
        el => el.textContent
    );

    console.log(name)


    // await page.waitForSelector('.ct-quick-info__abilities .ct-quick-info__ability .ddbc-ability-summary__label', {
    //     visible: true
    // });

    // const abilities = await page.$$eval('.ddbc-ability-summary .ddbc-ability-summary__heading',
    //     el => el.textContent
    // )

    // const abilities = await page.evaluate(() =>
    //     Array.from(
    //         document.querySelectorAll('.ddbc-ability-summary .ddbc-ability-summary__heading')
    //     ),
    //     el => {
    //         console.log(el)
    //         return el.textContent
    //     }
    // )

    // console.log(abilities);

    await browser.close();
}

run();