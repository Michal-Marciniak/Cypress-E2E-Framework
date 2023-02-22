class HomePage {

    dashboardTitle = ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module"

    getDashboardTitle() {
        return cy.get(this.dashboardTitle)
    }
}

export default new HomePage()