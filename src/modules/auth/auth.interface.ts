import { INPUT_TEXT_MAX_LENGTH } from '../../common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export class LoginDto {
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Vui lòng nhập đầy đủ thông tin' })
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'email',
    })
    email: string;
    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu không để trống' })
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'password',
    })
    password: string;
}

export class RegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'Tên không để trống' })
    @MaxLength(50, { message: 'Tên không được quá 50 ký tự' })
    @ApiProperty({
        type: String,
        maxLength: 50,
        default: 'name',
    })
    name: string;

    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Vui lòng nhập đầy đủ thông tin' })
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'email',
    })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Mật khẩu không để trống' })
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'password',
    })
    password: string;

    @IsString()
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'avatar',
    })
    avatar: string;
    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(/^[0-9]{10}$/, { message: 'Số điện thoại phải có 10 số' })
    phone: string;
}
