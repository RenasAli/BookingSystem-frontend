describe('Open Hours Update', () => {
    beforeEach(() => {
        cy.fixture('staff_credentials').then((user) => {
            cy.login(user.email, user.password);
        });
    });

    it('should update open hours', () => {
        cy.get('[data-cy="settings-button"]').click();
        cy.get('[data-cy="open-hours-tab"]').click();

        // Unselect days
        [1, 3].forEach(day => {
            cy.get(`[data-cy="company-workday-start-${day}"]`).click({ force: true });
        });

        // Edit open hours for selected days
        [2, 4].forEach(day => {
            cy.get(`[data-cy="company-workday-start-time-${day}"]`).type('08:00').blur();
            cy.get(`[data-cy="company-workday-end-time-${day}"]`).type('16:00').blur();
        });

        // add new days
        [7].forEach(day => {
            cy.get(`[data-cy="company-workday-start-${day}"]`).click({ force: true });
            cy.get(`[data-cy="company-workday-start-time-${day}"]`).type('10:00').blur();
            cy.get(`[data-cy="company-workday-end-time-${day}"]`).type('14:00').blur();
        });

        cy.get('[data-cy="submit-button"]').click();
        cy.url().should('include', '/dashboard/bookings');
    });
});