const express = require("express");
const run = require("./redlist");

const app = express();

// const redlist = getRed();

// async function getRed() {
//     const red = await run();
//     return red;
// }

let redlist = [];

const INTERVAL = 1000 * 5;

setInterval(async function () {
	const red = await run();
	redlist = red;
	console.log(redlist);
}, INTERVAL);

app.get("/", (req, res) => {
	res.send("hi");
});

app.get("/redlist", async (req, res) => {
	res.send({ redlist });
});

const port = 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
