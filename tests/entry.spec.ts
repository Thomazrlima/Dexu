import { expect, test } from '@playwright/test'

for (const viewport of [{ width: 375, height: 812 }, { width: 1365, height: 900 }]) {
  test(`entrada por teclado em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /escolha seu jogo/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /entrar em soulsilver/i })).toBeVisible()
    for (const game of ['HeartGold', 'Emerald', 'Platinum']) {
      const card = page.getByRole('article', { name: game })
      await expect(card).toContainText('Em estudo, sem previsão')
      await expect(card.getByRole('link')).toHaveCount(0)
    }

    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: /entrar em soulsilver/i })).toBeFocused()
    expect(await page.getByRole('link', { name: /entrar em soulsilver/i }).evaluate((link) =>
      getComputedStyle(link).outlineStyle,
    )).not.toBe('none')
    await page.keyboard.press('Enter')

    await expect(page).toHaveURL(/\/soulsilver$/)
    await expect(page.getByRole('heading', { name: 'SoulSilver', exact: true })).toBeVisible()
    for (const action of ['Criar time', 'Times salvos', 'Pokédex']) {
      const heading = page.getByRole('heading', { name: action })
      await expect(heading).toBeVisible()
      await expect(page.getByRole('article', { name: action })).toContainText('Ainda não disponível')
    }
    await expect(page.getByText(/Johto e Kanto.*antes do primeiro confronto com Red/i)).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width)
  })
}
