import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  // Go to https://edu.nyaladev.com/
  await page.goto('https://edu.nyaladev.com/')

  // Click [data-testid="en"]
  await Promise.all([
    page.waitForNavigation({ url: 'https://edu.nyaladev.com/en/' }),
    page.click('[data-testid="en"]'),
  ])

  // Click text=Login
  await page.click('text=Login')
  expect(page.url()).toBe('https://edu.nyaladev.com/en/signin')

  // Click text=Create an Account
  await page.click('text=Create an Account')
  expect(page.url()).toBe('https://edu.nyaladev.com/en/signup')

  // Click [placeholder="Name"]
  await page.click('[placeholder="Name"]')

  // Fill [placeholder="Name"]
  await page.fill('[placeholder="Name"]', 'test testee')

  // Click [placeholder="Email"]
  await page.click('[placeholder="Email"]')

  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', 'testtestee@testee.com')

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
  expect(page.url()).toBe('https://edu.nyaladev.com/en#')

  // Click text=Login
  await page.click('text=Login')
  expect(page.url()).toBe('https://edu.nyaladev.com/en/signin')

  // Click [placeholder="Username or Email"]
  await page.click('[placeholder="Username or Email"]')

  // Fill [placeholder="Username or Email"]
  await page.fill('[placeholder="Username or Email"]', 'testtestee@test.com')

  // Click [placeholder="Your Password"]
  await page.click('[placeholder="Your Password"]')

  // Fill [placeholder="Your Password"]
  await page.fill('[placeholder="Your Password"]', 'testtest')

  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation({ url: 'https://edu.nyaladev.com' }),
    page.click('button:has-text("Login")'),
  ])

  // Click [aria-label="User menu"]
  await page.click('[aria-label="User menu"]')

  // Click text=Sign out
  await page.click('text=Sign out')
  expect(page.url()).toBe('https://edu.nyaladev.com/en#')
})
