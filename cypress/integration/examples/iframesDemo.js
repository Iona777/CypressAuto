/// <reference types='Cypress'/>

/// <reference types='cypress-iframe'/>
import 'cypress-iframe'

describe('Frames Test', function(){
it('Demo Example', function(){

cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
//Get the CSS to locate the frame and pass to frameLoaded() method
cy.frameLoaded('#courses-iframe')

cy.iframe().find("a[href='mentorship']").eq(0).click()
//Looks like it is refreshing the screen and the frame or element is not available immediiately. Hopefully we learn a better way
//to get round this later
cy.wait(2000)
cy.iframe().find("h1[class*='pricing-title']").should('have.length',2)

})

})