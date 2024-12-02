const { Given, When, And, Then } = require("cypress-cucumber-preprocessor/steps");
const { fazerLoginApi } = require("../utils");

let token = '';
const headers = (token) => ({
    'Content-Type': 'application/json',
    Authorization: token ,
});

Given('eu acesse o sistema por API', () => {
    const url = Cypress.env('serverest_url_api');
    const dados = {
        email: Cypress.env('serverest_user'),
        password: Cypress.env('serverest_pass'),
    };
    cy.request('POST', `${url}/login`, dados).then(resp => {
        token = resp.body.authorization;
    });
    // const resp = await cy.request('POST', `${url}/login`, dados)
    // token = resp.body.authorization;

})

// -----------------------------------------------------------------
// --- Adicionar Produto
When('eu enviar requisição para cadastro de produto', () => {
    const url = Cypress.env('serverest_url_api');
    const dados = {
        nome: 'Cadeira Amarela',
        preco: 190,
        descricao: 'Cadeira Amarela confortável para você',
        quantidade: 10,
    };
    cy.request({
        url: `${url}/produtos`,
        method: 'POST',
        headers: headers(token),
        body: dados,
    })
})
Then('o produto deverá existir', () => {
    const url = Cypress.env('serverest_url_api');
    cy.request({
        url: `${url}/produtos?nome=Cadeira Amarela`,
        method: 'GET',
        headers: headers(token),
    }).then(resp => {
        expect(resp.body.quantidade).to.equal(1)
        expect(resp.body.produtos[0].nome).to.equal('Cadeira Amarela')
        expect(resp.body.produtos[0].preco).to.equal(190)
        expect(resp.body.produtos[0].descricao).to.equal('Cadeira Amarela confortável para você')
        expect(resp.body.produtos[0].quantidade).to.equal(10)
    })
})

// -----------------------------------------------------------------
// --- Consultar produto
let produto = null;
When('eu buscar produto criado', () => {
    const url = Cypress.env('serverest_url_api');
    cy.request({
        url: `${url}/produtos?nome=Cadeira Amarela`,
        method: 'GET',
        headers: headers(token),
    }).then(resp => {
        produto = resp.body.produtos[0]
    })
})
Then('o produto deverá existir', () => {
    expect(produto.nome).to.equal('Cadeira Amarela')
    expect(produto.preco).to.equal(190)
    expect(produto.descricao).to.equal('Cadeira Amarela confortável para você')
    expect(produto.quantidade).to.equal(10)
})

// -----------------------------------------------------------------
// --- Excluir produtos
let produtoID = 0;
And('eu buscar o ID do produto', () => {
    const url = Cypress.env('serverest_url_api');
    cy.request({
        url: `${url}/produtos?nome=Cadeira Amarela`,
        method: 'GET',
        headers: headers(token),
    }).then(resp => {
        produtoID = resp.body.produtos[0]._id
    })
})
When('eu enviar requisição para excluir o produto', () => {
    const url = Cypress.env('serverest_url_api');
    cy.request({
        url: `${url}/produtos/${produtoID}`,
        method: 'DELETE',
        headers: headers(token),
    })
})
Then('o produto não deverá existir', () => {
    const url = Cypress.env('serverest_url_api');
    cy.request({
        url: `${url}/produtos?nome=Cadeira Amarela`,
        method: 'GET',
        headers: headers(token),
    }).then(resp => {
        expect(resp.body.quantidade).to.equal(0)
    })
})


