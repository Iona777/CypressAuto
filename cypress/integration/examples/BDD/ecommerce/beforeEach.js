beforeEach(function(){
    //We Need to resolve the promise using then(function(){})
    cy.fixture('example').then(function(data)
    {
        this.data=data
    
    })
    })