Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:5173/login');
  cy.get('[data-cy="email"]').clear().type(email);
  cy.get('[data-cy="password"]').clear().type(password);
  cy.get('[data-cy="login-button"]').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('createTestStaff', () => {
  cy.fixture('staff_credentials').then((user) => {
    cy.login(user.email, user.password);
  });
  cy.get('[data-cy="staff-button"]').click();
  cy.get('[data-cy="create-staff-button"]').click();

  cy.fixture('staff_form').then((staff) => {
    cy.get('[data-cy="staff-name"]').type(staff.name);
    cy.get('[data-cy="staff-email"]').type(staff.email);
    cy.get('[data-cy="staff-password"]').type(staff.password);
    cy.get('[data-cy="staff-phone"]').type(staff.phone);

    [1, 3, 4].forEach(day => {
      cy.get(`[data-cy="staff-workday-start-${day}"]`).click({ force: true });
      cy.get(`[data-cy="staff-workday-start-time-${day}"]`).type('09:00').blur();
      cy.get(`[data-cy="staff-workday-end-time-${day}"]`).type('17:00').blur();
    });

    cy.get('[data-cy="submit-button"]').click();

    cy.contains('.chakra-card', staff.name);
  });
});

Cypress.Commands.add('deleteTestStaff', () => {
  cy.fixture('staff_credentials').then((user) => {
    cy.login(user.email, user.password);
  });

  cy.get('[data-cy="staff-button"]').click();

  cy.fixture('staff_form').then((staff) => {
    cy.contains('.chakra-card', staff.name)
      .within(() => {
        cy.get('button[aria-label="Options"]').click();

        cy.get('[data-cy="delete-button"]').click();
      });
    cy.get('[data-cy="confirm-delete-btn"]').click();
    cy.contains('.chakra-card', staff.nameUpdate).should('not.exist');
  });
});
