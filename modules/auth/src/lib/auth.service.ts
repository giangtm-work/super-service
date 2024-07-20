import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UsersService } from '@super-service/users';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@super-service/users';
import { UsersRolesService } from '@super-service/users-roles';
import { jwtConstants } from './constants';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersRolesService: UsersRolesService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken) private readonly refreshTokenRepository: Repository<RefreshToken>
  ) {}

  validateUser(username: string, password: string): Promise<User | null> {
    return this.usersService.validateUser(username, password);
  }

  login(user: User) {
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const roles = await this.usersRolesService.getActiveRolesForUser(user.id);
    const payload = { username: user.username, sub: user.id, roles };
    // https://github.com/auth0/node-jsonwebtoken#usage
    const accessToken = this.jwtService.sign(payload, { expiresIn: jwtConstants.expiresIn });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: jwtConstants.refreshExpiresIn });
    await this.addRefreshToken(user.id, refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async refresh(refreshToken: string) {
    const storedToken = await this.refreshTokenRepository.findOneBy({ token: refreshToken });
    if (!storedToken) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.verify(refreshToken);
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }

    await this.removeRefreshToken(user.id, refreshToken);
    return this.generateToken(user);
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    await this.removeRefreshToken(userId, refreshToken);
  }

  async logoutAll(userId: string): Promise<void> {
    await this.removeAllRefreshTokens(userId);
  }

  async validateRefreshToken(userId: string, token: string): Promise<User | null> {
    const refreshToken = await this.refreshTokenRepository.findOneBy({ userId, token });
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    return this.usersService.findById(userId);
  }

  async addRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const newRefreshToken = this.refreshTokenRepository.create({ token: refreshToken, userId });
    await this.refreshTokenRepository.save(newRefreshToken);
  }

  async removeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.delete({ userId, token: refreshToken });
  }

  async removeAllRefreshTokens(userId: string): Promise<void> {
    await this.refreshTokenRepository.delete({ userId });
  }

  async register(createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }
}
