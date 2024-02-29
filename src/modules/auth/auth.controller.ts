import { Body, Controller, Post, HttpException } from '@nestjs/common';
import { BaseController } from '../../common/base/base.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.interface';
import { HttpStatus } from '../../common/constants';
import { TrimBodyPipe } from '../../common/pipe/trim.body.pipe';
import { SuccessResponse } from '../../common/helpers/response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth APIs')
@Controller('Auth')
export class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
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
    @Post('refresh')
    async refresh(@Body() body: any) {
        // console.log(body)
        return this.authService.refreshToken(body.refresh_token);
    }
}
