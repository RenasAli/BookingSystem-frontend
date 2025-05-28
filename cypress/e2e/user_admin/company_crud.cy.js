describe('Company crud flow', () => {

    beforeEach(() => {
        cy.fixture('admin_credentials').then((user) => {
            cy.login(user.email, user.password);
        });
    });

    it('should create a company', () => {
        cy.get("[data-cy=company-btn]").click();

        cy.fixture('company_form').then((company) => {
            cy.get('[data-cy="company-name-input"]').type(company.companyName);
            cy.get('[data-cy="cvr-input"]').type(company.cvr);
            cy.get('[data-cy="company-email-input"]').type(company.companyEmail);
            cy.get('[data-cy="company-phone-input"]').type(company.companyPhone);
            cy.get('[data-cy="company-url-input"]').type(company.url);
            cy.get('[data-cy="confirmation-method-select"]')
                .find('option')
                .then(($options) => {
                    const lastValue = $options.last().val();
                    cy.get('[data-cy="confirmation-method-select"]').select(lastValue);
                });

            cy.get('[data-cy="admin-tab"]').click();
            cy.get('[data-cy="admin-email-input"]').type(company.adminEmail);
            cy.get('[data-cy="admin-name-input"]').type(company.adminName);
            cy.get('[data-cy="admin-password-input"]').type(company.adminPassword);

            cy.get('[data-cy="address-tab"]').click();
            cy.get('[data-cy="company-street-input"]').type(company.street);
            cy.get('[data-cy="company-city-input"]').type(company.city);
            cy.get('[data-cy="company-zip-input"]').type(company.zipCode);
        });

        cy.get('[data-cy="open-hours-tab"]').click();
        [1, 2, 3, 4, 5, 6].forEach(day => {
            cy.get(`[data-cy="company-workday-start-${day}"]`).click({ force: true });
            cy.get(`[data-cy="company-workday-start-time-${day}"]`).type('09:00').blur();
            cy.get(`[data-cy="company-workday-end-time-${day}"]`).type('17:00').blur();
        });

        cy.get('[data-cy="submit-button"]').click();

        cy.fixture('company_form').then((company) => {
            cy.contains('td', company.companyName).should('be.visible');
        });
    });

    it('should edit a company', () => {

        cy.fixture('company_form').then((company) => {
            cy.contains('td', company.companyName)
                .parent('tr')
                .find('a[aria-label="Edit"]')
                .click();
        });

        cy.fixture('company_form').then((company) => {
            cy.get('[data-cy="company-name-input"]').clear().type(company.companyNameUpdate);
            cy.get('[data-cy="cvr-input"]').clear().type(company.cvrUpdate);
            cy.get('[data-cy="company-email-input"]').clear().type(company.companyEmailUpdate);
            cy.get('[data-cy="company-phone-input"]').clear().type(company.companyPhoneUpdate);
            cy.get('[data-cy="company-url-input"]').clear().type(company.urlUpdate);

            cy.get('[data-cy="confirmation-method-select"]')
                .find('option')
                .eq(1)
                .then(($option) => {
                    const value = $option.val();
                    cy.get('[data-cy="confirmation-method-select"]').select(value);
                });

            cy.get('[data-cy="admin-tab"]').click();
            cy.get('[data-cy="admin-email-input"]').clear().type(company.adminEmail);

            cy.get('[data-cy="address-tab"]').click();
            cy.get('[data-cy="company-street-input"]').clear().type(company.street);
            cy.get('[data-cy="company-city-input"]').clear().type(company.city);
            cy.get('[data-cy="company-zip-input"]').clear().type(company.zipCode);

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

            cy.fixture('company_form').then((company) => {
                cy.contains('td', company.companyNameUpdate).should('be.visible');
            });
        });
    });

    it('should delete a company', () => {
        cy.fixture('company_form').then((company) => {
            cy.contains('td', company.companyName)
                .parent('tr')
                .find('a[aria-label="Edit"]')
                .click();
        });

        cy.get('[data-cy="delete-btn"]').click();
        cy.get('[data-cy="confirm-dialog-header"]').should('be.visible');
        cy.get('[data-cy="cancel-delete-btn"]').click();

        cy.get('[data-cy="delete-btn"]').click();
        cy.get('[data-cy="confirm-dialog-header"]').should('be.visible');
        cy.get('[data-cy="confirm-delete-btn"]').click();

        cy.fixture('company_form').then((company) => {
            cy.contains('td', company.companyName).should('not.exist');
        });
        cy.wait(10000);
        cy.get("[data-cy=company-btn]").should('be.visible');
    });
});
