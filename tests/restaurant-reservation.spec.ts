import { test, expect } from '@playwright/test';

const testData = {
	validReservation: {
		name: 'John Doe',
		email: 'john.doe@example.com',
		persons: '2',
		timing: '11:11',
		date: '2025-06-11'
	},
	invalidReservation: {
		name: '',
		email: 'invalid-email',
		persons: '0',
		timing: '25:00',
		date: '2025-02-30'
	}
};

test.describe('Restaurant Reservation Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://hailagaz.github.io/tasteeat-landing-page/');
		await page.getByRole('link', { name: 'Call - 123 456' }).click();
		await page.getByRole('link', { name: 'Reservation' }).click();
	});

	test('should allow valid reservation submission', async ({ page }) => {
		const { name, email, persons, timing, date } = testData.validReservation;

		// Fill form
		await page.getByRole('textbox', { name: 'Name' }).fill(name);
		await page.getByRole('textbox', { name: 'Email Email' }).fill(email);
		await page.getByRole('spinbutton', { name: 'Persons' }).fill(persons);
		await page.getByRole('textbox', { name: 'Timing' }).fill(timing);
		await page.getByRole('textbox', { name: 'Date' }).fill(date);

		// Submit and verify
		await page.getByRole('button', { name: 'Book a Table' }).click();
		await expect(page.getByText('Thank you for your reservation!')).toBeVisible();
	});

	test('should show error for invalid reservation', async ({ page }) => {
		const { name, email, persons, timing, date } = testData.invalidReservation;

		// Fill form with invalid data
		await page.getByRole('textbox', { name: 'Name' }).fill(name);
		await page.getByRole('textbox', { name: 'Email Email' }).fill(email);
		await page.getByRole('spinbutton', { name: 'Persons' }).fill(persons);
		await page.getByRole('textbox', { name: 'Timing' }).fill(timing);
		await page.getByRole('textbox', { name: 'Date' }).fill(date);

		// Submit and verify errors
		await page.getByRole('button', { name: 'Book a Table' }).click();
		await expect(page.getByText('Please fill in all required fields')).toBeVisible();
	});

	test('should validate email format', async ({ page }) => {
		// Fill form with invalid email
		await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
		await page.getByRole('textbox', { name: 'Email Email' }).fill('invalid-email');
		await page.getByRole('spinbutton', { name: 'Persons' }).fill('2');
		await page.getByRole('textbox', { name: 'Timing' }).fill('11:11');
		await page.getByRole('textbox', { name: 'Date' }).fill('2025-06-11');

		// Submit and verify error
		await page.getByRole('button', { name: 'Book a Table' }).click();
		await expect(page.getByText('Please enter a valid email address')).toBeVisible();
	});
});
