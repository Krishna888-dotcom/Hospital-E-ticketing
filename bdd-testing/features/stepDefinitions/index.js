const { expect } = require("chai");
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { Builder, By, Key, until, sleep, WebElement } = require("selenium-webdriver");
const { delay } = require("../utils/delay");

Given("Test registration functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.name("registrationForm")).click();
  await driver.findElement(By.name("firstName")).sendKeys("test");
  await driver.findElement(By.name("lastName")).sendKeys("test");
  await driver.findElement(By.name("email")).sendKeys("test@gmail.com");
  await driver.findElement(By.name("userName")).sendKeys("test");
  await driver.findElement(By.name("phoneNumber")).sendKeys("9860999888");
  await driver.findElement(By.name("address")).sendKeys("test");     
  await driver.findElement(By.name("password")).sendKeys("test1234");
  await driver.findElement(By.name("confirmPassword")).sendKeys("test1234");
  await driver.sleep(delay);
  await driver.findElement(By.name("register")).click();
  await driver.wait(until.elementLocated(By.id("loginForm")), 30000);
  expect(await driver.wait(until.elementLocated(By.id("loginForm"))));
  await driver.quit();
});

Given("Test login functionality", { timeout: 30000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.name("userName")).sendKeys("admin");
  await driver.findElement(By.name("password")).sendKeys("123456789");
  await driver.sleep(delay);
  await driver.findElement(By.name("login")).click();
  await driver.wait(until.elementLocated(By.className("divider")), 30000);
  expect(await driver.wait(until.elementLocated(By.className("divider"))));
});

Given("Test addHospital functionality", { timeout: 60000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.name('userName')).sendKeys('admin');
  await driver.findElement(By.name('password')).sendKeys('123456789');
  await driver.sleep(delay);
  await driver.findElement(By.name("login")).click();
  await driver.sleep(delay);
  await driver.findElement(By.name("hospital")).click();
  await driver.sleep(delay);
  await driver.findElement(By.name("hopitaladd")).click();
  await driver.sleep(delay);
  await driver.findElement(By.name("hospitalName")).sendKeys("test Hospital");
  await driver.findElement(By.name("emailAddress")).sendKeys("testhospital@gmail.com");
  await driver.findElement(By.name("location")).sendKeys("Kathmandu");
  await driver.findElement(By.name("personName")).sendKeys("my hospital");
  await driver.findElement(By.name("hospitalImage")).isSelected();
  await driver.findElement(By.name("mobileNumber")).sendKeys("8956236589");
  await driver.findElement(By.name("officeNumber")).sendKeys("9856365895");
  await driver.findElement(By.name("designation")).sendKeys("manager");
  await driver.findElement(By.name("department")).sendKeys("E.N.T, Neuro, Gyno, Medical, Skin");
  await driver.findElement(By.name("latitude")).sendKeys("40215");
  await driver.findElement(By.name("longitude")).sendKeys("30215");
  await driver.findElement(By.id("description")).sendKeys("alley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
  await driver.findElement(By.id("hospital")).click();
});



Given('Test logout functionality', { timeout: 40000 }, async function () {
  let driver = await new Builder().forBrowser('chrome').build();
  await driver.get('http://localhost:3000/login');
  await driver.findElement(By.name('userName')).sendKeys('admin');
  await driver.findElement(By.name('password')).sendKeys('123456789');
  await driver.findElement(By.name('login')).click();
  await driver.sleep(delay);
  await driver.sleep(delay,2000);
  await driver.findElement(By.name("logout")).click();
  await driver.sleep(delay,5000);
  await driver.quit();
});

Given("Test Admin Overview functionality", { timeout: 60000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.name('userName')).sendKeys('admin');
  await driver.findElement(By.name('password')).sendKeys('123456');
  await driver.sleep(delay);
  await driver.findElement(By.name("login")).click();
  await driver.sleep(delay);
  await driver.quit();
});

Given("Test Manager Overview functionality", { timeout: 60000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.name('userName')).sendKeys('2021074714');
  await driver.findElement(By.name('password')).sendKeys('bgBjvB1234');
  await driver.sleep(delay);
  await driver.findElement(By.name("login")).click();
  await driver.sleep(delay);
  await driver.quit();
});

Given("Test Enquiry functionality", { timeout: 60000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.name('userName')).sendKeys('admin');
  await driver.findElement(By.name('password')).sendKeys('12345678');
  await driver.sleep(delay);
  await driver.findElement(By.name("login")).click();
  await driver.sleep(delay);
  await driver.findElement(By.name("enquiry")).click();
  await driver.sleep(delay);
  await driver.quit();
});

Given("Test Change Password functionality", { timeout: 60000 }, async function () {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/login");
  await driver.findElement(By.name('forgotpw')).click();
  await driver.sleep(delay);
  await driver.findElement(By.name("login")).click();
  await driver.sleep(delay);
  await driver.findElement(By.name("login")).click();
  await driver.quit();
});