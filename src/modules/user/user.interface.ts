import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { UserOrderBy } from './user.constant';
import { CommonDto, CommonListQuery } from '../../common/interfaces';
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export class createUserDto extends CommonDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    @IsString({ message: 'Name phải là một chuỗi' })
    name: string;

    @IsString({ message: 'Email phải là một chuỗi' })
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Vui lòng nhập đầy đủ thông tin' })
    email: string;

    @IsOptional()
    @IsString({ message: 'Password phải là một chuỗi' })
    password?: string;

    @IsNotEmpty({ message: 'birthday không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    birthday: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    phone: string;

    @IsString()
    @IsOptional()
    role?: string;

    @IsNotEmpty({ message: 'Ảnh không được để trống' })
    @IsString({ message: 'Ảnh phải là một chuỗi' })
    avatar: string;
}

export class UpdateUserDto extends CommonDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    @IsString({ message: 'Name phải là một chuỗi' })
    name: string;

    @IsString({ message: 'Email phải là một chuỗi' })
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Vui lòng nhập đầy đủ thông tin' })
    email: string;

    @IsNotEmpty({ message: 'birthday không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    birthday: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    phone: string;

    @IsString()
    @IsOptional()
    role?: string;

    @IsString()
    @IsOptional()
    avatar?: string;
}

export class GetUserListQuery extends CommonListQuery {
    orderBy?: UserOrderBy;
    phone?: string;
}
