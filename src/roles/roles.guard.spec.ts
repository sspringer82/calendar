import { RolesGuard } from './roles.guard';

describe.skip('RolesGuard', () => {
  it('should be defined', () => {
    expect(new RolesGuard({} as any)).toBeDefined();
  });
});
