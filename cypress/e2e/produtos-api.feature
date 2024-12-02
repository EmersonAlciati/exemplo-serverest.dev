
Feature: Testes de Produtos por API
    Scenario: Criar um Produto
        Given eu acesse o sistema por API
        When eu enviar requisição para cadastro de produto
        Then o produto deverá existir
        
    Scenario: Consultar um Produto
        Given eu acesse o sistema por API
        When eu buscar produto criado
        Then o produto deverá existir
        
    Scenario: Excluir um Produto
        Given eu acesse o sistema por API
        And eu buscar o ID do produto
        When eu enviar requisição para excluir o produto
        Then o produto não deverá existir