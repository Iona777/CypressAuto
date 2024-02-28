/// <reference types="Cypress"  />
describe("My Second Test Suite",function()
{


it("My First Test Case",function()
{
    
cy.visit("https://rahulshettyacademy.com/AutomationPractice/")



//CHECKBOXES

//For asserting the behaviour of an element we use be. For asserting/comparing values we use have.
//Instead of click, we use check90 for selecting textboxes. I assume it is first looking to see if already checked before selecting (also applies to redio buttons)
cy.get("#checkBoxOption1").check()
.should('be.checked')
//We can chain assertions using should().and()
.and('have.value','option1')

//We use uncheck to unselect a checkbox. 
cy.get("#checkBoxOption1").uncheck().should('not.be.checked')


//Using the common locator, we can select all the selectors and then check the ones we want using their value attribute
cy.get("input[type='checkbox']").check(['option2','option3'])


//STATIC DROPDOWNS
//(These are not great examples as the value attibute and displayed value are almost the same)

//Can select it by the value ATTRIBUTE by just passing it in like this. 
cy.get("#dropdown-class-example").select('option1').should('have.value','option1')

//Can select it by the DISPLAYED value like this. 
cy.get("#dropdown-class-example").select('Option2').should('have.value','option2')

//Basically, it is the same for both, cypress just works out whether to check value attibute or displayed value. Perhaps it scans both for the value. 

//You can also pass in the index. I think 0 index in this case is the value of 'Select'
cy.get("#dropdown-class-example").select(3).should('have.value','option3')

//DYNAMIC DROPDOWNS
cy.get('#autocomplete').type('india')
//cy.wait(2000)

//After typing in the dropdown search, we get the locator for all the results and then loop round it until we find a result the includes the text we entered
cy.get(".ui-menu-item div").each(($el, index, $list) => {
    

    if ($el.text() ==="India") {
        //$el.click()
        //The click() method is deprecated in JQuery. Wrapping (like casting?) it with cy gets round this problem
        cy.wrap($el).click()
    }
})

//Assert that value was selected successfully
cy.get('#autocomplete').should('have.value', 'India')


//HANDLING VISIBLE AND INVISIBLE ELEMENTS
cy.get('#displayed-text').should('be.visible')
cy.get('#hide-textbox').click()
cy.get('#displayed-text').should('not.be.visible')

cy.get('#show-textbox').click()
cy.get('#displayed-text').should('be.visible')

//RADIO BUTTONS
cy.get("[value='radio2']").check().should('be.checked')

})

})