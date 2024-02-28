/// <reference types='Cypress' />

describe("My Third Test Suite", function(){

it("My First Test Case", function() {


    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

    //HANDLING ALERTS
    //Alerts are automatically handled. The will not appear on the screen, they will just appear in the logs
    cy.get('#alertbtn').click()
    cy.get("[value='Confirm']").click()

    //In order to interact with an alert (e.g. to check its text), you will have to trigger an event

    //window:alert
    //On() takes 2 parameters here. The event to trigger and the response from the event. In this case a string with the text of the alert
    cy.on('window:alert', (str)=>
    {
        expect(str).to.equal("Hello , share this practice page and share your knowledge")
    }
    
    )

    //There are different types of events. This one is a confirm event
    cy.on('window:confirm', (str)=>
    {
        expect(str).to.equal("Hello , Are you sure you want to confirm?")
    }
    
    )
    
    






})




})