import LoginPage from "../../Pages/LoginPage";
import HomePage from "../../Pages/HomePage";
import ForgotPasswordPage from "../../Pages/ForgotPasswordPage";

describe('Login Page tests', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    afterEach(() => {
        cy.visit('/login')
    })

    it('login with valid credentials', () => {
        
        cy.fixture('validLoginData').then((data) => {
            
            LoginPage.login(data.username, data.password)

            HomePage.dashboardTitle
                .should('have.text', data.expectedText)
        })
    });

    it('login with invalid credentials', () => {
        
        cy.fixture('invalidLoginData').then((data) => {
            
            LoginPage.login(data.username, data.password)
            LoginPage.alertText
                .should('have.text', data.expectedText)
        })
    });

})