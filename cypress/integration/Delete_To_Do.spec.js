/// <reference types="Cypress" />

describe('Delete ToDo', () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it('Delete a todo', () => {
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(0)
        })
        cy.get("input[name='inputTodo']").type("Buy Apple{enter}")
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(1)
        })
        cy.contains("div.content", "Buy Apple").click()
        cy.get("div.todo").should("have.class", "done")
        cy.contains("div.content", "Buy Apple").next().click()
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(0)
        })
    });

});