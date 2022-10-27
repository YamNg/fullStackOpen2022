describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // create users
    const user = {
      name: 'Test User',
      username: 'root',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'Test User2',
      username: 'root2',
      password: '234567'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.get('button').should('contain', 'login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#loginForm').as('loginForm')

      cy.get('@loginForm').get('#username').type('root')
      cy.get('@loginForm').get('#password').type('123456')
      cy.get('@loginForm').get('#loginBtn').click()
      cy.contains('Test User logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#loginForm').as('loginForm')

      cy.get('@loginForm').get('#username').type('root')
      cy.get('@loginForm').get('#password').type('wrongPassword')
      cy.get('@loginForm').get('#loginBtn').click()
      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      cy.login({ username: 'root', password: '123456' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#createBlogForm').as('createBlogForm')

      cy.get('@createBlogForm').get('#title').type('Blog created by Cypress')
      cy.get('@createBlogForm').get('#author').type('Test User')
      cy.get('@createBlogForm').get('#url').type('http://www.google.com')
      cy.get('@createBlogForm').get('#createBlogBtn').click()
      cy.get('.notification')
        .should('contain', 'a new blog Blog created by Cypress by Test User added')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')

      cy.get('.blog')
        .eq(0)
        .should('contain', 'Blog created by Cypress')
        .should('contain', 'view')
    })

    describe('and a blog exists', function (){

      beforeEach(function() {
        cy.createBlog({ title: 'Blog created by Cypress', author: 'Test User', url: 'http://www.google.com' })
      })

      it('it can be liked', function() {
        cy.get('.blog').eq(0).as('firstBlog')

        cy.get('@firstBlog')
          .get('.showBlogBtn')
          .click()

        cy.get('@firstBlog')
          .get('.likeBlogBtn')
          .click()

        cy.get('.notification')
          .should('contain', 'blog Blog created by Cypress updated')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
          .should('have.css', 'border-style', 'solid')

        cy.get('@firstBlog')
          .get('.blogDetail')
          .should('contain', 'likes: 1')
      })

      it('it can be deleted by the created user', function() {
        cy.get('.blog').eq(0).as('firstBlog')

        cy.get('@firstBlog')
          .get('.showBlogBtn')
          .click()

        cy.get('@firstBlog')
          .get('.deleteBlogBtn')
          .click()

        cy.get('.notification')
          .should('contain', 'blog Blog created by Cypress deleted')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
          .should('have.css', 'border-style', 'solid')

        cy.get('.blog').should('not.exist')
      })

      it('it cannot be deleted by user other than the one created it', function() {
        cy.login({ username: 'root2', password: '234567' })

        cy.get('.blog').eq(0).as('firstBlog')

        cy.get('@firstBlog')
          .get('.showBlogBtn')
          .click()

        cy.get('@firstBlog')
          .get('.deleteBlogBtn')
          .should('not.exist')
      })

    })

    describe('and multiple blogs exists', function (){

      beforeEach(function() {
        cy.createBlog({ title: 'Blog 1', author: 'Test User', url: 'http://www.google.com' })
        cy.createBlog({ title: 'Blog 2', author: 'Test User', url: 'http://www.google.com' })
      })

      it('they are ordered by like count in descending order', function() {
        cy.get('.blog').eq(0).as('firstBlog')
        cy.get('.blog').eq(1).as('secondBlog')

        cy.get('@secondBlog')
          .find('.showBlogBtn')
          .click()

        Cypress._.times(5, () => {
          cy.get('@secondBlog')
            .find('.likeBlogBtn')
            .click()
            .wait(500)
        })

        cy.get('@secondBlog')
          .find('.showBlogBtn')
          .click()

        cy.get('@firstBlog')
          .find('.showBlogBtn')
          .click()

        Cypress._.times(2, () => {
          cy.get('@firstBlog')
            .find('.likeBlogBtn')
            .click()
            .wait(500)
        })

        cy.get('@firstBlog')
          .find('.showBlogBtn')
          .click()

        cy.get('.blog').eq(0)
          .contains('Blog 2')

        cy.get('.blog').eq(1)
          .contains('Blog 1')
      })

    })
  })

})