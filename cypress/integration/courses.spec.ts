/// <reference types="cypress" />

context('Courses', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show courses', () => {
    cy.get('[data-testid="ar"]').click()

    cy.get('[data-testid="course-card"]').should('have.length.gt', 3)

    cy.contains('الكورسات').click()

    cy.contains('بناء موقع بإستخدام لارافيل').click()

    cy.get('[data-testid="about-course"]')
      .children()
      .should('include.text', 'عن الكورس')
      .should('include.text', 'مدة الكورس')
      .should('include.text', 'نشر بتاريخ')
  })
})

export {}
