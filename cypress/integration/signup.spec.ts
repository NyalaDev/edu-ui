/// <reference types="cypress" />

context('signup', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should signup', () => {
    cy.get('[data-testid="en"]').click()

    cy.contains('Login').click({ force: true })

    cy.contains('Create an Account').click()

    cy.get('#name').type('test test')
    cy.get('#email').type('test@test.test')
    cy.get('#password').type('testtest')
    cy.get('#passConfirm').type('testtest')
    // cy.get('#signup').click()

    // cy.wait(5000)

    // cy.get('#user-menu > .h-8').click({ force: true })
    // cy.get('.origin-top-right').should('be.visible')
    // cy.get('[href="/en#"]').click()
    // cy.contains('Login')
  })
})

export {}
