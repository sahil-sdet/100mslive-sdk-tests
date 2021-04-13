const { chromium } = require('playwright');


describe("feature foo", async() => {
  it("is working correctly", async () => {
    const browser = await chromium.launch({headless:false, args: ['--use-fake-device-for-media-stream']});
    const context = await browser.newContext({permissions: ["microphone"]});
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:8080');
    await new Promise(r => setTimeout(r, 40000));
    await browser.close();
  });
});
