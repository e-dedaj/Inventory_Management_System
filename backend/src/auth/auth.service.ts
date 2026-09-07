import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(body: any) {
    const { username, password } = body;

    if (username === 'admin' && password === 'admin123') {
      return { token: 'token-fiktiv-admin-123', role: 'Admin' };
    } else if (username === 'staf' && password === 'staf123') {
      return { token: 'token-fiktiv-staf-123', role: 'Staff' };
    }

    throw new UnauthorizedException('Përdoruesi ose fjalëkalimi është gabim!');
  }
}