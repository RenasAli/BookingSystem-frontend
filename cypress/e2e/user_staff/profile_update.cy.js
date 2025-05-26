it('should create a test staff', () => {
    cy.createTestStaff();
});

describe('Profile update flow', () => {

    beforeEach(() => {
        cy.fixture('staff_form').then((user) => {
            cy.login(user.email, user.password);
        });
    });

    it('should update profile information', () => {
        cy.get('[data-cy="profile-button"]').click();

        cy.get('[data-cy="workdays-heading"]').should('be.visible');

        cy.fixture('staff_form').then((profile) => {
            cy.get('[data-cy="profile-email"]').clear().type(profile.emailUpdate);
            cy.get('[data-cy="profile-phone"]').clear().type(profile.phoneUpdate);
        });

        cy.get('[data-cy="save-button"]').click();
    });

    after(() => {
        cy.deleteTestStaff();
    });
}); 