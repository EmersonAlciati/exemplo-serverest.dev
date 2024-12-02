
Feature: Testes de Usuários
    Scenario: Criar um Usuário
        When eu acesse o sistema
        And eu acesse a página de usuário
        And eu preencha os dados do novo usuário
        When eu pressionar no botão cadastrar
        Then devemos ser direcionados para a página de lista de usuários
        
    Scenario: Excluir um Usuário
        When eu acesse o sistema
        And eu acesse a lista de usuários
        When eu pressionar o botão de exclusão do usuário
        Then o usuário não deverá existir na lista de usuários


