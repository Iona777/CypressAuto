/// <reference types='Cypress' />

//cypress - Spec

//The describe keyword is the start of a test suite

//Looks like both describe and it take in 2 parameters, a string and a function 
//You can either write function as function() or as ()=> 
describe('My first test suite', function() {

 //The it keyword is the start of a test case   
it('My first test case', () => {
    
    
//cy is like Cypress version of driver. It is alwaays available by default, you do not need to create it
cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
//cy.visit("https://docs.cypress.io/guides/guides/command-line")

//cy.get() works like Selenium driver.FindElement() (but with a built in wait)
cy.get(".search-keyword").type("ca")

//This works the same wait as Thread.sleep(). There are better ways of working which we will come to later
cy.wait(2000)


//Within the brackets of should(), type single quotes and then the intellisense will start to work

//With this we get a failure as cypress also finds 1 invisible element that matches (I don't know why as if you use [class='product'] on Chrome it only finds 4)
//cy.get(".product").should('have.length',4)

//To get round this we tell it to only find visible elements, like this
cy.get(".product:visible").should('have.length',4)




//Could just to it this way
cy.get("[class='product']").should('have.length',4)

//Could also restrict the scope to the parent element
//Parent child chaining

//Can replace the repreaded use of ".products" by getting it once and giving it an alias and using that throughout. A bit like get a locator variable
//This means if the locator changes, we only need to amend it in one place
//cy.get(".products").find(".product").should('have.length',4)
cy.get(".products").as('productLocator')

cy.get("@productLocator").find(".product").should('have.length',4)

//The eq() method gets the element at at given index
//The contains() methods gets the element that contains the given text
//console.log is  not a cypress commend, so we need to use then() to resolve promise before using to get round async behaviour
cy.get("@productLocator").find(".product").eq(2).contains("ADD TO CART").click().then(function()

{
    console.log("ADDED TO CART")
}

)


//This is cypress version of a for each loop
//The find will return a list 
//$el and $list are the variables for each element and the list.
//So we are saying for each element ($el) in the list ($list)

cy.get("@productLocator").find(".product").each(($el, index, $list) => {

    //We found the list of products, then for each product that list we look at that element ($el) and look for an element within that. Then we get the text of that element
    const textVeg=$el.find("h4.product-name").text()


    if (textVeg.includes("Cashews")) 
    {
        //The click() method is deprecated in JQuery. Wrapping (like casting?) it with cy gets round this problem
        cy.wrap($el).find('button').click()
        

    }

})


//Because of the asynchronous nature of javascript, with cypress takes care of internally for you, but this ONLY works when using cypress commands.
//S0, some code that you would expect to work, does not. This is because non-cypress command cannot resolve promises by themselves. We need to manually resolve
//it by using the()

//For example, this will not work
//const logo = cy.get(".brand")
//cy.log(logo.text())

//It would have to be rewritten like this. You are bypassing cypress internal help and are manually waiting for the promise to be resolved, then taking the resulting element
//and passing it to a function that gets the text
cy.get(".brand").then
(function(logoElement)
    {
        //This will log to the Cypress log, in the cypress runner
        cy.log(logoElement.text())
    }
)

//Assert if logo text is correctly displayed. We use Chai library for assertions. This also takes care of promises automatically
cy.get(".brand").should('have.text','GREENKART')


})

it("My second test cse", function() {
    console.log("THIS WILL LOG TO THE CONSOLE, IN THE BROWSER. USE DEVELOPER TOOLS (F12) AND THEN SELECT CONSOLE TO SEE. Not much use because of aysnc unless you resolve the promise first")
    expect(2+2).to.equal(4)

})


//Terminating brackets for the test suite
})