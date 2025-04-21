import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decoration/user.decoration';
// import { UserRole } from '@prisma/client';
import { Role } from 'Role/user.role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log(user);
    console.log(requiredRoles);
    
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient permissions!');
    }

    return true;
  }
}
