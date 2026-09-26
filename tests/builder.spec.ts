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

test('Team Builder organiza os seis slots em uma faixa horizontal no desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1365, height: 850 })
  await page.goto('/soulsilver')
  await page.getByRole('button', { name: 'Criar time' }).click()

  const teamStrip = page.getByRole('region', { name: 'Seu time' })
  const slots = teamStrip.getByRole('listitem')
  await expect(slots).toHaveCount(6)
  const verticalPositions = await slots.evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().top)))
  expect(new Set(verticalPositions).size).toBe(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1365)
})

test('Vulpix persiste escolhas e atualiza ofensiva e defesa com explicações separadas', async ({ page }) => {
  await page.goto('/soulsilver')
  await page.getByRole('button', { name: 'Criar time' }).click()

  await page.getByLabel('Candidato auditado').selectOption('vulpix')
  await expect(page.getByText(/Caminhar na Route 36 de SoulSilver/)).toBeVisible()
  await page.getByRole('button', { name: 'Adicionar ao time' }).click()

  const member = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Vulpix' }) })
  await expect(page.getByRole('img', { name: 'Sprite de Vulpix' })).toBeVisible()
  const compositionBottom = await page.getByRole('heading', { name: 'Monte seu Time' }).evaluate((heading) => heading.parentElement!.parentElement!.getBoundingClientRect().bottom)
  const analysisTop = await page.getByRole('heading', { name: 'Cobertura' }).evaluate((heading) => heading.parentElement!.parentElement!.getBoundingClientRect().top)
  expect(analysisTop).toBeGreaterThan(compositionBottom)
  await member.getByLabel('Habilidade da posição 1').selectOption('flash-fire')
  await expect(member.getByText('Habilidade normal de Vulpix.')).toBeVisible()
  await expect(member.getByText(/Imune a Fire em condição normal/)).toBeVisible()

  await member.getByRole('checkbox', { name: /Ember/ }).check()
  const offense = page.getByRole('heading', { name: 'Ofensiva por tipo defensor' }).locator('..')
  const grass = offense.getByRole('listitem').filter({ hasText: 'Planta' })
  await expect(grass).toContainText('1 membro')
  await expect(grass).toContainText('Vulpix: Ember')

  const defense = page.getByRole('heading', { name: 'Defesa por tipo atacante' }).locator('..')
  const fire = defense.getByRole('listitem').filter({ hasText: 'Fogo' })
  await expect(fire).toContainText('1 imunes por habilidade')
  await fire.locator('summary').click()
  await expect(fire).toContainText('natural 0.5×')
  await expect(fire).toContainText('resultado em condição normal 0×')
  await expect(fire).toContainText('imunidade de origem habilidade')

  await member.getByRole('checkbox', { name: /Ember/ }).uncheck()
  await expect(grass).toContainText('Sem cobertura')
  await member.getByRole('checkbox', { name: /Ember/ }).check()
  await expect(page.getByText('Salvo neste navegador')).toBeVisible()

  await page.reload()
  const reopened = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Vulpix' }) })
  await expect(reopened.getByLabel('Habilidade da posição 1')).toHaveValue('flash-fire')
  await expect(reopened.getByRole('checkbox', { name: /Ember/ })).toBeChecked()
})

test('dataset inválido bloqueia novas afirmações sem consultar a PokéAPI', async ({ page }) => {
  const externalRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('pokeapi.co')) externalRequests.push(request.url())
  })
  await page.route('**/datasets/soulsilver-sample.json', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"manifest":{}}' }))

  await page.goto('/soulsilver')

  const alert = page.getByRole('alert')
  await expect(alert.getByRole('heading', { name: 'Dados da campanha indisponíveis' })).toBeVisible()
  await expect(alert).toContainText('novas escolhas e análises estão bloqueadas')
  await expect(page.getByRole('button', { name: 'Criar time' })).toBeDisabled()
  expect(externalRequests).toEqual([])
})
