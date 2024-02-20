import { INPUT_TEXT_MAX_LENGTH } from '../../common/constants';
import { JoiValidate } from '../../common/decorators/validator.decorator';
import { UserOrderBy } from './user.constant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import Joi from '../../plugins/joi';
import { CommonListQuery } from '../../common/interfaces';
// import { RoleCollection } from '../../database/utils/constants';

export class CreateUserDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'User name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    email: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'email',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    password: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'birthday',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    birthday: string;
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'phone',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    phone: string;
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'avatar',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    avatar?: string;
    @ApiProperty({
        type: String,
        default: '..',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    role: string;
}

export class UpdateUserDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'User name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    email: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'email',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    password: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'birthday',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    birthday: string;
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'phone',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    phone: string;
    @ApiProperty({
        type: String,
        default: '..',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    avatar: string;
    @ApiProperty({
        type: String,
        default: '..',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    role: string;
}

export class GetUserListQuery extends CommonListQuery {
    @ApiPropertyOptional({
        enum: UserOrderBy,
        description: 'Which field used to sort',
        default: UserOrderBy.UPDATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(UserOrderBy))
            .optional(),
    )
    orderBy?: UserOrderBy;
}

export class loginUserDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'User name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    email: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: '',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    password: string;
}
