
# POC-a11y-Accessibility.loadComplete
Proof of concept for Accessibility performance measurement - Accessibility.loadComplete

## Preword

I don't know if this is the right methodology, would need to check it from the screen-reader side to be more confident.
Possibly NVDA could be used to check that out, but that would require NVDA, Python and probably C++ to make possible (out of my scope).
In theory the loadComplete should do the trick, but it needs to be verified (considering it's internals) - a big TODO that I didn't dig in yet.

(*The loadComplete event mirrors the load complete event sent by the browser to assistive technology when the web page has finished loading.*)

**Probably best for the authors of Accessibility.loadComplete to comment if it can be used as a stable metric...**


## Install

`npm ci` should do the trick (using same versions of dependencies as I did).

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

### Short notes on PageLoaded-2-Accessibility.loadComplete

PageLoaded-2-Accessibility.loadComplete starts measuring when PageLoaded ends and ends measuring when Accessibility.loadComplete ends.
**The values of empiric tests seems off, so I guess the methodology isn't any good.**
Possibly we need to substract PageLoaded values from Accessibility.loadComplete values (?).
TBD & TODO.

## Tech. details

I've tested this on Windows 10 x64 Pro, but it should work everywhere as long as Puppeteer works there.

Bandwidth and CPU are limited to make test results on different networks and hardware more similar. Seems like hardware throttling can't really be unified (as we are only allowed to factor down on existing CPU, so - *it depends (tm)*). 

Initialized for [Google Lighthouse issue on GitHub about Accessibility performance](https://github.com/GoogleChrome/lighthouse/issues/11049).

Key dependency - [Accessibility event loadComplete in Chrome Dev tools](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#event-loadComplete).
