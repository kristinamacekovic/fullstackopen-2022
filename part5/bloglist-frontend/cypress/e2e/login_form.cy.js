describe('Blog app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blog')
  })
  it('login form renders by default', function() {
    cy.get('#username')
    cy.get('#password')
    cy.get('#submit')
  })
})