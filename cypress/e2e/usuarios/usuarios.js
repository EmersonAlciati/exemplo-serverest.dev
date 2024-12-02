const { Given, When, And, Then } = require("cypress-cucumber-preprocessor/steps");
const { fazerLogin } = require("../utils");

Given('eu acesse o sistema', fazerLogin)

// -----------------------------------------------------------------
// --- Adicionar usuário
And('eu acesse a página de usuário', () => {
    cy.get('a[data-testid="cadastrar-usuarios"]').click()
})
And('eu preencha os dados do novo usuário', () => {
    cy.get('input[name="nome"]').type('Meu user 90123')
    cy.get('input[name="email"]').type('meu_user_90123@email.com')
    cy.get('input[name="password"]').type('12345MinhaSenha@')
    cy.get('input[name="administrador"]').click()
})
When('eu pressionar no botão cadastrar', () => {
    cy.get('button[type="submit"]').click()
})
Then('devemos ser direcionados para a página de lista de usuários', () => {
    cy.contains('Lista dos usuários')
    const item = cy.contains('Meu user 90123')
    item.parents('tr').contains('meu_user_90123@email.com')
})


// -----------------------------------------------------------------
// --- Excluir usuário
And('eu acesse a lista de usuários', () => {
    cy.get('a[data-testid="listar-usuarios"]').click()
})
When('eu pressionar o botão de exclusão do usuário', () => {
    cy.contains('Meu user 90123').parents('tr').find('button.btn-danger').click()
})
Then('o usuário não deverá existir na lista de usuários', () => {
    cy.contains('Meu user 90123').should('not.exist')
})



