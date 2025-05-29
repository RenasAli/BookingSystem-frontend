describe('Service crud flow', () => {
    beforeEach(() => {
        cy.fixture('staff_credentials').then((user) => {
            cy.login(user.email, user.password);
        });
    });

    it('should create a service', () => {
        cy.get('[data-cy="services-button"]').click();
        cy.get('[data-cy="create-service-button"]').click();

        cy.fixture('service_form').then((service) => {
            cy.get('[data-cy="service-name"]').type(service.name);
        });

        cy.get('[data-cy="close-button"]').click();
        cy.get('[data-cy="create-service-button"]').click();

        cy.fixture('service_form').then((service) => {
            cy.get('[data-cy="service-name"]').type(service.name);
            cy.get('[data-cy="service-description"]').type(service.description);
            cy.get('[data-cy="service-price"]').type(service.price);
            cy.get('[data-cy="service-duration"]').type(service.duration);
        });

        cy.get('[data-cy="submit-button"]').click();

        cy.fixture('service_form').then((service) => {
            cy.contains('.chakra-card', service.name)
        });
    });

    it('should edit a service', () => {
        cy.get('[data-cy="services-button"]').click();
        cy.get('[data-cy="edit-button"]').first().click();

        cy.fixture('service_form').then((service) => {
            cy.get('[data-cy="service-name"]').should('not.have.value', service.name);
        });

        cy.get('[data-cy="close-button"]').click();

        cy.get('[data-cy="edit-button"]').last().click();

        cy.fixture('service_form').then((service) => {
            cy.get('[data-cy="service-name"]').should('have.value', service.name);

            cy.get('[data-cy="service-name"]').clear().type(service.nameUpdate);
            cy.get('[data-cy="service-description"]').clear().type(service.descriptionUpdate);
            cy.get('[data-cy="service-price"]').clear().type(service.priceUpdate);
            cy.get('[data-cy="service-duration"]').clear().type(service.durationUpdate);
        });

        cy.get('[data-cy="submit-button"]').click();

        cy.fixture('service_form').then((service) => {
            cy.contains('.chakra-card', service.nameUpdate)
        });
    });

    it('should delete a service member', () => {
        cy.get('[data-cy="services-button"]').click();

        cy.fixture('service_form').then((service) => {
            cy.contains('.chakra-card', service.nameUpdate)
                .within(() => {
                    cy.get('button[aria-label="Options"]').click();

                    cy.get('[data-cy="delete-button"]').click();
                });

            cy.get('[data-cy="confirm-delete-btn"]').click();
            cy.reload();
            cy.contains('.chakra-card', service.nameUpdate).should('not.exist');
        });


    });
});