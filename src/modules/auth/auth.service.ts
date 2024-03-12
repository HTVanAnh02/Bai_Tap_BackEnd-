import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { User } from '../../database/schemas/user.schema';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.interface';
import { jwtConstants } from '../../common/constants';
import * as bcrypt from 'bcrypt';

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
                    expiresIn: jwtConstants.expiresIn,
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
                    id: data.id,
                    email: data.email,
                    role: data.role,
                    avatar: data.avatar,
                },
            };
        } catch (error) {
            this.logger.error('Erro autherservice login' + error);
            throw error;
        }
    }
    async registerUser(dto: RegisterDto): Promise<any> {
        try {
            const { email, password, name, phone, avatar } = dto;

            // Kiểm tra xem email đã tồn tại trong hệ thống hay chưa
            const emailExists = await this.authRepository.findOne({ email });
            if (emailExists) {
                throw new HttpException(
                    'Email đã tồn tại',
                    HttpStatus.BAD_REQUEST,
                );
            }
            // Hash mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo mới user và lưu vào cơ sở dữ liệu
            const data = await this.authRepository.createUser(
                email,
                hashedPassword,
                name,
                phone,
                avatar,
            );

            // console.log('Đăng ký thành công');
            return {
                profile: {
                    email: data.email,
                    _id: data.id,
                    role: data.role,
                },
            };
        } catch (error) {
            console.log('Lỗi khi đăng ký người dùng:', error);

            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Lỗi khi đăng ký người dùng',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
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
