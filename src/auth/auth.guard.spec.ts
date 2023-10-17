import { AuthGuard } from './auth.guard';

describe.skip('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard({} as any, {} as any)).toBeDefined();
  });
});
