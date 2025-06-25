import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://chairbearlearning.github.io/projects/live-demos');
});

test('RSVP section has expected fields and help text', async ({ page }) => {
    await expect(page.getByText('RSVP Browser App')).toBeVisible();
    await expect(page.getByText('RSVP Browser App What is this')).toBeVisible();

    await expect(page.locator('#rsvp')).toContainText('RSVP Browser App');
    await expect(page.locator('#rsvp')).toContainText('What is this project?');
    await expect(page.locator('#rsvp')).toContainText('Features:');
    await expect(page.locator('#rsvp')).toContainText('"Invite" someone');
    await expect(page.locator('#rsvp')).toContainText('Check "confirmed" if the person responded');
    await expect(page.locator('#rsvp')).toContainText('Filtering: Hide unresponded Show only unresponded');
    await expect(page.locator('#rsvp')).toContainText('Edit the invitee');
    await expect(page.locator('#rsvp')).toContainText('Remove the invitee');
    await expect(page.locator('#rsvp')).toContainText('Download the invitees and their responses: In CSV format In TXT format');
    await expect(page.locator('#rsvp')).toContainText('How to use?');
    await expect(page.locator('#rsvp')).toContainText('Type an invitee name in the input and submit for it to be showed in the invitee list. Use the provided buttons to edit, delete and download the invitees. Use the \'Responded\' checkboxes to filter the invitee list.');

    await expect(page.locator('div').filter({ hasText: 'RSVP A RSVP Application' }).nth(2)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'RSVP', exact: true })).toBeVisible();

    await expect(page.locator('h2')).toContainText('Invitees');
    await expect(page.locator('#rsvp')).toContainText('Show Unresponded Only');
    await expect(page.locator('#rsvp')).toContainText('Hide Unresponded');
    await expect(page.locator('button[name="submit"]')).toContainText('Submit');
    await expect(page.locator('#registrar')).toContainText('Download CSV');
    await expect(page.locator('#registrar')).toContainText('Download Text File');
});

test('Can create invitee and invitee has expected actions', async ({page}) => {
    await page.getByRole('textbox', { name: 'Invite Someone' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).fill('Jason');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).fill('Marquee');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.getByText('JasonConfirmedEditRemove')).toBeVisible();
    // await expect(page.getByText('MarqueeConfirmedEditRemove')).toBeVisible();

    // get all li
    const invitedListItems = page.locator('#invitedList > li');

    // validate Jason's list item
    const jasonItem = invitedListItems.filter({ hasText: 'Jason' });
    await expect(jasonItem).toHaveCount(1);
    await expect(jasonItem.locator('input[type="checkbox"]')).toHaveCount(1);
    await expect(jasonItem.locator('button', { hasText: 'Edit' })).toHaveCount(1);
    await expect(jasonItem.locator('button', { hasText: 'Remove' })).toHaveCount(1);

    // validate Marquee's list item
    const marqueeItem = invitedListItems.filter({ hasText: 'Marquee' });
    await expect(marqueeItem).toHaveCount(1);
    await expect(marqueeItem.locator('input[type="checkbox"]')).toHaveCount(1);
    await expect(marqueeItem.locator('button', { hasText: 'Edit' })).toHaveCount(1);
    await expect(marqueeItem.locator('button', { hasText: 'Remove' })).toHaveCount(1);


    /*
    could also loop if list of names becomes greater or dynamic
        const expectedNames = ['Jason', 'Marquee', 'X'];
    for (const name of expectedNames) {
      const listItem = page.locator('#invitedList > li').filter({ hasText: name });
      await expect(listItem).toHaveCount(1);
      await expect(listItem.locator('input[type="checkbox"]')).toHaveCount(1);
      await expect(listItem.locator('button', { hasText: 'Edit' })).toHaveCount(1);
      await expect(listItem.locator('button', { hasText: 'Remove' })).toHaveCount(1);
    }
     */
});

test('Can check confirmed checkbox and filter users based on checked status', async ({page}) => {
    await page.getByRole('textbox', { name: 'Invite Someone' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).fill('Jason');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).fill('Marquee');
    await page.getByRole('button', { name: 'Submit' }).click();

    const invitedListItems = page.locator('#invitedList > li');

    // alt if no above const marqueeItem = page.locator('#invitedList > li', { hasText: 'Marquee' });
    const marqueeItem = invitedListItems.filter({ hasText: 'Marquee' });;

    // validate Jason's list item
    const jasonItem = invitedListItems.filter({ hasText: 'Jason' });
    await expect(jasonItem).toHaveCount(1);
    await jasonItem.locator('input[type="checkbox"]').check();

    // filter
    await page.locator('div').filter({ hasText: /^Show Unresponded Only$/ }).getByRole('checkbox').check();

    // now run confirmations on hidden Jason li
    // 1. ensure it has class 'responded'
    await expect(jasonItem).toHaveClass(/responded/);
    // 2. ensure it's hidden (display: none)
    await expect(jasonItem).toHaveCSS('display', 'none');
    // 3. ensure checkbox is checked
    const jasonCheckbox = jasonItem.locator('input[type="checkbox"]');
    await expect(jasonCheckbox).toBeChecked();

    // confirm 2nd li still shown
    await expect(marqueeItem).toBeVisible();

    // turn off filter
    await page.locator('div').filter({ hasText: /^Show Unresponded Only$/ }).getByRole('checkbox').uncheck();
    await expect(jasonItem).toBeVisible();
    await expect(marqueeItem).toBeVisible();

    // filter for non-confirmed
    await page.locator('div').filter({ hasText: /^Hide Unresponded$/ }).getByRole('checkbox').check();
    await expect(jasonItem).toBeVisible();
    //now check 2nd li is hidden
    await expect(marqueeItem).toHaveCSS('display', 'none');
    await expect(marqueeItem).not.toHaveClass(/responded/);
    const marqueeCheckbox = marqueeItem.locator('input[type="checkbox"]');
    await expect(marqueeCheckbox).not.toBeChecked();
});

test('Can edit invitee', async ({page}) => {
    await page.getByRole('textbox', { name: 'Invite Someone' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).fill('Jason');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.locator('#invitedList').getByRole('textbox').click();
    await page.locator('#invitedList').getByRole('textbox').fill('JasonAmended');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.locator('#invitedList')).toContainText('JasonAmended');
});

test('Can delete invitee', async ({page}) => {
    await page.getByRole('textbox', { name: 'Invite Someone' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).fill('Jason');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).click();
    await page.getByRole('textbox', { name: 'Invite Someone' }).fill('Marquee');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Marquee')).toBeVisible();
    await expect(page.getByText('Jason')).toBeVisible();

    await page.getByRole('button', { name: 'Remove' }).first().click();
    await expect(page.locator('#invitedList')).toContainText('Marquee');
    await expect(page.locator('#invitedList')).not.toContainText('Jason');
});
