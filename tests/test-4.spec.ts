import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://telemart.ua/ua/');
	await page.getByRole('button', { name: 'Так, вірно' }).click();
	await page.getByRole('link', { name: 'Відеокарти', exact: true }).click();
	await page.getByRole('link', { name: 'Відеddокарта MSI GeForce RTX 5060 Ti VENTUS 2X OC PLUS 8192MB (RTX 5060 Ti 8G' }).first().click();
	await page.getByRole('link', { name: 'Купити' }).click();
	await page.getByRole('button', { name: 'Close' }).click();
	await page.getByRole('button', { name: 'Сума 19809 ₴' }).click();
	await page.locator('#cart757296').getByRole('button').nth(2).click();
});