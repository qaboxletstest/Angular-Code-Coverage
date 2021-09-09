/// <reference types="Cypress" />

describe('Load ToDo', () => {

    beforeEach(() => {
        const todo = [{
            completed: false,
            content: "Loaded Programatically"
        }]
        cy.window().should(win => {
            win.localStorage.setItem("todos", JSON.stringify(todo))
        })
        cy.visit("/")
    })

    it('Load todo on startup', () => {
        cy.contains("div.content", "Loaded Programatically").should("be.visible")
    });

});