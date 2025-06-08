import { test, expect } from '@playwright/test';

test.describe('Pharmacy Shopping Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://anc.ua/');
		// Accept cookies if present
		const cookieButton = page.getByRole('button', { name: 'Так' });
		if (await cookieButton.isVisible()) {
			await cookieButton.click();
		}
	});

	test('should allow adding items to cart', async ({ page }) => {
		// Search for product
		await page.getByRole('textbox', { name: 'Я шукаю' }).fill('аден');
		await page.getByRole('link', { name: 'аденомак 6 товара' }).click();
		await page.getByTitle('Аденомак 500 таблетки №20').click();

		// Add to cart
		await page.getByRole('button', { name: 'cart_white Додати у кошик' }).click();
		await expect(page.getByText('Товар додано до кошика')).toBeVisible();

		// Verify quantity can be adjusted
		await page.getByRole('button', { name: '+' }).first().click();
		await expect(page.getByRole('spinbutton', { name: 'Кількість' })).toHaveValue('2');
	});

	test('should allow navigating categories', async ({ page }) => {
		// Navigate to category
		await page.getByRole('button', { name: 'catalog Каталог товарів' }).click();
		await page.getByRole('link', { name: 'Препарати для очей і вух' }).click();
		await page.getByRole('link', { name: 'Препарати для очей та вуха' }).first().click();

		// Add product to cart
		await page.locator('#product-55269').getByRole('button', { name: 'cart_white Купити' }).click();
		await expect(page.getByText('Товар додано до кошика')).toBeVisible();
	});

	test('should handle checkout process', async ({ page }) => {
		// Add items to cart (example from previous tests)
		await page.getByRole('link', { name: 'Cart Кошик' }).click();
		await page.getByRole('button', { name: 'Так' }).click();

		// Verify cart items
		await expect(page.getByText('Товари у кошику')).toBeVisible();
		await expect(page.getByRole('button', { name: 'Оформити замовлення' })).toBeVisible();

		// Test cart adjustments
		await page.getByRole('button', { name: 'Редагувати' }).click();
		await page.locator('div').filter({ hasText: /^Упаковка2$/ }).getByRole('button').first().click();
		await page.locator('div').filter({ hasText: /^блістер1$/ }).getByRole('button').first().click();
	});
});
