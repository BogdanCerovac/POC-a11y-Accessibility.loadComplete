# POC-a11y-Accessibility.loadComplete
Proof of concept for Accessibility performance measurement - Accessibility.loadComplete

## Install

`npm ci` should do the trick (using same versions of dependencies as I did)

## Run

`npm start` will run a test on [WAI ARIA 1.2 spec.](https://www.w3.org/TR/wai-aria-1.2/) that is quite a large HTML document (also used in [Léonie Watson's talk at performance.now()](https://tetralogical.com/news/2022/10/27/l%C3%A9onie-watson-at-perfnow/)).

To check custom url you can use `node index.js https://example.com`.

## Output

```
Analyzing: https://www.w3.org/TR/wai-aria-1.2/
DOMContentLoaded_event: 7.343s
PageLoaded: 7.997s
Accessibility.loadComplete: 8.032s
PageLoaded-2-Accessibility.loadComplete: 34.715ms
```

## Tech. details

I've tested this on Windows 10 x64 Pro, but it should work as long as Puppeteer works

Initialized for (Google Lighthouse issue on GitHub about Accessibility performance)[https://github.com/GoogleChrome/lighthouse/issues/11049].

Key dependency - (Accessibility event loadComplete in Chrome Dev tools)[https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#event-loadComplete].