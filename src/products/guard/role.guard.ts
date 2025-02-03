import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers.authorization;
        
        if (!authHeader) {
            throw new ForbiddenException('Access Denied: No Token Provided');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new ForbiddenException('Access Denied: Invalid Token');
        }

        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            
            if (decoded.role !== 'admin') {
                throw new ForbiddenException('Access Denied: Only Admins can perform this action');
            }

            return true;
        } catch (error) {
            throw new ForbiddenException('Access Denied: Invalid or Expired Token');
        }
    }
}