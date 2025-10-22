import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const catho = await browser.newPage();
  //const chat = await browser.newPage();
  
  await catho.goto("https://seguro.catho.com.br/signin/");
  //await chat.goto("https://chat.openai.com/auth/login");

  await new Promise(r => setTimeout(r, 3000));

  await catho.setViewport({ width: 1080, height: 1024 });
  //await chat.setViewport({ width: 1080, height: 1024 });

  await new Promise(r => setTimeout(r, 300));

  await catho.type('input[name="email"]', 'meu-email@gmail.com');
  await catho.type('input[name="password"]', 'minhaSenha');
  //await catho.click('button[type="submit"]');

  await new Promise(r => setTimeout(r, 90000));

  await catho.screenshot({ path: 'example.png' });
  //await chat.screenshot({ path: 'example2.png' });

  await browser.close();
})();
