import { getGreeting } from '../support/app.po';

describe('commitments-reader', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to commitments-reader!');
  });
});
