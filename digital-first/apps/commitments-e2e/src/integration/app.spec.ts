import { getGreeting } from '../support/app.po';

describe('commitments', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to commitments!');
  });
});
