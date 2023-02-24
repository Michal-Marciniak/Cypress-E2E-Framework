class HomePage {
  
    get dashboardTitle() {
        return cy.get(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
    }
    
}

export default new HomePage()