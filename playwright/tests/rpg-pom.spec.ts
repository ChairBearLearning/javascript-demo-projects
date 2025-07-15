import { test, expect } from '@playwright/test';
import { RpgCreaturePage } from '../pages/rpgCreaturePage';

test.beforeEach(async ({ page }) => {
    const rpg = new RpgCreaturePage(page);
    await rpg.goto();
});

test('RPG section has expected fields', async ({ page }) => {
    const rpg = new RpgCreaturePage(page);
    await rpg.verifyStaticContent();
});

test('Can search for beast and see output filled', async ({ page }) => {
    const rpg = new RpgCreaturePage(page);
    await rpg.searchCreature('pyrolynx');
    await rpg.verifyCreatureDetails('PYROLYNX', '#1', 'Weight: 42', 'Height: 32', [
        { name: 'FIRE', className: 'fire', bgColor: 'rgb(139, 0, 0)' }
    ], {
        hp: '65',
        attack: '80',
        defense: '50',
        'special-attack': '90',
        'special-defense': '55',
        speed: '100'
    });
});

test('Creature search is not case sensitive', async ({ page }) => {
    const rpg = new RpgCreaturePage(page);
    await rpg.searchCreature('BEASTMERE');
    await rpg.verifyCreatureDetails('BEASTMERE', '#4', 'Weight: 22', 'Height: 54', [
        { name: 'ELECTRIC', className: 'electric', bgColor: 'rgb(255, 215, 0)' },
        { name: 'FAIRY', className: 'fairy', bgColor: 'rgb(255, 192, 203)' }
    ], {
        hp: '155',
        attack: '70',
        defense: '19',
        'special-attack': '43',
        'special-defense': '45',
        speed: '88'
    });
});

test('Not found beast results in JS alert', async ({ page }) => {
    const rpg = new RpgCreaturePage(page);
    await rpg.verifyCreatureNotFoundAlert('Creature not found');
});
