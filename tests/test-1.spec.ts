import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('https://hailagaz.github.io/tasteeat-landing-page/');
	await page.getByRole('link', { name: 'Call - 123 456' }).click();
	await page.getByRole('link', { name: 'Reservation' }).click();
	await page.getByRole('textbox', { name: 'Name' }).click();
	await page.getByRole('textbox', { name: 'Name' }).fill('dsdsdsds');
	await page.getByRole('textbox', { name: 'Name' }).press('Enter');
	await page.getByRole('textbox', { name: 'Email Email' }).click();
	await page.getByRole('textbox', { name: 'Email Email' }).fill('sdsdsd');
	await page.getByRole('textbox', { name: 'Email Email' }).press('Enter');
	await page.getByRole('textbox', { name: 'Email Email' }).fill('sdsdsd@mail.com');
	await page.getByRole('textbox', { name: 'Email Email' }).press('Enter');
	await page.getByRole('button', { name: 'Book a Table' }).click();
	await page.getByRole('spinbutton', { name: 'Persons' }).click();
	await page.getByRole('spinbutton', { name: 'Persons' }).fill('2');
	await page.getByRole('textbox', { name: 'Timing' }).click();
	await page.getByRole('textbox', { name: 'Timing' }).fill('11:11');
	await page.getByRole('textbox', { name: 'Date' }).fill('2004-03-11');
	await page.getByRole('textbox', { name: 'Date' }).press('Enter');
	await page.getByRole('button', { name: 'Book a Table' }).click();
});

