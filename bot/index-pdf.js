const pupeeteer = require('puppeteer');

 (async () => {
        const browser = await pupeeteer.launch();
        const page = await browser.newPage();
        
        await page.goto('https://github.com/joseliodm');
        await page.pdf({path: 'git.pdf', format: 'A4'});

        browser.close();
})();