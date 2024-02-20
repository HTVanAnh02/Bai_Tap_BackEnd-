import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Get,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../../common/helpers/response';
import { HttpStatus, mongoIdSchema } from '../../../common/constants';
import {
    CreateCategoryDto,
    GetCategoryListQuery,
    UpdateCategoryDto,
} from '../../category/service/category.interface';
import {
    ApiResponseError,
    SwaggerApiType,
    ApiResponseSuccess,
} from '../../../common/services/swagger.service';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

import {
    createCategorySuccessResponseExample,
    deleteCategorySuccessResponseExample,
    getCategoryDetailSuccessResponseExample,
    getCategoryListSuccessResponseExample,
    updateCategorySuccessResponseExample,
} from '../../category/service/category.swagger';
import { TrimBodyPipe } from '../../../common/pipe/trim.body.pipe';
import { toObjectId } from '../../../common/helpers/commonFunctions';
import { BaseController } from '../../../common/base/base.controller';
import { JoiValidationPipe } from '../../../common/pipe/joi.validation.pipe';
import { CategoryService } from '../service/category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../../common/cloudinary/cloudinary.service';

@ApiTags('Category APIs')
@Controller('category')
export class CategoryController extends BaseController {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly cloudinaryService: CloudinaryService,
    ) {
        super();
    }

    @ApiOperation({ summary: 'Create Category' })
    @ApiResponseError([SwaggerApiType.CREATE])
    @ApiResponseSuccess(createCategorySuccessResponseExample)
    @ApiBody({ type: CreateCategoryDto })
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async createCategory(
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: CreateCategoryDto,
        @UploadedFile() file,
    ) {
        try {
            if (file != null) {
                const url = await this.cloudinaryService.uploadImage(file);
                dto.imageUrl = url;
            }
            const result = await this.categoryService.createCategory(dto);
            return result;
        } catch (error) {
            this.handleError(error);
            // Có thể thêm hành động khác tùy thuộc vào yêu cầu của bạn, ví dụ trả về response lỗi cụ thể.
        }
    }

    @ApiOperation({ summary: 'Update Category by id' })
    @ApiResponseError([SwaggerApiType.UPDATE])
    @ApiResponseSuccess(updateCategorySuccessResponseExample)
    @ApiBody({ type: UpdateCategoryDto })
    @UseInterceptors(FileInterceptor('file'))
    @Patch(':id')
    async updateCategory(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: UpdateCategoryDto,
        @UploadedFile() file?,
    ) {
        try {
            const category = await this.categoryService.findCategoryById(
                toObjectId(id),
            );
            if (!category) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('Category.error.notFound', {
                        args: {
                            id,
                        },
                    }),
                );
            }
            if (file != null) {
                await this.cloudinaryService.deleteImage(
                    category.ImageCategory,
                );
                const url = await this.cloudinaryService.uploadImage(file);
                dto.imageUrl = url;
            } else {
                dto.imageUrl = category.ImageCategory;
            }
            const result = await this.categoryService.updateCategory(
                toObjectId(id),
                dto,
            );
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Delete Category by id' })
    @ApiResponseError([SwaggerApiType.DELETE])
    @ApiResponseSuccess(deleteCategorySuccessResponseExample)
    @Delete(':id')
    async deleteCategory(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const category = await this.categoryService.findCategoryById(
                toObjectId(id),
            );

            if (!category) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('Category.error.notFound', {
                        args: {
                            id,
                        },
                    }),
                );
            }

            //đoạn này chưa cần vì đang là xóa mềm
            //await this.cloudinaryService.deleteImage(Category.imageUrl);
            const result = await this.categoryService.deleteCategory(
                toObjectId(id),
            );
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Get Category detail by id' })
    @ApiResponseError([SwaggerApiType.GET_DETAIL])
    @ApiResponseSuccess(getCategoryDetailSuccessResponseExample)
    @Get(':id')
    async getCategoryDetail(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const result = await this.categoryService.findCategoryById(
                toObjectId(id),
            );

            if (!result) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('Category.error.notFound', {
                        args: {
                            id,
                        },
                    }),
                );
            }
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Get Category list' })
    @ApiResponseError([SwaggerApiType.GET_LIST])
    @ApiResponseSuccess(getCategoryListSuccessResponseExample)
    @Get()
    async getCategoryList(
        @Query(new JoiValidationPipe())
        query: GetCategoryListQuery,
    ) {
        try {
            const result =
                await this.categoryService.findAllAndCountCategoryByQuery(
                    query,
                );
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }
}
