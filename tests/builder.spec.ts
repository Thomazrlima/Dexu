import { expect, test } from '@playwright/test'

for (const width of [375, 1365]) {
  test(`Time vazio e edição persistem em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 })
    await page.goto('/soulsilver')
    await page.getByRole('button', { name: 'Criar time' }).click()
    await expect(page).toHaveURL(/\/soulsilver\/times\/[a-f0-9-]+$/)
    await expect(page.getByRole('heading', { name: 'Meu time' })).toBeVisible()
    await expect(page.getByRole('status').filter({ hasText: '0 de 6 membros' })).toBeVisible()
    await page.getByRole('textbox', { name: 'Nome do time' }).fill('Johto da noite')
    await page.getByRole('textbox', { name: 'Nome do time' }).blur()
    await expect(page.getByText('Salvo neste navegador')).toBeVisible()
    await page.reload()
    await expect(page.getByRole('textbox', { name: 'Nome do time' })).toHaveValue('Johto da noite')
    await expect(page.getByRole('status').filter({ hasText: '0 de 6 membros' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}
