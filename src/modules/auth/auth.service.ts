import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { User } from '../../database/schemas/user.schema';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.interface';
import { jwtConstants } from '../../common/constants';

@Injectable()
export class AuthService extends BaseService<User, AuthRepository> {
    constructor(
        private readonly authRepository: AuthRepository,
        private jwtService: JwtService,
    ) {
        super(authRepository);
    }
    async Login(dto: LoginDto) {
        try {
            const data = await this.authRepository.findOne(dto);

            if (!data) return null;
            const access_token = await this.jwtService.signAsync(
                { data },
                {
                    secret: jwtConstants.secret,
                    expiresIn: jwtConstants.expiresIn,
                },
            );
            const refresh_token = await this.jwtService.signAsync(
                { data },
                {
                    secret: jwtConstants.secret,
                    expiresIn: jwtConstants.refresh_expiresIn,
                },
            );
            return {
                accessToken: {
                    token: access_token,
                    expiresIn: jwtConstants.expiresIn,
                },
                refreshToken: {
                    token: refresh_token,
                    expiresIn: jwtConstants.refresh_expiresIn,
                },
                profile: {
                    email: data.email,
                    _id: data.id,
                    role: data.role,
                    avatar: data.avatar,
                },
            };
        } catch (error) {
            this.logger.error('Error in autherService login: ' + error);
            throw error;
        }
    }

    async refreshToken(refresh_token) {
        try {
            const { data } = await this.jwtService.verify(refresh_token, {
                secret: jwtConstants.secret,
            });
            const access_token_new = await this.jwtService.signAsync(
                { data },
                {
                    secret: jwtConstants.secret,
                    expiresIn: jwtConstants.expiresIn,
                },
            );
            const refresh_token_new = await this.jwtService.signAsync(
                { data },
                {
                    secret: jwtConstants.secret,
                    expiresIn: jwtConstants.refresh_expiresIn,
                },
            );
            return {
                accessToken: {
                    token: access_token_new,
                    expiresIn: jwtConstants.expiresIn,
                },
                refreshToken: {
                    token: refresh_token_new,
                    expiresIn: jwtConstants.refresh_expiresIn,
                },
            };
        } catch (e) {
            throw new UnauthorizedException(
                'Hết phiên đăng nhập. vui lòng đăng nhập lại',
            );
        }
    }
}
