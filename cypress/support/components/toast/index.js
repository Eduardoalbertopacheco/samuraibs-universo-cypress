
import { el } from './elements'

import toast from '../../components/toast'

class Toast {

    shouldHaveText(expectText) {
        cy.get(el.toast, {timeout: 8000})
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)

    }
}

export default new Toast()