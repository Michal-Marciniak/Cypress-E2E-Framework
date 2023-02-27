describe('CRUD Tests', () => {

    let token = ""
    let bio = ""
    let image = ""
    let article_slug = ""
    let baseUrl = Cypress.env('baseUrl')

    it('GET - verifying getting popular tags', () => {

        cy.intercept('GET', baseUrl + '/tags').as('getTags')
        // by visiting this site, the get request will be sent automatically
        cy.visit('https://angular.realworld.io/')
        
        cy.wait('@getTags').then((req) => {
            //console.log(req)
            cy.fixture('tags').then((data) => {
                
                expect(req.state).to.equal(data.state)
                expect(req.response.statusCode).to.equal(data.statusCode)
                expect(req.response.statusMessage).to.equal(data.statusMessage)
                expect(req.response.body.tags).to.be.an(data.tags_type)
                expect(req.response.body.tags).to.deep.equal(data.tags)
            })
        })
    });

    it('POST - login to application', () => {
        
        cy.fixture('registerData').then((data) => {
            cy.request({
                method: "POST",
                url: baseUrl + "/users/login",
                body: {
                    "user": {
                        "email": data.user.email,
                        "password": data.user.password
                    }
                }
            })
            .then((response) => {
                //console.log(response)
                image = response.body.user.image
                token = response.body.user.token
                expect(response.status).to.equal(200)
            })
        })

    });

    it.skip('POST - verifying succssesful registering new user', () => {
        
        cy.intercept('POST', baseUrl + '/users').as('signup')
        cy.visit('https://angular.realworld.io/')
        cy.get('[routerlink="/register"]').click()
        cy.fixture('registerData').then((data) => {
            
            cy.get('[placeholder="Username"]').clear().type(data.user.username)
            cy.get('[placeholder="Email"]').clear().type(data.user.email)
            cy.get('[placeholder="Password"]').clear().type(data.user.password)
            cy.get('[type="submit"]').click()

            cy.wait('@signup').then((req) => {
                //console.log(req)
                expect(req.state).to.equal(data.state)
                expect(req.response.statusCode).to.equal(data.statusCode)
                expect(req.response.statusMessage).to.equal(data.statusMessage)
                expect(req.response.body.user.email).to.equal(data.user.email)
                expect(req.response.body.user.username).to.equal(data.user.username)
                expect(req.response.headers['content-type']).to.include(data.response_headers.content_type)
                image = req.response.body.user.image
                token = req.response.body.user.token
            })
        })
    });

    it('POST - verifying unsuccssesful registering with existing data', () => {
        
        cy.intercept('POST', baseUrl + '/users').as('signup')
        cy.visit('https://angular.realworld.io/')
        cy.get('[routerlink="/register"]').click()
        cy.fixture('registerData').then((data) => {
            
            cy.get('[placeholder="Username"]').clear().type(data.user.username)
            cy.get('[placeholder="Email"]').clear().type(data.user.email)
            cy.get('[placeholder="Password"]').clear().type(data.user.password)
            cy.get('[type="submit"]').click()

            cy.wait('@signup').then((req) => {
                //console.log(req)
                cy.get('.error-messages > :nth-child(1)').should('contain', 'email has already been taken')
                cy.get('.error-messages > :nth-child(2)').should('contain', 'username has already been taken')
                expect(req.response.statusCode).to.equal(data.invalidStatusCode)
                expect(req.response.statusMessage).to.equal(data.invalidStatusMessage)
                expect(req.response.body.errors.email).to.deep.equal(data.errors.email)
                expect(req.response.body.errors.username).to.deep.equal(data.errors.username)
            })
        })
    });

    it('PUT - verifying updating user data', () => {

        cy.intercept('PUT', baseUrl + '/user').as('update')
        cy.visit('https://angular.realworld.io/')
        cy.get('[routerlink="/login"]').click()
        cy.fixture('registerData').then((data) => {
            
            cy.get('[placeholder="Email"]').clear().type(data.user.email)
            cy.get('[placeholder="Password"]').clear().type(data.user.password)
            cy.get('[type="submit"]').click()
            cy.get('[routerlink="/settings"]').click()
            cy.get('[formcontrolname="bio"]').clear().type(data.user.bio)
            cy.get('[type="submit"]').click()

            cy.wait('@update').then((req) => {
                //console.log(req)
                expect(req.state).to.equal(data.state)
                expect(req.response.statusCode).to.equal(data.statusCode)
                expect(req.response.statusMessage).to.equal(data.statusMessage)
                expect(req.response.body.user.bio).to.equal(data.user.bio)
                expect(req.response.body.user.email).to.equal(data.user.email)
                expect(req.response.body.user.image).to.equal(image)
                expect(req.response.body.user.username).to.equal(data.user.username)
                token = req.response.body.user.token
                bio = req.response.body.user.bio
            })
        })
    })

    it('POST - creating new article only through backend', () => {
        
        cy.fixture('article').then((data) => {
            cy.request({
                method: "POST",
                url: "https://api.realworld.io/api/articles/",
                headers: {
                    'authorization': 'Token ' + token
                },
                body: data
            })
            .then((response) => {
                //console.log(response)
                article_slug = response.body.article.slug
                expect(response.status).to.equal(200)
            })
        })
    });

    it('DELETE - delete last added article only through backend', () => {
        
        cy.request({
            method: "DELETE",
            url: baseUrl + '/articles/' + article_slug,
            headers: {
                'authorization': 'Token ' + token
            }
        })
        .then((response) => {
            console.log(response)
            expect(response.status).to.equal(204)
        })

    });

})