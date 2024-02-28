class HomePage
{

getEditBox()
{
    return cy.get("input[name='name']:nth-child(2)")
}

getTwoDataBinding()
{

    return  cy.get(':nth-child(4) > .ng-untouched')
}

getGender()
{
    return cy.get('select#exampleFormControlSelect1')

}

getEntrepreneur()
{
    return cy.get('#inlineRadio3')
}

getShopTab()
{
    return cy.get(':nth-child(2) > .nav-link')
}





}

//This makes the class available to all other files in the framework. Basically same as making a class public
export default HomePage