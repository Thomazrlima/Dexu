import { expect, test } from '@playwright/test'

for (const width of [375, 1365]) {
  test(`Time vazio e edição persistem em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 })
    await page.goto('/soulsilver')
    await page.getByRole('button', { name: 'Criar time' }).click()
    await expect(page).toHaveURL(/\/soulsilver\/times\/[a-f0-9-]+$/)
    await expect(page.getByRole('heading', { name: 'Meu time' })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Seu time' }).getByText('0/6')).toBeVisible()
    await page.getByRole('textbox', { name: 'Nome do time' }).fill('Johto da noite')
    await page.getByRole('textbox', { name: 'Nome do time' }).blur()
    await expect(page.getByText('Salvo neste navegador')).toBeVisible()
    await page.reload()
    await expect(page.getByRole('textbox', { name: 'Nome do time' })).toHaveValue('Johto da noite')
    await expect(page.getByRole('region', { name: 'Seu time' }).getByText('0/6')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}

for (const width of [1024, 1365]) {
  test(`Team Builder organiza os seis slots em uma faixa horizontal em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 })
    await page.goto('/soulsilver')
    await page.getByRole('button', { name: 'Criar time' }).click()

    const teamStrip = page.getByRole('region', { name: 'Seu time' })
    const slots = teamStrip.getByRole('listitem')
    await expect(slots).toHaveCount(6)
    const verticalPositions = await slots.evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().top)))
    expect(new Set(verticalPositions).size).toBe(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}

test('Vulpix persiste escolhas e atualiza ofensiva e defesa com explicações separadas', async ({ page }) => {
  await page.goto('/soulsilver')
  await page.getByRole('button', { name: 'Criar time' }).click()

  await page.getByRole('button', { name: 'Candidato auditado' }).click()
  await page.getByRole('option', { name: /Vulpix/ }).click()
  await expect(page.getByText(/Caminhar na Route 36 de SoulSilver/)).toBeVisible()
  await page.getByRole('button', { name: 'Adicionar ao time' }).click()

  const member = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Vulpix' }) })
  await expect(page.getByRole('img', { name: 'Sprite de Vulpix' })).toBeVisible()
  const compositionBottom = await page.getByRole('heading', { name: 'Monte seu Time' }).evaluate((heading) => heading.parentElement!.parentElement!.getBoundingClientRect().bottom)
  const analysisTop = await page.getByRole('heading', { name: 'Cobertura' }).evaluate((heading) => heading.parentElement!.parentElement!.getBoundingClientRect().top)
  expect(analysisTop).toBeGreaterThan(compositionBottom)
  await member.getByRole('button', { name: 'Habilidade da posição 1' }).click()
  await member.getByRole('option', { name: 'Flash Fire' }).click()
  await expect(member.getByText('Habilidade normal de Vulpix.')).toBeVisible()
  await expect(member.getByText(/Imune a Fire em condição normal/)).toBeVisible()

  await member.getByRole('checkbox', { name: /Ember/ }).check()
  await page.getByRole('tab', { name: 'Ofensiva' }).click()
  const grass = page.locator('tr').filter({ hasText: 'Planta' })
  await expect(grass).toContainText('2×')
  await page.getByRole('tab', { name: 'Defensiva' }).click()
  const fire = page.locator('tr').filter({ hasText: 'Fogo' })
  await expect(fire).toContainText('0×')

  await member.getByRole('checkbox', { name: /Ember/ }).uncheck()
  await page.getByRole('tab', { name: 'Ofensiva' }).click()
  await expect(grass).toContainText('—')
  await member.getByRole('checkbox', { name: /Ember/ }).check()
  await expect(page.getByText('Salvo neste navegador')).toBeVisible()

  await page.reload()
  const reopened = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Vulpix' }) })
  await expect(reopened.getByRole('button', { name: 'Habilidade da posição 1' })).toContainText('Flash Fire')
  await expect(reopened.getByRole('checkbox', { name: /Ember/ })).toBeChecked()
})

test('slot preserva fallback quando o sprite remoto falha', async ({ page }) => {
  await page.route('https://raw.githubusercontent.com/PokeAPI/sprites/**', (route) => route.abort())
  await page.goto('/soulsilver')
  await page.getByRole('button', { name: 'Criar time' }).click()
  await page.getByRole('button', { name: 'Candidato auditado' }).click()
  await page.getByRole('option', { name: /Vulpix/ }).click()
  await page.getByRole('button', { name: 'Adicionar ao time' }).click()

  const slot = page.getByRole('region', { name: 'Seu time' }).getByRole('listitem').first()
  await expect(slot.getByText('V', { exact: true })).toBeVisible()
  await expect(slot.getByRole('img', { name: 'Sprite de Vulpix' })).toBeHidden()
})

test('slots controlam qual membro está aberto no editor', async ({ page }) => {
  await page.goto('/soulsilver')
  await page.getByRole('button', { name: 'Criar time' }).click()
  await page.getByRole('button', { name: 'Adicionar ao time' }).click()
  await page.getByRole('button', { name: 'Selecionar slot vazio 2' }).click()
  await page.getByRole('button', { name: 'Candidato auditado' }).click()
  await page.getByRole('option', { name: /Vulpix/ }).click()
  await page.getByRole('button', { name: 'Adicionar ao time' }).click()

  await page.getByRole('button', { name: /Editar Chikorita/ }).click()
  await expect(page.getByRole('button', { name: /Editar Chikorita/ })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('article').filter({ has: page.getByRole('heading', { name: 'Chikorita' }) })).toBeVisible()
  await expect(page.locator('article').filter({ has: page.getByRole('heading', { name: 'Vulpix' }) })).toBeHidden()
})

test('dataset inválido bloqueia novas afirmações sem consultar a PokéAPI', async ({ page }) => {
  const externalRequests: string[] = []
  page.on('request', (request) => {
    if (/(?:pokeapi\.co|raw\.githubusercontent\.com)/.test(request.url())) externalRequests.push(request.url())
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
