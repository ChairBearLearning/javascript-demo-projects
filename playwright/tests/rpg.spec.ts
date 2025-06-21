import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://chairbearlearning.github.io/projects/live-demos');
});

test('RPG section has expected fields', async ({ page }) => {
    await expect(page.locator('#fcc-rpg-creature')).toContainText('FCC RPG Creature Search');
    await expect(page.getByText('FCC RPG Creature Search RPG')).toBeVisible();
    await expect(page.locator('#fcc-rpg-creature')).toContainText('What is this project?');
    await expect(page.locator('#fcc-rpg-creature')).toContainText('This project comes from the Free Code Camp, as one of the projects needed to gain a Javascript certification with them. See the project details on the FCC site - here');
    await expect(page.getByRole('link', { name: 'here' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'here' })).toHaveAttribute(
        'href',
        'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/build-an-rpg-creature-search-app-project/build-an-rpg-creature-search-app'
    );

    await expect(page.locator('#fcc-rpg-creature')).toContainText('How to use?');
    await expect(page.locator('#fcc-rpg-creature')).toContainText('Select from the following, and enter to see the creatures details:');
    await expect(page.locator('#fcc-rpg-creature')).toContainText('Pyrolynx Aquoroc Terradon Beastmere');

    await expect(page.getByText('Search for Creature Name or ID: Search Base Stats HP: Attack: Defense: Sp.')).toBeVisible();
    await expect(page.getByRole('rowgroup')).toContainText('Base');
    await expect(page.getByRole('rowgroup')).toContainText('Stats');
    await expect(page.getByRole('rowgroup')).toContainText('HP:');
    await expect(page.getByRole('rowgroup')).toContainText('Attack:');
    await expect(page.getByRole('rowgroup')).toContainText('Defense:');
    await expect(page.getByRole('rowgroup')).toContainText('Sp. Attack:');
    await expect(page.getByRole('rowgroup')).toContainText('Sp. Defense:');
    await expect(page.getByRole('rowgroup')).toContainText('Speed:');

    await expect(page.locator('.name-and-id')).toBeVisible();
    await expect(page.locator('.top-rpg-container')).toBeVisible();
    await expect(page.getByText('Search for Creature Name or ID: Search')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.locator('#search-form')).toContainText('Search for Creature Name or ID:');
    await expect(page.getByRole('textbox', { name: 'Search for Creature Name or' })).toBeVisible();
});

test('Can search for beast and see output filled', async ({page}) => {
    await page.getByRole('textbox', { name: 'Search for Creature Name or' }).click();
    await page.getByRole('textbox', { name: 'Search for Creature Name or' }).fill('pyrolynx');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('#creature-name')).toContainText('PYROLYNX');
    await expect(page.locator('#creature-id')).toContainText('#1');
    await expect(page.locator('#weight')).toContainText('Weight: 42');
    await expect(page.locator('#height')).toContainText('Height: 32');

    const fireType = page.locator('#types > div');
    await expect(fireType).toContainText('FIRE');
    await expect(fireType).toHaveClass(/fire/); // use regex to ignore other classes (if any)
    await expect(fireType).toHaveCSS('background-color', 'rgb(139, 0, 0)');


    await expect(page.locator('#hp')).toContainText('65');
    await expect(page.locator('#attack')).toContainText('80');
    await expect(page.locator('#defense')).toContainText('50');
    await expect(page.locator('#special-attack')).toContainText('90');
    await expect(page.locator('#special-defense')).toContainText('55');
    await expect(page.locator('#speed')).toContainText('100');
});

test('Creature search is not case sensitive', async ({page}) => {
    await page.getByRole('textbox', { name: 'Search for Creature Name or' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Search for Creature Name or' }).fill('BEASTMERE');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('#creature-name')).toContainText('BEASTMERE');
    await expect(page.locator('#creature-id')).toContainText('#4');
    await expect(page.locator('#weight')).toContainText('Weight: 22');
    await expect(page.locator('#height')).toContainText('Height: 54');

    const electricType = page.locator('#types div', { hasText: 'ELECTRIC' });
    const fairyType = page.locator('#types div', { hasText: 'FAIRY' });
    await expect(electricType).toHaveClass(/electric/);
    await expect(fairyType).toHaveClass(/fairy/);
    await expect(fairyType).toHaveCSS('background-color', 'rgb(255, 192, 203)');
    await expect(electricType).toHaveClass(/electric/);
    await expect(electricType).toHaveCSS('background-color', 'rgb(255, 215, 0)');

    await expect(page.locator('#hp')).toContainText('155');
    await expect(page.locator('#attack')).toContainText('70');
    await expect(page.locator('#defense')).toContainText('19');
    await expect(page.locator('#special-attack')).toContainText('43');
    await expect(page.locator('#special-defense')).toContainText('45');
    await expect(page.locator('#speed')).toContainText('88');
});

test('Not found beast results in JS alert', async ({page}) => {
    let alertMessage = '';

    page.once('dialog', async (dialog) => {
        alertMessage = dialog.message();
        await dialog.accept(); // or dialog.dismiss()
    });

    await page.getByRole('textbox', { name: 'Search for Creature Name or' }).click();
    await page.getByRole('textbox', { name: 'Search for Creature Name or' }).fill('testAlert');
    await page.getByRole('button', { name: 'Search' }).click();

    // wait to ensure dialog is handled - could also use proper wait logic depending on test timing
    await page.waitForTimeout(100);

    expect(alertMessage).toContain('Creature not found');
});
