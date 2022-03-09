const pupeeteer = require('puppeteer');

(async () => {
    const browser = await pupeeteer.launch(
        {headless: false}
    );
    const page = await browser.newPage();
    await page.goto('https://github.com/joseliodm');
    await page.screenshot({path: 'git.png'});
    browser.close();
})();