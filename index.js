const puppeter = require('puppeteer'); 

async function start() {

const browser = await puppeter.launch({headless: false} );
const page = await browser.newPage();
// Acessa o site
page.setDefaultNavigationTimeout(0); //Acessa a página sem esperar o timeout
await page.goto('https://www.parceirohypera.com.br/Campanha');
await page.click('#prosseguirPolitCookie');
await page.waitForSelector('input[name="usr"]');

await page.type('input[name="usr"]', '15986565000167',{delay:100}); // Email

await page.type('input[name="psw"]', '', {delay:100}); // Senha

await page.keyboard.press('Enter');  // Clica no botão de login


await page.waitForNavigation();

const rotina = () => {
    let nome = await page.$$eval('div.row.col-12 > div.col-8 > div:nth-child(2) > div:nth-child(1) > div', links => links.map(link => link.innerText.trim()));
    let codigo = await page.$$eval(' div.row.col-12 > div.col-8 > div:nth-child(2) > div:nth-child(2) > div', links => links.map(link => link.innerText.trim()));
    let preco = await page.$$eval('div.row.col-12 > div.col-8 > div:nth-child(2) > div:nth-child(3) > div', links => links.map(link => link.innerText.trim()));
    let desconto = await page.$$eval('div.row.col-12 > div.col-8 > div:nth-child(2) > div:nth-child(4) > div', links => links.map(link => link.innerText.trim()));
    return rotina();
}

        await page.waitForTimeout('8000');

            await page.evaluate(() => {
                document.querySelector("#\\33 139 > div > a").click();
            }).catch(error => { console.log(error) }); // Clica no botão de campanhas
                
                await page.waitForTimeout('5000');
                rotina();
                await page.evaluate(() => {
                    document.querySelector("div.row.mt-5.mb-4 > div > a").click();
                })   

        await page.waitForTimeout('8000');

        await page.evaluate(() => {
            document.querySelector("#\\33 139 > div > a").click();
        }).catch(error => { console.log(error) }); // Clica no botão de campanhas
            
            await page.waitForTimeout('5000');
            rotina();
            await page.evaluate(() => {
                document.querySelector("div.row.mt-5.mb-4 > div > a").click();
            })    

const prints = [nome, codigo, preco, desconto]; 
//tranformando em xlsx
const xlsx = require('xlsx');
//organizando o array
const array = prints.map(item => [item]);
//criando o arquivo
const wb = xlsx.utils.book_new();
//criando a planilha
const ws = xlsx.utils.aoa_to_sheet(array);
//adicionando a planilha ao arquivo
xlsx.utils.book_append_sheet(wb, ws, 'Campanhas');
//colocando data no nome do arquivo
const date = new Date( Date.now() );
//salvando o arquivo

xlsx.writeFile(wb,'Promoções_'+date.getDate()+'_'+date.getMonth()+'_'+date.getFullYear()+'.xlsx');



await browser.close();
}
    

start()
