const puppeteer = require("puppeteer");

(async () => {
  const url = process.argv[2];
  if (!url) {
    throw "Please provide a URL as the first argument";
  }
  console.log("Analyzing ", url);

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    devtools: true,
  });

  const page = await browser.newPage();
  page.setCacheEnabled(false);

  // reach out to CDP;
  const client = await page.target().createCDPSession();

  //console.log(client)

  await client.send("Accessibility.enable");

  //await client.send('Accessibility.loadComplete');
  client.on("Accessibility.loadComplete", (data) => {
    console.timeEnd("Accessibility.loadComplete");
    // console.log('Accessibility.loadComplete', JSON.stringify(data))
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
  page.on("domcontentloaded", () => {
    console.timeEnd("DOMContentLoaded_event");
  });

  page.on("load", () => {
    console.timeEnd("PageLoaded");
  });

  console.time("PageLoaded");
  console.time("Accessibility.loadComplete");
  console.time("DOMContentLoaded_event");
  await page.goto(url);

  // const title = await page.title();

  //console.log("Title of the page is: ", title)
  // const snapshot = await page.accessibility.snapshot();
  //console.log("snapshot");
  //console.log(snapshot);
  /*
  
    I thought this would be possible, but it isn't;
  
    https://pptr.dev/api/puppeteer.accessibility.snapshot
  
    const loadComplete = await page.accessibility.loadComplete;
    console.log("loadComplete");
    console.log(loadComplete);
    
    */

  await browser.close();
})();
