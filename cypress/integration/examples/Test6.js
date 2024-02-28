/// <reference types ='Cypress'/>

describe('Handling mouse hover popups', function(){

it('It should handle mouse hover popups', function(){

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

    //The will not work if you use this locator as it is the grandparent rather than the parent of the elements you want show() to work against
    cy.get('#mousehover').invoke('show')
    cy.get('.mouse-hover-content').invoke('show')
    cy.contains('Top').click()
    cy.url().should('include', 'top')

    //Alternative if you don't care about checking that mouse over works, but just want to click on an element, even if it is not visible
    cy.contains('Top').click({force:true})
    cy.url().should('include', 'top')


})

})