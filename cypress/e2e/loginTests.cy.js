import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage";
import Properties from "../fixtures/properties"

describe('Login Page tests', () => {

    beforeEach(() => {
        cy.visit(Properties.baseUrl)
    })

    afterEach(() => {
        cy.visit(Properties.baseUrl)
    })

    it('login with valid credentials', () => {
        
        cy.fixture('validLoginData').then((data) => {
            
            LoginPage.login(data.username, data.password)

            HomePage.getDashboardTitle()
                .should('have.text', data.expectedText)
        })
    });

    it('login with invalid credentials', () => {
        
        cy.fixture('invalidLoginData').then((data) => {
            
            LoginPage.login(data.username, data.password)
            LoginPage.getAlertText()
                .should('have.text', data.expectedText)
        })
    });

})