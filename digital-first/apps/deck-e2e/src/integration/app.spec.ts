import '@testing-library/cypress/add-commands'
describe('deck', () => {
  beforeEach(() => cy.visit('/'))

  it('should be able to create new deck item', () => {
    // find the 'create new card' feature and invoke it
    cy.getByText('Create New Card').click()

    // set the title and save it
    cy.getByLabelText('Title')
      .clear()
      .type('should be able to create new deck item')

    cy.getByText('Save').click()

    // assert that the new card is present
    cy.getByText(/should be able to create new deck item/i).should('be.visible')
  })
})
