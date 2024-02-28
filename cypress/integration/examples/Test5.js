/// <reference types='Cypress'/>

describe('Handling Tables', function(){


    it('It should handle tables', function(){

        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        
        //Get all the rows (tr) and then the 2nd column
        //For each(), NOTE it takes list within brackets and then passes this list as arguments to a function .each(($el, index, $list)) =>{...})
        cy.get('tr td:nth-child(2)').each(($el, index, $list) =>{

           const text =$el.text()
           //Find the cell (row, column) that contains the required text
           if(text.includes('Python'))
           {
                //We now want to find the next sibling of the cell (which will be column 3 of the row). Even though we have found the cell and it stored in $el, the way cypress next()
                //command works means we have to call if from a get() method.
                //So, we get the 2nd column again, but nwe we know that the row we need is store in index. So, we can tell it to get all rows, get the 2nd column, get row at index
                //and get its next sibling
                cy.get('tr td:nth-child(2)').eq(index).next().should('have.text', '25')

                //Here is an alternative way from the course. It is more long winded as it is using non-cypress commands which means we need to resolve the promises with then() 
                //before using them. text() is a Jquery command.

                cy.get('tr td:nth-child(2)').eq(index).next().then(function(price)
                {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                }
                
                )

           }



        })



    })
})