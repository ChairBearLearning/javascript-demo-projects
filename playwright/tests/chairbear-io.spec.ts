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
        await expect(page.getByRole('listitem').and(page.getByText('PHP', { exact: true }))).toBeVisible();
        await expect(page.getByRole('listitem').and(page.getByText('C#', { exact: true }))).not.toBeVisible();
        await page.getByText('❮').click();
        await expect(page.getByRole('listitem').and(page.getByText('PHP', { exact: true }))).not.toBeVisible();
        await expect(page.getByRole('listitem').and(page.getByText('C#', { exact: true }))).toBeVisible();
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

test.describe('Navigation menu @mobile @desktop', () => {
    test('Menu is now a header with hamburger @mobile', async ({page, isMobile}) => {
            test.skip(!isMobile,'This test is for mobile only');
            const mobileHeader = page.locator('.containers.top.hide-large-main.teal');
            const desktopMenu = page.locator('#the-side-bar-menu');
            const hamburgerMenu = mobileHeader.locator('.basic-btn.teal.margins-r');

            await expect(mobileHeader).toBeVisible();
            await expect(hamburgerMenu).toBeVisible();
            await expect(desktopMenu).not.toBeVisible();

            await hamburgerMenu.click();
            await expect(desktopMenu).toBeVisible();
    });

    test('Menu is not a hamburger @desktop', async ({ page, isMobile }) => {
        test.skip(isMobile,'This test is for desktop only');
        const mobileHeader = page.locator('.containers.top.hide-large-main.teal');
        const desktopMenu = page.locator('#the-side-bar-menu');
        const hamburgerMenu = mobileHeader.locator('.basic-btn.teal.margins-r');

        await expect(mobileHeader).not.toBeVisible();
        await expect(hamburgerMenu).not.toBeVisible();
        await expect(desktopMenu).toBeVisible();
    });

    test('Menu clicking directs to page section @desktop', async ({ page, isMobile }) => {
        test.skip(isMobile,'This test is for desktop only');
        await page.getByRole('link', { name: 'Companies Worked With' }).click();
        await expect(page).toHaveURL('https://chairbearlearning.github.io/#companies');
        await expect(page.getByRole('heading', { name: 'Companies Worked With' })).toBeFocused();

        await page.getByRole('link', { name: 'Skills Breakdown' }).click();
        await expect(page).toHaveURL(' https://chairbearlearning.github.io/#skills-chart');
        await expect(page.getByRole('heading', { name: 'Skills by Experience (Years)' })).toBeFocused();
    });

    test('Menu clicking directs to page section @mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile,'This test is for mobile only');
        const mobileHeader = page.locator('.containers.top.hide-large-main.teal');
        const desktopMenu = page.locator('#the-side-bar-menu');
        const hamburgerMenu = mobileHeader.locator('.basic-btn.teal.margins-r');

        // click on hamburg to trigger menu open
        await hamburgerMenu.click();
        await expect(desktopMenu).toBeVisible();
        // click item on visible nav
        await desktopMenu.getByRole('link', { name: 'Code Experience' }).click();
        // should be directed to page section and menu should have closed
        await expect(page).toHaveURL('https://chairbearlearning.github.io/#skills');
        await expect(page.getByRole('heading', { name: 'Coding Experience' })).toBeFocused();
        await expect(desktopMenu).not.toBeVisible();

        // click on hamburg to trigger menu open
        await hamburgerMenu.click();
        await expect(desktopMenu).toBeVisible();
        // click item on visible nav
        await desktopMenu.getByRole('link', { name: 'About' }).click();
        // should be directed to page section and menu should have closed
        await expect(page).toHaveURL('https://chairbearlearning.github.io/#hello');
        await expect(page.getByRole('heading', { name: 'About' })).toBeFocused();
        await expect(desktopMenu).not.toBeVisible();
    });
});

