/// <reference types='Cypress' />

describe('My first test suite', function() 
{

it('My Second test case', function() 
{
    
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.get(".search-keyword").type("ca")
    cy.wait(2000)

    //Parent child chaining
    cy.get(".products").as('productLocator')
    cy.get("@productLocator").find(".product").each(($el, index, $list) => {

        const textVeg=$el.find("h4.product-name").text()
        cy.log("Text is "+ textVeg)
    
        if (textVeg.includes("Cashews")) 
        {
            $el.find("button").click()
    
        }
    
    })

    cy.get('.cart-icon > img').click()
    cy.contains("PROCEED TO CHECKOUT").click()
    cy.contains("Place Order").click()
    
})
   
it('My Next test case', function() {

   expect(2+2).to.equal(4)
  
})
   
   
   
})
