/// <reference types='Cypress'/>


import HomePage from '../pageObjects/HomePage'
import ProductPage from '../pageObjects/ProductPage'


describe('My Second Test Suite', function()
{

    before(function(){
        //Runs once before ALL the tests in the block (NOT before each one)
        
        //This gets the data from the fixtures folder. You just specify the filename
        //We Need to resolve the promise using then(function(){})
        cy.fixture('example').then(function(data)
        {
            //Using 'this' creates a global (class level?) variable of that name. So, this.data (globlal) and data (function parameter) are actually different variables
            //but you are assigned the value of one to the other. 
            //This is required since the scope of data (function parameter) is limited to just this block, but you need the values to be available in whole class.
            this.data=data
        
        })
        })


    it('My First Test Case', function() {


        Cypress.config('defaultCommandTimeout',8000)
        
        const homePage = new HomePage()
        const productPage = new ProductPage()
        

        cy.log("URL is"+ Cypress.env('url'))
        

        cy.visit(Cypress.env('url')+"/angularpractice/")
        //cy.get("input[class*='form-control'][name='name']").type("Bob")
        //Alternative CSS
        //This is superceded now that we are using the page object in next line
        //cy.get("input[name='name']:nth-child(2)").type(this.data.name)

        homePage.getEditBox().type(this.data.name)

        //This is superceded now that we are using the page object in next line
        //cy.get('select#exampleFormControlSelect1').select(this.data.gender)
        homePage.getGender().select(this.data.gender)

        //Value is a standard property, so there is a 'have.value' available in JQuery
        //This is superceded now that we are using the page object in next line
        //cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name)
        homePage.getTwoDataBinding().should('have.value', this.data.name)



        //MinLengh is a custom property and so is not available in JQuery. So, use 'have.attr' instead then specify the custom property and its expected value.
        //This is superceded now that we are using the page object in next line
        //cy.get(':nth-child(1) > .form-control').should('have.attr', 'minlength',2)
        homePage.getEditBox().should('have.attr', 'minlength',2)

        //This is superceded now that we are using the page object in next line
        //cy.get('#inlineRadio3').should('be.disabled')
        homePage.getEntrepreneur().should('be.disabled')

        //This will pause execution
        //cy.pause()
    

        //Click on Shop button
        //cy.get(':nth-child(2) > .nav-link').click()
        //This is superceded now that we are using the page object in next line
        homePage.getShopTab().click()


        //Read in data from array in examples.json.
        //Select each product in the array
        this.data.productName.forEach(element => {
            cy.selectProduct(element)    
        });

        

        productPage.getCheckoutButton().click()
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
        }).then(function(){

            cy.log("Total is:"+ sum)


            cy.get('h3 strong').then(function(element){
                
                const amount = element.text();    
                var result = amount.split(" ")
                var total = result[1].trim()


                //Sum is already a numbeer, but total is a string so we need to convert it
                expect(sum).to.equal(Number(total))

            })

        })

        


         //Click checkout button on next page as well
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
})