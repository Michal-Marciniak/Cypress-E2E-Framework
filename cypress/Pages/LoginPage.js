class LoginPage {

    usernameInput = "input[name='username']"
    passwordInput = "input[name='password']"
    loginButton   = "button[type='submit']"
    alertText     = ".oxd-alert-content-text"

    login(username, password) {
        cy.get(this.usernameInput).type(username)
        cy.get(this.passwordInput).type(password)
        cy.get(this.loginButton).click()
    }

    clickForgotPasswordLink() {
        cy.clickLink('Forgot your password?')
    }

    getTitle() {
        return cy.wrap(cy.title())
    }

    getUrl() {
        return cy.wrap(cy.url())
    }

    getAlertText() {
        return cy.get(this.alertText)
    }
}

export default new LoginPage()