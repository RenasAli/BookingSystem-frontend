describe('Admin Authentication Flow', () => {
    beforeEach(() => {
        cy.fixture('admin_credentials').then((user) => {
            cy.login(user.email, user.password);
        });
    });

    it('should log in with valid credentials', () => {
        cy.url().should('include', '/dashboard');
    });

    it('should log out successfully', () => {
        cy.get('[data-cy="logout-button"]').should('be.visible').click();
        cy.url().should('include', '/login');
    });
});
