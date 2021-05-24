/// <reference types="cypress" />

context('signin', () => {
  beforeEach(() => {
    cy.visit('/signin')
  })

  it('should signin', () => {
    cy.get('#identifier').type('alaa')
    cy.get('#password').type('alaaalaa{enter}')
    cy.get('#user-menu > .h-8')
    cy.visit('/profile')
    cy.get('#name').clear().type('alaa')
    cy.get('#bio')
      .clear()
      .type(
        'alaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      )
    cy.get('#linkedin').clear().type('alaa')
    cy.get('#github').clear().type('alaa')
    cy.get('#twitter').clear().type('alaa')
    cy.contains('Save').click()
  })
})

export {}
