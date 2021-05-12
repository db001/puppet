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

	await page.goto("https://www.gov.uk/guidance/red-amber-and-green-list-rules-for-entering-england", {
		waitUntil: "domcontentloaded",
	});

	await page.waitForSelector("#red-list-of-countries-and-territories + table tr th[scope='row']");

	const redlist = await page.$$eval("#red-list-of-countries-and-territories + table tr th[scope='row']", (el) =>
		el.map((e) => {
			return e.innerText;
		})
	);

	const amberlist = await page.$$eval("#amber-list-of-countries-and-territories + table tr th[scope='row']", (el) =>
		el.map((e) => {
			return e.innerText;
		})
	);

	const greenlist = await page.$$eval(
		"[id*='green-list-of-countries-and-territories'] + table tr th[scope='row']",
		(el) =>
			el.map((e) => {
				return e.innerText;
			})
	);

	const obj = {
		red: redlist,
		amber: amberlist,
		green: greenlist,
	};

	await browser.close();

	return obj;
}

module.exports = run;
