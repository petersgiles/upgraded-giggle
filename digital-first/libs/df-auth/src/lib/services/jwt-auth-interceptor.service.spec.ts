import { TestBed } from '@angular/core/testing';

import { JwtAuthInterceptorService } from './jwt-auth-interceptor.service';

describe('JwtAuthInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtAuthInterceptorService = TestBed.get(
      JwtAuthInterceptorService
    );
    expect(service).toBeTruthy();
  });
});
