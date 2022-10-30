const puppeteer = require("puppeteer");

(async () => {
  const url = process.argv[2];
  if (!url) {
    throw "Please provide a URL as the first argument";
  }
  console.log("Analyzing: " + url);

  // setup browser
  const browser = await puppeteer.launch({
    devtools: true,
    headless: true,
  });
  const page = await browser.newPage();

  // clean state
  page.setCacheEnabled(false);

  // reach out to CDP;
  const client = await page.target().createCDPSession();

  // set network throttling to level up stats
  await client.send('Network.emulateNetworkConditions', {
    'offline': false,
    'downloadThroughput': 200 * 1024 / 8,
    'uploadThroughput': 200 * 1024 / 8,
    'latency': 200
  })

  // needed to listen for Accessibility.loadComplete
  await client.send("Accessibility.enable");

  // set up event listeners before runtime
 
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
  page.on("domcontentloaded", () => {
    console.timeEnd("DOMContentLoaded_event");
  });

  // CSS and images are now loaded
  page.on("load", () => {
    console.timeEnd("PageLoaded");
    console.time("PageLoaded-2-Accessibility.loadComplete");
  });

  // listen for Accessibility.loadComplete
  client.on("Accessibility.loadComplete", (data) => {
    console.timeEnd("Accessibility.loadComplete");
    // console.log('Accessibility.loadComplete', JSON.stringify(data))
    console.timeEnd("PageLoaded-2-Accessibility.loadComplete");
  });

 
  // stats init
  console.time("DOMContentLoaded_event");
  console.time("PageLoaded");
  console.time("Accessibility.loadComplete");

  // runtime - navigate to URL
  await page.goto(url);

  // finish
  await browser.close();
})();
