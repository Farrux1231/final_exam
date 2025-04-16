import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('You must log in to perform this operation.');
    }

    try {
      const data = this.jwt.verify(token); 

      if (!data) {
        throw new BadRequestException('Invalid token provided.');
      }

      request['user'] = data.id;
      return true;
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token is invalid or expired.');
      }

      throw new BadRequestException(error.message || 'An unknown error occurred.');
    }
  }
}
