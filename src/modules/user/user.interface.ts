import {
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';
import { UserOrderBy } from './user.constant';
import { CommonDto, CommonListQuery } from '../../common/interfaces';
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const emojiRegex = /[\uD800-\uDFFF]/;
const leadingTrailingSpaceRegex = /^\s|\s$/;
const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
export class createUserDto extends CommonDto {
    @IsNotEmpty({ message: 'Name không được để trống' })
    @IsString({ message: 'Name phải là một chuỗi' })
    @Matches(emojiRegex, { message: 'Name không được chứa emoji' })
    @Matches(leadingTrailingSpaceRegex, {
        message: 'Name không được có khoảng trắng ở đầu và cuối',
    })
    @Matches(specialCharacterRegex, {
        message: 'Name không được chứa ký tự đặc biệt',
    })
    name: string;

    @IsString({ message: 'Email phải là một chuỗi' })
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Vui lòng nhập đầy đủ thông tin' })
    @Matches(emojiRegex, { message: 'Email không được chứa emoji' })
    @Matches(leadingTrailingSpaceRegex, {
        message: 'Email không được có khoảng trắng ở đầu và cuối',
    })
    @Matches(specialCharacterRegex, {
        message: 'Email không được chứa ký tự đặc biệt',
    })
    email: string;
    @IsOptional()
    @IsString({ message: 'Password phải là một chuỗi' })
    @Matches(emojiRegex, { message: 'Password không được chứa emoji' })
    @Matches(leadingTrailingSpaceRegex, {
        message: 'Password không được có khoảng trắng ở đầu và cuối',
    })
    @Matches(specialCharacterRegex, {
        message: 'Password không được chứa ký tự đặc biệt',
    })
    password?: string;

    @IsNotEmpty({ message: 'birthday không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @IsDate({ message: 'birthday phải có định dạng ngày tháng' })
    birthday: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(emojiRegex, { message: 'Phone không được chứa emoji' })
    @Matches(leadingTrailingSpaceRegex, {
        message: 'Phone không được có khoảng trắng ở đầu và cuối',
    })
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
    @Matches(emojiRegex, { message: 'Name không được chứa emoji' })
    @Matches(leadingTrailingSpaceRegex, {
        message: 'Name không được có khoảng trắng ở đầu và cuối',
    })
    @Matches(specialCharacterRegex, {
        message: 'Name không được chứa ký tự đặc biệt',
    })
    name: string;

    @IsString({ message: 'Email phải là một chuỗi' })
    @Matches(emailRegex, { message: 'Email không đúng định dạng' })
    @IsNotEmpty({ message: 'Vui lòng nhập đầy đủ thông tin' })
    @Matches(emojiRegex, { message: 'Email không được chứa emoji' })
    @Matches(leadingTrailingSpaceRegex, {
        message: 'Email không được có khoảng trắng ở đầu và cuối',
    })
    @Matches(specialCharacterRegex, {
        message: 'Email không được chứa ký tự đặc biệt',
    })
    email: string;
    @IsOptional()
    @IsString({ message: 'Password phải là một chuỗi' })
    @Matches(emojiRegex, { message: 'Password không được chứa emoji' })
    @Matches(leadingTrailingSpaceRegex, {
        message: 'Password không được có khoảng trắng ở đầu và cuối',
    })
    @Matches(specialCharacterRegex, {
        message: 'Password không được chứa ký tự đặc biệt',
    })
    password?: string;

    @IsNotEmpty({ message: 'birthday không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @IsDate({ message: 'birthday phải có định dạng ngày tháng' })
    birthday: string;

    @IsNotEmpty({ message: 'Không được để trống' })
    @IsString({ message: 'Phải là một chuỗi' })
    @Matches(emojiRegex, { message: 'Phone không được chứa emoji' })
    @Matches(leadingTrailingSpaceRegex, {
        message: 'Phone không được có khoảng trắng ở đầu và cuối',
    })
    phone: string;

    @IsString()
    @IsOptional()
    role?: string;

    @IsNotEmpty({ message: 'Ảnh không được để trống' })
    @IsString({ message: 'Ảnh phải là một chuỗi' })
    avatar: string;
}

export class GetUserListQuery extends CommonListQuery {
    orderBy?: UserOrderBy;
    phone?: string;
}
