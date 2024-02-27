import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryOrderBy } from './category.contant';
import { JoiValidate } from '../../../common/decorators/validator.decorator';
import { INPUT_TEXT_MAX_LENGTH } from '../../../common/constants';
import Joi from '../../../plugins/joi';
import { CommonListQuery } from '../../../common/interfaces';
export class CreateCategoryDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'Name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: Number,
        default: 0,
    })
    @JoiValidate(Joi.number().required())
    price: number;

    @ApiProperty({
        type: Number,
        default: 0,
    })
    @JoiValidate(Joi.number().required())
    quantity: number;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: '...',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    description: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: '...',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    imageUrl?: string;
}

export class UpdateCategoryDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: Number,
        default: 0,
    })
    @JoiValidate(Joi.number().required())
    price: number;

    @ApiProperty({
        type: Number,
        default: 0,
    })
    @JoiValidate(Joi.number().required())
    quantity: number;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: '...',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    description: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: '...',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    imageUrl?: string;
}

export class GetCategoryListQuery extends CommonListQuery {
    @ApiPropertyOptional({
        enum: CategoryOrderBy,
        description: 'Which field used to sort',
        default: CategoryOrderBy.UPDATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(CategoryOrderBy))
            .optional(),
    )
    orderBy?: CategoryOrderBy;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: "User'name for filter",
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    name?: string;
}
