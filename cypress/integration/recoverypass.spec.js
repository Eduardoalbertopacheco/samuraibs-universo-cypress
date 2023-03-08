
import forgotPasspage from '../support/pages/forgotpass'
import rpPage from '../support/pages/resetpass'

describe('resgate de senha', function () {


    before(function () {
        cy.fixture('recovery').then(function (recovery) {
            this.data = recovery
        })
    })

    context('quando o usuário esquece a senha', function () {

        before(function () {
            cy.postUser(this.data)
        })

        it('deve poder resgatar por emial', function () {
            forgotPasspage.go()
            forgotPasspage.form(this.data.email)
            forgotPasspage.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'

            forgotPasspage.toast.shouldHaveText(message)

            //cy.wait(7000)
        })
    })

    context('quando o usuário solicita o resgate de senha', function () {

        before(function () {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it('deve poder cadastrar uma nova senha', function () {

            const token = Cypress.env('recoveryToken')

            rpPage.go(token)
            rpPage.form('abc123', 'abc123')
            rpPage.submit()

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.toast.shouldHaveText(message)

            //cy.wait(5000)
        })
    })
})