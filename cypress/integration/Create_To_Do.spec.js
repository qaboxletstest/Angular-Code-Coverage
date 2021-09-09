/// <reference types="Cypress" />

describe('Verify Home Page and Create ToDo', () => {

    beforeEach(() => {
        cy.visit("/")
    })

    it('Verify H1', () => {
        cy.get("h1").should("have.text", "QA BOX LET'S TEST")
    });

    it('Verify H3', () => {
        cy.get("h3").should("have.text", "Angular ToDo")
    });

    it('Verify alert while adding an empty task', () => {
        cy.on("window:alert", text => {
            expect(text).to.eq("Error; Add ToDo!")
        })
        cy.get("input[name='inputTodo']").type("{enter}")
    });

    it('Add a task using enter', () => {
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(0)
        })
        cy.get("input[name='inputTodo']").type("Buy Apple{enter}")
        cy.contains("div.content", "Buy Apple").should("be.visible")
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(1)
        })
    });

    it('Add a task using Submit button', () => {
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(0)
        })
        cy.get("input[name='inputTodo']").type("Buy Milk")
        cy.get("input[type='submit']").click()
        cy.contains("div.content", "Buy Milk").should("be.visible")
        cy.window().should(win => {
            expect(JSON.parse(win.localStorage.getItem("todos")).length).to.eq(1)
        })
    });
});