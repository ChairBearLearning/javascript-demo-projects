import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://chairbearlearning.github.io/');
    await page.getByRole('heading', { name: 'About', exact: true }).locator('b').click();
    await expect(page.locator('#hello')).toContainText('About');
    await expect(page.locator('#companies')).toContainText('Companies Worked With');
    await expect(page.locator('#skills')).toContainText('Coding Experience');
    await expect(page.locator('#prod-demo')).toContainText('Project Demos');
    await expect(page.locator('#skills-chart')).toContainText('Skills by Experience (Years)');
    await expect(page.locator('#skills')).toMatchAriaSnapshot(`- button "Test Engineering"`);
    await expect(page.getByRole('button', { name: 'Test Engineering' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Software Engineering' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'SEO Technician' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Full Stack Developer' })).toBeVisible();
    await page.getByRole('button', { name: 'Test Engineering' }).click();
    await page.getByText('I was responsible for').click();
    await expect(page.locator('#skills')).toContainText('Key Skills learned: - Cypress - Accessibility Tools - RTM - Jira');
    await page.getByRole('button', { name: 'SEO Technician' }).click();
    await expect(page.locator('#skills')).toContainText('Key Skills learned: - Power BI - Microsoft Suite - Google Suite - Google Analytics - Adobe Analytics');
    await expect(page.getByText('Project Demos A selection of')).toBeVisible();
    await expect(page.locator('#prod-demo')).toContainText('PHP');
    await page.getByText('❮').click();
    await expect(page.locator('#prod-demo')).toContainText('C#');
    await expect(page.locator('#prod-demo')).toMatchAriaSnapshot(`
    - link "See Example":
      - /url: https://github.com/ChairBearLearning/godot-demo-projects
    `);
    await expect(page.locator('#prod-demo')).toContainText('What about test engineering?');
    await expect(page.getByRole('link', { name: 'Cypress' })).toBeVisible();
    await page.getByRole('link', { name: 'Cypress' }).click();
    await page.getByText('Breadcrumbsjavascript-demo-projects/cypress/Copy path').click();
});
