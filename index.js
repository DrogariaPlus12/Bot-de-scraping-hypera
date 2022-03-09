const fs = require('fs')
const puppeteer = require("puppeteer-extra")
const pluginStealth = require("puppeteer-extra-plugin-stealth")
const _ = require('lodash')
const XLSX = require('xlsx')

puppeteer.use(pluginStealth())

puppeteer.launch({ 
    headless:false,
    args: ['--start-maximized']
  }).then( async browser => {  
  const page = await browser.newPage()
  
  page.setDefaultNavigationTimeout(0); //Acessa a página sem esperar o timeout
  await page.goto('https://parceirohypera.com.br');
  
  await page.waitForSelector('input[name="usr"]');
  
  await page.type('input[name="usr"]', 'LOGIN',{delay:100}); // Email
  
  await page.type('input[name="psw"]', 'SENHA', {delay:100}); // Senha
  
  await page.keyboard.press('Enter');  // Clica no botão de login
  
   await page.waitForNavigation();
   
   await page.goto('https://parceirohypera.com.br/ItensProdutoPedido');
   
  await page.click('#prosseguirPolitCookie');
  // captcha google
  
  const fileData = []

  async function getData() {
    async function getComments(page, selector){ 
        const comments = await page.$$eval(selector, links => links.map(link => link.innerText))
        return comments
    }   //Acessa o site
    for (let clicou = 0; clicou < 59; clicou++) {
        const comments = await getComments(page,'#DataTables_Table_0 > tbody');
        await page.click('#DataTables_Table_0_next > a');
        await page.waitForTimeout(500);
        console.log(comments);
        fileData.push(comments)    
    }  //Acessa o site 
    await browser.close()
  }
  await getData()

  const flattenFileData = _.flattenDeep(fileData)
  const flattenAndSeparatedFileData = _.chunk(flattenFileData, 5)

  fs.writeFile(
    './data.json',
    JSON.stringify(flattenAndSeparatedFileData, null, 2),
    function (err) {
      if (err) throw err
      console.log('Arquivo Gerado')
    }
  )

  const workSheet = XLSX.utils.json_to_sheet(flattenAndSeparatedFileData)
  const wb = XLSX.utils.book_new()
  
  XLSX.utils.book_append_sheet(wb, workSheet, 'info_extract')
  XLSX.writeFile(wb, 'dados.xlsb')
})
