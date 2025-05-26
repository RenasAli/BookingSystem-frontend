describe('Login as Staff', () => {
    it('should log in with valid credentials', () => {
        cy.fixture('staff_credentials').then((user) => {
            cy.login(user.email, user.password);
        });
    });
});
