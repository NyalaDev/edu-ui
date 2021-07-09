import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  // Go to https://edu.nyaladev.com/
  await page.goto('https://edu.nyaladev.com/en/signin')

  // Click text=Create an Account
  await page.click('text=Create an Account')

  // Click [placeholder="Name"]
  await page.click('[placeholder="Name"]')

  // Fill [placeholder="Name"]
  await page.fill('[placeholder="Name"]', 'test test')

  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]')

  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', 'testee@testee.com')

  // Click [placeholder="Password"]
  await page.click('[placeholder="Password"]')

  // Fill [placeholder="Password"]
  await page.fill('[placeholder="Password"]', 'testtest')

  // Click [placeholder="Password Confirmation"]
  await page.click('[placeholder="Password Confirmation"]')

  // Fill [placeholder="Password Confirmation"]
  await page.fill('[placeholder="Password Confirmation"]', 'testtest')

  // Click button:has-text("Sign Up")
  await Promise.all([
    page.waitForNavigation({ url: 'https://edu.nyaladev.com/profile' }),
    page.click('button:has-text("Sign Up")'),
  ])

  // Click [aria-label="User menu"]
  await page.click('[aria-label="User menu"]')

  // Click text=Sign out
  await page.click('text=Sign out')
})
