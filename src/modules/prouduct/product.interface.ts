import { INPUT_TEXT_MAX_LENGTH } from '../../common/constants';
import { JoiValidate } from '../../common/decorators/validator.decorator';
import { ProductOrderBy } from './product.contant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import Joi from '../../plugins/joi';
import { CommonDto, CommonListQuery } from '../../common/interfaces';
export class CreateProductDto extends CommonDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'Product name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().positive().required())
    price: number;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().positive().required())
    quantity: number;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'description',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    description: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'image',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    imageUrl?: string;
}

export class UpdateProductDto extends CommonDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'Product name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().positive().required())
    price: number;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().positive().required())
    quantity: number;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'description',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    description: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'image',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    imageUrl?: string;
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
