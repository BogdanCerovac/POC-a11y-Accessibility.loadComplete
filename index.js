const puppeteer = require('puppeteer');

(async () => {
    const url = process.argv[2];
    if (!url) {
        throw "Please provide a URL as the first argument";
    }
    console.log("URL: ", url);

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url);
  const title = await page.title()
  console.log("Title of the page is: ", title)
  const snapshot = await page.accessibility.snapshot();
  console.log("snapshot");
  console.log(snapshot);
  /*

  I thought this would be possible, but it isn't;

  https://pptr.dev/api/puppeteer.accessibility.snapshot

  const loadComplete = await page.accessibility.loadComplete;
  console.log("loadComplete");
  console.log(loadComplete);
  
  */
  await browser.close()
})()