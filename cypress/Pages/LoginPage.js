class LoginPage {

    get usernameInput() {
        return cy.get("input[name='username']")
    }

    get passwordInput() {
        return cy.get("input[name='password']")
    }

    get loginButton() {
        return cy.get("button[type='submit']")
    }

    get alertText() {
        return cy.get(".oxd-alert-content-text")
    }

    get title() {
        return cy.wrap(cy.title())
    }

    get url() {
        return cy.wrap(cy.url())
    }

    login(username, password) {
        this.usernameInput.type(username)
        this.passwordInput.type(password)
        this.loginButton.click()
    }

    clickForgotPasswordLink() {
        cy.clickLink('Forgot your password?')
    }

}

export default new LoginPage()