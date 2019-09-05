import { getGreeting } from '../support/app.po';

describe('policy-briefs', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to policy-briefs!');
  });
});
