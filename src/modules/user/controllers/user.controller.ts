import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Get,
    Query,
    UseInterceptors,
    UploadedFile,
    // UseGuards,
} from '@nestjs/common';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../../common/helpers/response';
import { HttpStatus, mongoIdSchema } from '../../../common/constants';
import {
    CreateUserDto,
    GetUserListQuery,
    UpdateUserDto,
    loginUserDto,
} from '../user.interface';
import {
    ApiResponseError,
    SwaggerApiType,
    ApiResponseSuccess,
} from '../../../common/services/swagger.service';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

import {
    createUserSuccessResponseExample,
    deleteUserSuccessResponseExample,
    getUserDetailSuccessResponseExample,
    getUserListSuccessResponseExample,
    updateUserSuccessResponseExample,
} from '../user.swagger';
import { TrimBodyPipe } from '../../../common/pipe/trim.body.pipe';
import { toObjectId } from '../../../common/helpers/commonFunctions';
import { BaseController } from '../../../common/base/base.controller';
import { JoiValidationPipe } from '../../../common/pipe/joi.validation.pipe';
import { UserService } from '../services/user.service';
// import { AuthGuard } from '../../../modules/auth/auth.guard';
// import { Role } from '../../../modules/decorator/roles.decorator';
// import { RolesGuard } from '../../../modules/auth/role.guard';
// import { RoleCollection } from '../../../database/utils/constants';
import { CloudinaryService } from '../../../common/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Role } from '@/modules/decorator/roles.decorator';
// import { RoleCollection } from '@/database/utils/constants';
// import { AuthGuard } from '@/modules/auth/auth.guard';
// import { RolesGuard } from '@/modules/auth/role.guard';
// import { log } from 'console';
@ApiTags('User APIs')
@Controller('user')
export class UserController extends BaseController {
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService,
    ) {
        super();
    }
    @ApiOperation({ summary: 'Create User' })
    @ApiResponseError([SwaggerApiType.CREATE])
    @ApiResponseSuccess(createUserSuccessResponseExample)
    @ApiBody({ type: CreateUserDto })
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async createUser(
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: CreateUserDto,
        @UploadedFile() file,
    ) {
        try {
            if (file != null) {
                const url = await this.cloudinaryService.uploadImage(file);
                dto.avatar = url;
            }
            const result = await this.userService.createUser(dto);
            return result;
        } catch (error) {
            this.handleError(error);
            // Có thể thêm hành động khác tùy thuộc vào yêu cầu của bạn, ví dụ trả về response lỗi cụ thể.
        }
    }
    @ApiOperation({ summary: 'Update User by id' })
    @ApiResponseError([SwaggerApiType.UPDATE])
    @ApiResponseSuccess(updateUserSuccessResponseExample)
    @ApiBody({ type: UpdateUserDto })
    @Patch(':id')
    async updateUser(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: UpdateUserDto,
        @UploadedFile() file?,
    ) {
        try {
            const usert = await this.userService.findUserById(toObjectId(id));
            if (!usert) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('Usert.error.notFound', {
                        args: {
                            id,
                        },
                    }),
                );
            }
            if (file != null) {
                await this.cloudinaryService.deleteImage(usert.avatar);
                const url = await this.cloudinaryService.uploadImage(file);
                dto.avatar = url;
            } else {
                dto.avatar = usert.avatar;
            }
            const result = await this.userService.updateUser(
                toObjectId(id),
                dto,
            );
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Delete User by id' })
    @ApiResponseError([SwaggerApiType.DELETE])
    @ApiResponseSuccess(deleteUserSuccessResponseExample)
    @Delete(':id')
    async deleteUser(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const user = await this.userService.findUserById(toObjectId(id));

            if (!user) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('User.error.notFound', {
                        args: {
                            id,
                        },
                    }),
                );
            }

            //đoạn này chưa cần vì đang là xóa mềm
            //await this.cloudinaryService.deleteImage(user.imageUrl);
            const result = await this.userService.deleteUser(toObjectId(id));
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Get User detail by id' })
    @ApiResponseError([SwaggerApiType.GET_DETAIL])
    @ApiResponseSuccess(getUserDetailSuccessResponseExample)
    @Get(':id')
    async getUserDetail(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const result = await this.userService.findUserById(toObjectId(id));

            if (!result) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('user.error.notFound', {
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
    // @Role(RoleCollection.Admin)
    // @UseGuards(AuthGuard,RolesGuard)
    @ApiOperation({ summary: 'Get User list' })
    @ApiResponseError([SwaggerApiType.GET_LIST])
    @ApiResponseSuccess(getUserListSuccessResponseExample)
    @Get()
    async getUserList(
        @Query()
        query: GetUserListQuery,
    ) {
        try {
            const result =
                await this.userService.findAllAndCountUserByQuery(query);
            console.log(result);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Login User' })
    @ApiBody({ type: loginUserDto })
    @Post('login')
    async loginUser(
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: loginUserDto,
    ) {
        try {
            const result = await this.userService.loginUser(dto);
            if (!result) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('Username and password not found', {
                        args: {
                            dto,
                        },
                    }),
                );
            }
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }
}
