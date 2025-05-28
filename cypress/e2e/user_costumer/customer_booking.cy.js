describe('Create Booking as Customer', () => {
    it('should create a booking with valid details', () => {
        cy.visit('http://localhost:5173/public/booking/test-salon');

        cy.contains('Åbningstider:').should('be.visible');
        cy.contains('Kontakt os').should('be.visible');
        cy.contains('Adresse:').should('be.visible');

        cy.get('[data-cy="service-select"]')
            .find('option')
            .then(($options) => {
                const lastValue = $options.last().val();
                cy.get('[data-cy="service-select"]').select(lastValue);
            });
        trySelectFirstAvailableSlot();
        cy.get('[data-cy="submit-button"]', { timeout: 500 }).should('be.visible');

        cy.get('[data-cy="back-button"]').click();
        trySelectFirstAvailableSlot();
        cy.get('[data-cy="submit-button"]', { timeout: 500 }).should('be.visible');

        cy.fixture('booking_form').then((user) => {
            cy.get('[data-cy="customer-name"]').type(user.customerName)
            cy.get('[data-cy="customer-phone"]').type(user.customerPhone)
        });

        cy.get('[data-cy="submit-button"]').click();
    });
});

const maxAttempts = 10;

function trySelectFirstAvailableSlot(attempt = 1) {
    if (attempt > maxAttempts) {
        throw new Error('No available time slots found');
    }

    cy.get('button.chakra-button:not([disabled])')
        .should('exist')
        .then(($buttons) => {
            const matching = [...$buttons].filter((el) =>
                /^\d{2}\:\d{2}$/.test(el.innerText)
            );

            if (matching.length) {
                cy.wrap(matching[0]).scrollIntoView().click();
                cy.wait(200);
            } else {
                cy.get('button[aria-label="Next"]').click();
                cy.wait(500);
                trySelectFirstAvailableSlot(attempt + 1);
            }
        });
}
