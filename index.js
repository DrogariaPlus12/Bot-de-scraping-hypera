const puppeter = require('puppeteer');

async function start() {
     async function loadMore(page, selector){
          const moreButton = await page.$(selector)
          if(moreButton) {
              more = console.log('More');
              await moreButton.click();
              await loadMore(page, selector)
      }
      
          }

async function getComments(page, selector){ 
    const comments = await page.$$eval(selector, links => links.map(link => link.innerText))
    return comments
}

const browser = await puppeter.launch({headless: false});
const page = await browser.newPage();
// Acessa o site
await page.setDefaultNavigationTimeout(0); //Acessa a página sem esperar o timeout
await page.goto('https://parceirohypera.com.br');
await page.waitForSelector('input[name="usr"]');
await page.type('input[name="usr"]', '',{delay:100}); // Email
await page.type('input[name="psw"]', '', {delay:100}); // Senha
 await page.keyboard.press('Enter');  // Clica no botão de login
 await page.waitForNavigation();
 await page.goto('https://parceirohypera.com.br/ItensProdutoPedido');
const comments = await getComments(page,'#DataTables_Table_0 > tbody > tr:nth-child(1) > td.colProduto.pb-4 > div.row.mb-2 > div.col-sm > div:nth-child(2) > a');
const comments2 = await getComments(page,'#DataTables_Table_0 ');
 await loadMore(page, '#DataTables_Table_0_next');
console.log(comments);
console.log(comments2);
await browser.close();
}

start();
