import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RpgCreaturePage extends BasePage {
    readonly section: Locator;
    readonly searchBox: Locator;
    readonly searchButton: Locator;
    readonly nameField: Locator;
    readonly idField: Locator;
    readonly weightField: Locator;
    readonly heightField: Locator;
    readonly typesSection: Locator;

    constructor(page: Page) {
        super(page); // Pass to BasePage
        this.section = page.locator('#fcc-rpg-creature');
        this.searchBox = page.getByRole('textbox', { name: /Search for Creature Name or/i });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.nameField = page.locator('#creature-name');
        this.idField = page.locator('#creature-id');
        this.weightField = page.locator('#weight');
        this.heightField = page.locator('#height');
        this.typesSection = page.locator('#types');
    }

    async verifyStaticContent() {
        await expect(this.section).toContainText('FCC RPG Creature Search');
        await expect(this.page.getByText('FCC RPG Creature Search RPG')).toBeVisible();
        await expect(this.section).toContainText('What is this project?');
        await expect(this.section).toContainText('How to use?');
        await expect(this.section).toContainText('Pyrolynx Aquoroc Terradon Beastmere');
        await expect(this.page.getByRole('link', { name: 'here' })).toHaveAttribute('href', /freecodecamp/);
        await expect(this.page.locator('.name-and-id')).toBeVisible();
        await expect(this.page.locator('.top-rpg-container')).toBeVisible();
        await expect(this.page.locator('#search-form')).toContainText('Search for Creature Name or ID:');
    }

    async searchCreature(name: string) {
        await this.searchBox.fill(name);
        await this.searchButton.click();
    }

    async verifyCreatureDetails(name: string, id: string, weight: string, height: string, types: { name: string; className: string; bgColor: string }[], stats: Record<string, string>) {
        await expect(this.nameField).toContainText(name);
        await expect(this.idField).toContainText(id);
        await expect(this.weightField).toContainText(weight);
        await expect(this.heightField).toContainText(height);

        for (const { name: typeName, className, bgColor } of types) {
            const typeElement = this.typesSection.locator('div', { hasText: typeName });
            await expect(typeElement).toHaveClass(new RegExp(className));
            await expect(typeElement).toHaveCSS('background-color', bgColor);
        }

        for (const [statId, value] of Object.entries(stats)) {
            await expect(this.page.locator(`#${statId}`)).toContainText(value);
        }
    }

    async verifyCreatureNotFoundAlert(expectedMessage: string) {
        let alertText = '';
        this.page.once('dialog', async dialog => {
            alertText = dialog.message();
            await dialog.accept();
        });

        await this.searchCreature('testAlert');
        await this.page.waitForTimeout(100);
        expect(alertText).toContain(expectedMessage);
    }
}

