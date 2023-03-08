
import signupPage from '../support/pages/signup'

describe('Cadastro', function () {

    before(function() {
        cy.fixture('usuariojoao').then(function(usuariojoao){
            this.usuariojoao = usuariojoao
        })

    })

    context.only('quando o usuário é novato', function () {

        before(function () {

            // removendo o usuário para que a massa seja sempre válida
            // a configuração está na pasta 'plugin' npo arquivo 'index.js'
            cy.task('removeUser', this.usuariojoao.email)
                .then(function (result) {
                    console.log(result)
                })

        })

        it('Deve cadastrar usuário com sucesso', function () {

            signupPage.go()
            signupPage.form(this.usuariojoao)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

            // acessando a página de cadastro    
            //cy.visit('/signup')

            // preenchendo e submetendo o formulário de cadastro
            //cy.get('input[placeholder^="Nome"]').type(user.name) //começa com
            //cy.get('input[placeholder$="email"]').type( user.email) //termina com
            //cy.get('input[placeholder*="senha"]').type(user.password) //contem


            // cy.contains('button', 'Cadastrar').click() //aqui o cypress identifica um elemento
            //que contaenha o texto button+Cadastrar e clica.

            // validando o resultado esperado
            // cy.get('.toast')
            // .should('be.visible')
            // .find('p')
            // .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })

    })

    context('quando o email já existe', function () {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'nova2958062',
            is_provider: true
        }

        before(function () {
          cy.postUser(user)

        })

        it('Não deve cadastrar o usuário', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

            //cy.visit('/signup')

            //cy.get('input[placeholder^="Nome"]').type(user.name) //começa com
            //cy.get('input[placeholder$="email"]').type( user.email) //termina com
            //cy.get('input[placeholder*="senha"]').type(user.password) //contem

            //cy.contains('button', 'Cadastrar').click()

            //cy.get('.toast')
            //.should('be.visible')
            //.find('p')
            //.should('have.text', 'Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsaen',
            email: 'elizabeth.com.br',
            password: 'nova2958062'
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {

            it('não deve cadastrar com a senha: ' + p, function () {

                const user = {
                    name: 'Jason Friday',
                    email: 'jason@gmail.com',
                    password: p
                }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')

        })
    })

    context('quando não preencho nenhun dos campos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert){
            it('deve exibir ' + alert.toLowerCase(), function(){
                signupPage.alert.haveText(alert)
            })
        })

    })

})
