///<reference types='Cypress'/>

describe('Handling Child Windows', function(){

    it('It should handle child window', function(){


        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //Remove the target='_blank' attribute from the openTab button so that it does not open a new tab when we click on it.
        cy.get('#opentab').invoke('removeAttr','target').click()

        //This will take us to a new domain, so we need to tell Cypress that this is our new domain using cy.origin()
        //Everything that you do in this domain is wrapped within the function that is the second argument to the origin() method
        cy.origin('https://www.qaclickacademy.com/', function()
        {
            cy.get("#navbarSupportedContent a[href*='about']").click()
            cy.get("#about-page h2").should('contain','QAClick Academy')
        })

        

    })
})
