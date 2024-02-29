import { BaseController } from '../../../common/base/base.controller';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    GetUserListQuery,
    createUserDto,
    UpdateUserDto,
} from '../user.interface';
import { CloudinaryService } from '../../../common/cloudinary/cloudinary.service';
import mongoose from 'mongoose';
import { LoggedInUser } from '../../../modules/decorator/loggedInUser.decorator';
import { Role } from '../../../modules/decorator/roles.decorator';
import { RoleCollection } from '../../../common/constants';
import { AuthGuard } from '../../../modules/auth/auth.guard';
import { RolesGuard } from '../../../modules/auth/role.guard';
import { UserService } from '../services/user.service';
import { TrimBodyPipe } from '../../../common/pipe/trim.body.pipe';
import { SuccessResponse } from '../../../common/helpers/response';
import { toObjectId } from '../../../common/helpers/commonFunctions';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User APIs')
@Controller('user')
export class UserController extends BaseController {
    constructor(
        private readonly userService: UserService,
        private readonly cloudinaryService: CloudinaryService,
    ) {
        super();
    }
    @UseGuards(AuthGuard)
    @Get()
    async getall(@Query() query: GetUserListQuery, @LoggedInUser() user) {
        return await this.userService.findAllAndCountUserByQuery(
            query,
            user.data.id,
        );
    }

    // @UseInterceptors(FileInterceptor('file'))
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async create(
        @Body(new TrimBodyPipe()) dto: createUserDto,
        @LoggedInUser() loggedInUser,
        // @UploadedFile() file,
    ) {
        // console.log(dto)
        try {
            if (await this.userService.findUserByEmail(dto.email)) {
                throw new HttpException(
                    'Email đã tồn tại',
                    HttpStatus.BAD_REQUEST,
                );
            }
            dto.createdBy = loggedInUser.data.id;
            dto.password = 'vanh1234';
            const result = await this.userService.createUser(dto);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }
    // @UseInterceptors(FileInterceptor('file'))
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new TrimBodyPipe())
        dto: UpdateUserDto,
        // @UploadedFile() file,
        @LoggedInUser() loggedInUser,
    ) {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException(
                    'Id không giống định dạng',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const user = await this.userService.findUserById(toObjectId(id));

            if (!user)
                throw new HttpException(
                    'User không tồn tại',
                    HttpStatus.BAD_REQUEST,
                );
            if (user.email !== dto.email) {
                if (this.userService.findUserByEmail(dto.email)) {
                    throw new HttpException(
                        'Email đã tồn tại',
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }
            dto.updatedBy = loggedInUser.data.id;
            const result = await this.userService.updateUser(
                toObjectId(id),
                dto,
            );
            if (result) return new SuccessResponse(result);
            throw new HttpException(
                'Cập nhật thất bại',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        } catch (error) {
            this.handleError(error);
        }
    }
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        try {
            const isValid = mongoose.Types.ObjectId.isValid(id);
            if (!isValid) {
                throw new HttpException(
                    'Id không giống định dạng',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const result = await this.userService.findUserById(toObjectId(id));
            if (result) return new SuccessResponse(result);
            throw new HttpException(
                'Không tìm thấy User',
                HttpStatus.NOT_FOUND,
            );
        } catch (error) {
            this.handleError(error);
        }
    }
    @Role(RoleCollection.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new HttpException(
                'Id không giống định dạng',
                HttpStatus.BAD_REQUEST,
            );
        }
        const result = await this.userService.deleteUser(toObjectId(id));
        if (result) return new SuccessResponse(result);
        throw new HttpException('Không tìm thấy User', HttpStatus.NOT_FOUND);
    }
}
