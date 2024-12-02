
Feature: Testes de Produtos
    Scenario: Criar um Produto
        When eu acesse o sistema
        And eu acesse a página de produtos
        And eu preencha os dados do novo produto
        When eu pressionar no botão cadastrar
        Then devemos ser direcionados para a página de lista de produtos
        
    Scenario: Excluir um Produto
        When eu acesse o sistema
        And eu acesse a lista de produtos
        When eu pressionar o botão de exclusão do produto
        Then o produto não deverá existir na lista de produtos


