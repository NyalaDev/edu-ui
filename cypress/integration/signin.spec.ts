/// <reference types="cypress" />

context('signin', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should signin', () => {
    cy.get('[data-testid="en"]').click()

    cy.contains('Login').click({ force: true })

    cy.get('#identifier').type('test@test.test')
    cy.get('#password').type('testtest{enter}')

    cy.wait(2000)

    cy.get('#user-menu > .h-8').click({ force: true })
    cy.get('.origin-top-right').should('be.visible')
    cy.get('[href="/en/profile"]').click()

    cy.get('#name').clear().type('test')
    cy.get('#bio')
      .clear()
      .type(
        'testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      )
    cy.get('#linkedin').clear().type('test')
    cy.get('#github').clear().type('test')
    cy.get('#twitter').clear().type('test')
    cy.contains('Save').click()
  })
})

export {}
