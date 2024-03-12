beforeEach(()=>
{

cy.log("IN BEFORE EACH!!")

    cy.fixture('example').then(function(data)
        {
            this.data=data
            cy.log("IN THIS DATA!")
            cy.log("NAME IS "+ data.name)
        })
});