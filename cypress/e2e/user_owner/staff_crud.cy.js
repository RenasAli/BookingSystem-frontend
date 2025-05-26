describe('Staff crud flow', () => {
    beforeEach(() => {
        cy.fixture('staff_credentials').then((user) => {
            cy.login(user.email, user.password);
        });
    });

    it('should create a staff member', () => {
        cy.get('[data-cy="staff-button"]').click();
        cy.get('[data-cy="create-staff-button"]').click();

        cy.get('[data-cy="staff-workday-start-1"]').click({ force: true });
        cy.get('[data-cy="staff-workday-start-time-1"]').type('09:00').blur();
        cy.get('[data-cy="staff-workday-end-time-1"]').type('17:00').blur();

        cy.get('[data-cy="cancel-button"]').click();

        cy.get('[data-cy="create-staff-button"]').click();
        cy.fixture('staff_form').then((staff) => {
            cy.get('[data-cy="staff-name"]').type(staff.name);
            cy.get('[data-cy="staff-email"]').type(staff.email);
            cy.get('[data-cy="staff-password"]').type(staff.password);
            cy.get('[data-cy="staff-phone"]').type(staff.phone);
        });

        [1, 3, 4].forEach(day => {
            cy.get(`[data-cy="staff-workday-start-${day}"]`).click({ force: true });
            cy.get(`[data-cy="staff-workday-start-time-${day}"]`).type('09:00').blur();
            cy.get(`[data-cy="staff-workday-end-time-${day}"]`).type('17:00').blur();
        });

        cy.get('[data-cy="submit-button"]').click();
        cy.fixture('staff_form').then((staff) => {
            cy.contains('.chakra-card', staff.name)
        });
    });

    it('should edit a staff member', () => {
        cy.get('[data-cy="staff-button"]').click();
        cy.get('[data-cy="edit-button"]').first().click();

        cy.fixture('staff_form').then((staff) => {
            cy.get('[data-cy="staff-name"]').should('not.have.value', staff.name);
        });

        cy.get('[data-cy="cancel-button"]').click();

        cy.get('[data-cy="edit-button"]').last().click();

        cy.fixture('staff_form').then((staff) => {
            cy.get('[data-cy="staff-name"]').should('have.value', staff.name);

            cy.get('[data-cy="staff-name"]').clear().type(staff.nameUpdate);
            cy.get('[data-cy="staff-email"]').clear().type(staff.emailUpdate);
            cy.get('[data-cy="staff-phone"]').clear().type(staff.phoneUpdate);
        });

        cy.get('[data-cy="staff-workday-start-time-1"]').clear().type('10:00').blur();
        cy.get('[data-cy="staff-workday-end-time-1"]').clear().type('18:00').blur();

        cy.get('[data-cy="staff-workday-start-3"]').click({ force: true });

        cy.get('[data-cy="staff-workday-start-5"]').click({ force: true });
        cy.get('[data-cy="staff-workday-start-time-5"]').type('09:00').blur();
        cy.get('[data-cy="staff-workday-end-time-5"]').type('17:00').blur();

        cy.get('[data-cy="submit-button"]').click();
        cy.fixture('staff_form').then((staff) => {
            cy.contains('.chakra-card', staff.nameUpdate)
        });
    });

    it('should delete a staff member', () => {
        cy.get('[data-cy="staff-button"]').click();

        cy.fixture('staff_form').then((staff) => {
            cy.contains('.chakra-card', staff.nameUpdate)
                .within(() => {
                    cy.get('button[aria-label="Options"]').click();

                    cy.get('[data-cy="delete-button"]').click();
                });

            cy.get('[data-cy="confirm-delete-btn"]').click();
            cy.contains('.chakra-card', staff.nameUpdate).should('not.exist');
        });
    });
});