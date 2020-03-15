context('Events', () => {
    it('book event', () => {
        cy.mockAndVisit()

        cy.contains('Sign Up').click()
        cy.contains('Yes').click()
        cy.contains('You are in').should('be.visible') 

        cy.reload()

        cy.contains('You are in').should('be.visible') 

        cy.contains('You are in').click()
        cy.contains('Yes').click()

        cy.contains('Sign Up').should('be.visible') 
    })
});
