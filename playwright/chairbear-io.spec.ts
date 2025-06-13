import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://chairbearlearning.github.io/');
});

test.describe('Page sections', () => {
    test('Should have expected headings', async ({page}) => {
        await expect(page.locator('#hello')).toContainText('About');
        await expect(page.locator('#companies')).toContainText('Companies Worked With');
        await expect(page.locator('#skills')).toContainText('Coding Experience');
        await expect(page.locator('#prod-demo')).toContainText('Project Demos');
        await expect(page.locator('#skills-chart')).toContainText('Skills by Experience (Years)');

    });

    test('It should have expected title', async ({page}) => {
        await expect(page.getByRole('heading', {name: 'Software & Test Engineer and'})).toContainText("Software & Test Engineer and SEO Technician");
    });

});

test.describe('Accordian', () => {
    test('Should have expected tabs', async ({ page }) => {
        await expect(page.locator('#skills')).toMatchAriaSnapshot(`- button "Test Engineering"`);
        await expect(page.getByRole('button', {name: 'Test Engineering'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Software Engineering'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'SEO Technician'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'Full Stack Developer'})).toBeVisible();
    });

    test('Should be able to open tabs', async ({page}) => {
        await expect(page.locator('.panelOne')).not.toBeVisible();
        await expect(page.locator('.panelThree')).not.toBeVisible();
        await page.getByRole('button', { name: 'Test Engineering' }).click();
        await expect(page.locator('.panelOne')).toBeVisible();
        await expect(page.locator('.panelOne')).toContainText('Key Skills learned: - Cypress - Accessibility Tools - RTM - Jira');
        await page.getByRole('button', { name: 'SEO Technician' }).click();
        await expect(page.locator('.panelThree')).toBeVisible();
        await expect(page.locator('.panelThree')).toContainText('Key Skills learned: - Power BI - Microsoft Suite - Google Suite - Google Analytics - Adobe Analytics');
    });
});

test.describe('Project demos', () => {
    test('Slideshow links are navigable', async ({page}) => {
        await expect(page.getByText('Project Demos A selection of')).toBeVisible();
       // await expect(page.locator('#prod-demo')).toContainText('PHP');
        await expect(page.getByRole('listitem').and(page.getByText('PHP'))).toBeVisible();
        await expect(page.getByRole('listitem').and(page.getByText('C#'))).not.toBeVisible();
        await page.getByText('❮').click();
        await expect(page.getByRole('listitem').and(page.getByText('PHP'))).not.toBeVisible();
        await expect(page.getByRole('listitem').and(page.getByText('C#'))).toBeVisible();
        await expect(page.locator('#prod-demo')).toMatchAriaSnapshot(`
        - link "See Example":
          - /url: https://github.com/ChairBearLearning/godot-demo-projects
        `);
    });

    test('Test engineering links navigate to expected areas', async ({page}) => {
        await expect(page.locator('#prod-demo')).toContainText('What about test engineering?');
        await expect(page.getByRole('link', { name: 'Cypress' })).toBeVisible();
        await page.getByRole('link', { name: 'Cypress' }).click();
        await expect(page).toHaveURL('https://github.com/ChairBearLearning/javascript-demo-projects/tree/main/cypress');
    });
});
