import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export const ROLES = 'roles';
export const Roles = (...args: Role[]) => SetMetadata(ROLES, args);
