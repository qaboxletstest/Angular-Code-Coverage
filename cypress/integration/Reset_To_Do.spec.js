/// <reference types="Cypress" />

describe('Reset ToDo', () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it('No ToDo to reset', () => {
        cy.on("window:alert", text => {
            expect(text).to.eq("No ToDo's to reset!")
        })
        cy.get("input[type='button']").click()
    });

    it('Reset a todo', () => {
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(0)
        })
        cy.get("input[name='inputTodo']").type("Buy Apple{enter}")
        cy.contains("div.content", "Buy Apple").should("be.visible")
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(1)
        })
        cy.get("input[type='button']").click()
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(0)
        })
    });

});