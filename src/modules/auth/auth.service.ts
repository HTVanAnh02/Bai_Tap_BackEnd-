import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { User } from '../../database/schemas/user.schema';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.interface';
import { jwtConstants } from '../../common/constants';
import * as bcrypt from 'bcrypt';
// import { AuthRepository } from './auth.repository';

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
    async registerUser(dto: RegisterDto): Promise<any> {
        try {
            const { email, password } = dto;

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
            );

            // console.log('Đăng ký thành công');
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

    async checkEmailExists(email: string): Promise<boolean> {
        const user = await this.authRepository.findOne({ email });
        return !!user;
    }

    async generateToken(user: User): Promise<string> {
        const payload = { email: user.email, sub: user.id };
        return await this.jwtService.sign(payload);
    }
    async getProfile(accessToken: string) {
        try {
            // Xác thực và giải mã token
            const decodedToken: any = this.jwtService.verify(accessToken, {
                secret: jwtConstants.secret,
            });

            // Lấy thông tin người dùng từ dữ liệu giải mã
            const data = decodedToken.data;

            // Kiểm tra xem dữ liệu người dùng có tồn tại hay không
            if (!data) {
                throw new NotFoundException(
                    'Không tìm thấy thông tin người dùng',
                );
            }

            // Trả về thông tin người dùng
            return {
                email: data.email,
                _id: data.id,
                role: data.role,
                avatar: data.avatar,
            };
        } catch (error) {
            // Xử lý và báo cáo lỗi nếu có
            this.logger.error('Lỗi trong AuthService getProfile: ' + error);
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
