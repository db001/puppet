const puppeteer = require("puppeteer");

async function run() {
	const options = {
		headless: true,
	};

	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();

	process.on("unhandledRejection", (reason, p) => {
		console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
		browser.close();
	});

	await page.goto(
		"https://www.gov.uk/guidance/transport-measures-to-protect-the-uk-from-variant-strains-of-covid-19",
		{
			waitUntil: "domcontentloaded",
		}
	);

	await page.waitForSelector(".govspeak ul:first-of-type");

	const redlist = await page.$$eval(".govspeak ul:first-of-type li", (el) =>
		el.map((e) => {
			return e.innerText;
		})
	);

	// console.log(redlist);

	await browser.close();

	return redlist;
}

module.exports = run;
