
export const fazerLogin = () => {
    // primeiro precisamos fazer login em todos os testes
    cy.visit( Cypress.env('serverest_url') )
    cy.get("#email").type( Cypress.env('serverest_user') )
    cy.get("#password").type( Cypress.env('serverest_pass') )
    cy.get('button[type="submit"]').click()
};

export const fazerLoginApi = async() => {
    const url = Cypress.env('serverest_url_api');
    const dados = {
        email: Cypress.env('serverest_user'),
        password: Cypress.env('serverest_pass'),
    };
    return await cy.request('POST', `${url}/login`, dados)
};
