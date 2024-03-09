import {
    Body,
    Controller,
    Post,
    HttpException,
    Get,
    NotFoundException,
    Headers,
} from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.interface';
import { HttpStatus, jwtConstants } from '../../common/constants';
import { TrimBodyPipe } from '../../common/pipe/trim.body.pipe';
import { SuccessResponse } from '../../common/helpers/response';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
// import { date } from 'joi';

@ApiTags('Auth APIs')
@Controller('auth')
export class AuthController extends BaseController {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {
        super();
    }
    @Post('login')
    async loginUser(
        @Body(new TrimBodyPipe())
        dto: LoginDto,
    ) {
        // console.log(dto)
        try {
            const result = await this.authService.Login(dto);

            if (result) return new SuccessResponse(result);
            throw new HttpException(
                'Tài khoản mật khẩu không chính xác',
                HttpStatus.UNAUTHORIZED,
            );
        } catch (error) {
            this.handleError(error);
        }
    }
    @Post('register')
    async registerUser(@Body() dto: RegisterDto) {
        try {
            console.log(dto);

            const user = await this.authService.registerUser(dto);
            // const token = await this.authService.generateToken(user);
            console.log(user);

            return new SuccessResponse({
                message: 'Đăng ký thành công',
                user,
                // token,
            });
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Đăng ký thất bại',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    @Post('refresh')
    async refresh(@Body() body: any) {
        return this.authService.refreshToken(body.refresh_token);
    }

    @Get('profile')
    async getProfile(@Headers('Authorization') authorizationHeader: string) {
        try {
            const token = authorizationHeader.split(' ')[1];
            // console.log(token);

            const decodedToken: any = this.jwtService.verify(token, {
                secret: jwtConstants.secret,
            });

            const data = decodedToken.data;

            if (!data) {
                throw new NotFoundException(
                    'Không tìm thấy thông tin người dùng',
                );
            }

            return new SuccessResponse({
                email: data.email,

                avatar: data.avatar,
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new HttpException(
                    'Không tìm thấy thông tin người dùng',
                    HttpStatus.NOT_FOUND,
                );
            }
            this.handleError(error);
        }
    }
}
