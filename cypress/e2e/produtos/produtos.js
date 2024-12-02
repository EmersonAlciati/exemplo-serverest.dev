const { Given, When, And, Then } = require("cypress-cucumber-preprocessor/steps");
const { fazerLogin } = require("../utils");

Given('eu acesse o sistema', fazerLogin)

// -----------------------------------------------------------------
// --- Adicionar produtos
And('eu acesse a página de produtos', () => {
    cy.get('a[data-testid="cadastrarProdutos"]').click()
})
And('eu preencha os dados do novo produto', () => {
    cy.get('input[name="nome"]').type('Cadeira vermelha')
    cy.get('input[name="price"]').type('149')
    cy.get('textarea[name="description"]').type('Cadeira vermelha confortável para você')
    cy.get('input[name="quantity"]').type('10')
    cy.get('input[name="imagem"]').selectFile('./cypress/e2e/produtos/cadeira-eiffel-vermelha.webp')
})
When('eu pressionar no botão cadastrar', () => {
    cy.get('button[type="submit"]').click()
})
Then('devemos ser direcionados para a página de lista de produtos', () => {
    cy.contains('Lista dos Produtos')
    const item = cy.contains('Cadeira vermelha')
    item.parents('tr').contains('149')
    item.parents('tr').contains('10')
    item.parents('tr').contains(/Cadeira vermelha confort.vel para voc./ig)
})

// -----------------------------------------------------------------
// --- Excluir produtos
And('eu acesse a lista de produtos', () => {
    cy.get('a[data-testid="listar-produtos"]').click()
})
When('eu pressionar o botão de exclusão do produto', () => {
    cy.contains('Cadeira vermelha').parents('tr').find('button.btn-danger').click()
})
Then('o produto não deverá existir na lista de produtos', () => {
    cy.contains('Cadeira vermelha').should('not.exist')
})
