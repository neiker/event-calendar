context('Events', () => {
    const eventName = 'Refactoring to clean code';

    it('book event', () => {
      cy.mockAndVisit();
  
      // Book an event
      cy.getEventByName(eventName).contains('Sign Up').click();
      cy.confirmDialog();
  
      // Check the event to be booked
      cy.getEventByName(eventName).contains('You are in').should('be.visible');
  
      // Check the event to be booked after reloading the page
      cy.reload();
      cy.getEventByName(eventName).contains('You are in').should('be.visible');
  
      // Check cancel book
      cy.getEventByName(eventName).contains('You are in').click();
      cy.confirmDialog();
      cy.getEventByName(eventName).contains('Sign Up').should('be.visible');
    });
  
    it('booked events on second tab', () => {
      cy.mockAndVisit();
  
      // Check "My Events" is empty
      cy.contains('My Events').click();
      cy.contains("You don't have booked events").should('be.visible');
  
      // Go to "All events" and book an event
      cy.contains('All Events').click();
      cy.getEventByName(eventName)
        .contains('Sign Up')
        .click();
      cy.confirmDialog();
  
      // Go to "My events" and check the booked event is there
      cy.contains('My Events').click();
      cy.getEventByName(eventName)
        .contains('You are in')
        .should('be.visible');
  
      // Cancel book and list should be empty
      cy.getEventByName(eventName)
        .contains('You are in')
        .click();
      cy.confirmDialog();
      cy.contains("You don't have booked events").should('be.visible');
    });
  });
  