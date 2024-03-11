beforeEach(()=>
{
console.log("IN BEFORE EACH!!")

    cy.fixture('example').then(function(data)
    {
this.data=data
    })
});