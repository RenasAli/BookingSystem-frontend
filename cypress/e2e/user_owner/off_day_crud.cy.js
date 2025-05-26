it('should create a test staff', () => {
    cy.createTestStaff();
});

describe('Off Day crud flow', () => {
    const startDate = '2025-05-26';
    const startTime = '00:00';
    const endTime = '23:59';
    const endDate = '2025-05-28';

    const startDateUpdate = '2025-05-27';
    const startTimeUpdate = '14:00';
    const endTimeUpdate = '00:00';
    const endDateUpdate = '2025-05-29';

    beforeEach(() => {
        cy.fixture('staff_credentials').then((user) => {
            cy.login(user.email, user.password);
        });
    });

    it('should create an off day', () => {
        cy.get('[data-cy="off-day-button"]').click();
        cy.get('[data-cy="create-off-day-button"]').click();

        cy.get('[data-cy="select-staff"]')
            .find('option')
            .then(($options) => {
                const lastValue = $options.last().val();
                cy.get('[data-cy="select-staff"]').select(lastValue);
            });

        cy.get('[data-cy="cancel-button"]').click();

        cy.get('[data-cy="create-off-day-button"]').click();

        cy.get('[data-cy="select-staff"]')
            .find('option')
            .then(($options) => {
                const lastValue = $options.last().val();
                cy.get('[data-cy="select-staff"]').select(lastValue);
            });

        cy.get('[data-cy="start-date"]').type(startDate);
        cy.get('[data-cy="start-time"]').type(startTime);
        cy.get('[data-cy="end-time"]').type(endTime);
        cy.get('[data-cy="end-date"]').type(endDate);

        cy.get('.css-7g0xb3 > :nth-child(2)').click();
        cy.get('[data-cy="save-button"]').click();

        cy.fixture('staff_form').then((staff) => {
            cy.contains('.chakra-card', staff.name)
        });
    });

    it('should edit an off day', () => {
        cy.get('[data-cy="off-day-button"]').click();

        cy.get('[data-cy="edit-button"]').click();

        cy.get('[data-cy="start-date"]').type(startDateUpdate);
        cy.get('[data-cy="start-time"]').type(startTimeUpdate);
        cy.get('[data-cy="end-time"]').type(endTimeUpdate);
        cy.get('[data-cy="end-date"]').type(endDateUpdate);

        cy.get('[data-cy="cancel-button"]').click();

        cy.get('[data-cy="edit-button"]').click();

        cy.get('[data-cy="start-date"]').type(startDateUpdate);
        cy.get('[data-cy="start-time"]').type(startTimeUpdate);
        cy.get('[data-cy="end-time"]').type(endTimeUpdate);
        cy.get('[data-cy="end-date"]').type(endDateUpdate);

        cy.get('[data-cy="save-button"]').click();

        cy.fixture('staff_form').then((staff) => {
            cy.contains('.chakra-card', staff.name)
        });
    });

    it('should delete an off day', () => {
        cy.get('[data-cy="off-day-button"]').click();

        cy.fixture('staff_form').then((staff) => {
            cy.contains('.chakra-card', staff.name)
                .within(() => {
                    cy.get('button[aria-label="Options"]').click();

                    cy.get('[data-cy="delete-button"]').click();
                });

            cy.get('[data-cy="confirm-delete-btn"]').click();

            cy.wait(500);
            cy.contains('.chakra-card', staff.name).should('not.exist');
        });
    });

    after(() => {
        cy.deleteTestStaff();
    });
});