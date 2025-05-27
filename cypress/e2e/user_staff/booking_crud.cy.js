it('should create a test staff', () => {
    cy.createTestStaff();
});

describe('Booking crud flow', () => {

    const startTime = '13:15';
    const endTime = '13:45';

    const startTimeUpdate = '14:15';
    const endTimeUpdate = '14:45';

    const bookingDate = '2025-05-27';
    const bookingDateUpdate = '2025-05-28';

    beforeEach(() => {
        cy.fixture('staff_form').then((user) => {
            cy.login(user.email, user.password);
        });

        Cypress.on('uncaught:exception', (err) => {
            if (err.message.includes('showPicker')) {
                return false;
            }
        });
    });

    it('should create a booking', () => {
        cy.url().should('include', '/bookings');
        cy.get('[data-cy="create-booking-btn"]').click();
        cy.fixture('booking_form').then((booking) => {
            cy.get('[data-cy="customer-name"]').type(booking.customerName);
            cy.get('[data-cy="customer-phone"]').type(booking.customerPhone);
        });

        cy.get('[data-cy="start-date"]').clear().type(bookingDate).blur();
        cy.get('[data-cy="start-time"]').clear().type(`${startTime}`).blur();
        cy.get('[data-cy="end-time"]').clear().type(`${endTime}`).blur();
        cy.get('[data-cy="confirm-button"]').click();
    });

    it('should edit a booking', () => {
        const bookingTimeLabel = `${startTime} - ${endTime}`;

        cy.get('[data-cy="booking-date-input"]').clear().type(bookingDate).blur();
        cy.contains('button', bookingTimeLabel).last().click();

        cy.fixture('booking_form').then((booking) => {
            cy.get('[data-cy="customer-name"]').should('contain.text', booking.customerName);
        });

        cy.get('[data-cy="update-booking-btn"]').click();

        cy.get('[data-cy="start-date"]').type(bookingDateUpdate).blur();
        cy.get('[data-cy="start-time"]').type(`${startTimeUpdate}`).blur();
        cy.get('[data-cy="end-time"]').type(`${endTimeUpdate}`).blur();

        cy.get('[data-cy="save-btn"]').click();
    });

    after(() => {
        cy.deleteTestStaff();
    });
});
