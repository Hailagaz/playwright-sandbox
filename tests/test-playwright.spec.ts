import { test, expect } from '@playwright/test';

test('seach network header', async ({ page }) => {
	await page.goto('https://playwright.dev/');
	await page.getByRole('link', { name: 'Get started' }).click();
	await page.getByRole('link', { name: 'Network' }).click();
	await expect(page.getByRole('heading', { name: 'Network', exact: true })).toBeVisible();
});