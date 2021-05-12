const express = require("express");
const run = require("./redlist");

const app = express();

let redlist = {};

const INTERVAL = 1000 * 60 * 10;

setInterval(async function () {
	const red = await run();
	redlist = red;
}, INTERVAL);

app.get("/", (req, res) => {
	res.send("hi");
});

app.get("/redlist", async (req, res) => {
	res.send(redlist);
});

const port = 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
