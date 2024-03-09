import { INPUT_TEXT_MAX_LENGTH } from '../../common/constants';
import { JoiValidate } from '../../common/decorators/validator.decorator';
import { ProductOrderBy } from './product.contant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import Joi from '../../plugins/joi';
import { CommonDto, CommonListQuery } from '../../common/interfaces';
import {
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';
const emojiRegex = /[\uD800-\uDFFF]/;
const leadingTrailingSpaceRegex = /^\s|\s$/;
const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
export class CreateProductDto extends CommonDto {
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
    @Matches(emojiRegex, { message: 'Email không đúng định dạng' })
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
    imageUrl: string;
}

export class UpdateProductDto extends CommonDto {
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
    @Matches(emojiRegex, { message: 'Email không đúng định dạng' })
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
    imageUrl: string;
}

export class GetProductListQuery extends CommonListQuery {
    @ApiPropertyOptional({
        enum: ProductOrderBy,
        description: 'Which field used to sort',
        default: ProductOrderBy.UPDATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(ProductOrderBy))
            .optional(),
    )
    orderBy?: ProductOrderBy;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: "User'name for filter",
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    name?: string;
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    price?: string;
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    feedback?: string;
}
