//import {func1, func2} from "library";
//becomes
//const {func1, func2} = require("library");

const {Given,When, Then, And} = require("@cucumber/cucumber") ;
//import { Given,When, Then, And } from "@cucumber/cucumber";

//import { Given,When, Then } from "@cypress-cucumber-preprocessor/steps";

const homePage = new HomePage()
const productPage = new ProductPage()       


Given('I open Ecommerce page', function()
{
    cy.visit(Cypress.env('url')+"/angularpractice/")
})

When('I add items to Cart', ()=>
{
    homePage.getShopTab().click()

    //Read in data from array in examples.json.
    //Select each product in the array
    this.data.productName.forEach(element => {
        cy.selectProduct(element)    
    });

    productPage.getCheckoutButton().click()

})

And('validate the total prices', function()
{

    //CONSISER PUTTING AS MUCH OF THIS AS I CAN INTO A PAGE OBJECT METHOD(S)
    var sum = 0 

    //don't need index and list variables in the loop if not using them
    cy.get('tr td:nth-child(4) strong').each((el) => {

    const amount = el.text();    
    var result = amount.split(" ")
        result = result[1].trim()

    cy.log("Result is "+ result)    
    
    //Need to turn these strings into numbers so we can sum them. Same as casting to Int()
    sum= Number(sum) + Number(result) 

        //Need to resolve the promise so that javascript waits for the loop to finish before logging the total sum 
    }).then(function()
    {
        cy.log("Total is:"+ sum)

        cy.get('h3 strong').then(function(element)
        {
            const amount = element.text();    
            var result = amount.split(" ")
            var total = result[1].trim()

            //Sum is already a numbeer, but total is a string so we need to convert it
            expect(sum).to.equal(Number(total))

        })
    })

})

Then('select the country submit and verify Thank You message', function()
{
    productPage.getCheckoutButton().click()

    cy.get('#country').type('India')
    cy.get('.suggestions li a').click()
    //This element is covered by another, preventing it being click. Use {force: true} to get round this
    cy.get('#checkbox2').click({force: true})
    cy.get('input[type="submit"]').click()
    //Cannot use should('have','....' as there are extra chars displayed, so use contains instead
    cy.get('.alert').should('contain.text','Success! Thank you! Your order will be delivered in next few weeks')

    //The above is a better way that the one given on the course, but here is is anyway
    cy.get('.alert').then(function(element)
    {
       const actualText = element.text()

       expect(actualText.includes('Success! Thank you! Your order will be delivered in next few weeks')).to.be.true
       
    })

})

When('I fill the form details', function()
{
    homePage.getEditBox().type(this.data.name)
    homePage.getGender().select(this.data.gender)
})


Then('validate the form behaviour', function()
{
    homePage.getTwoDataBinding().should('have.value', this.data.name)
    homePage.getEditBox().should('have.attr', 'minlength',2)
    homePage.getEntrepreneur().should('be.disabled')

})

And('select the shop page', function()
{
    homePage.getShopTab().click()
})
