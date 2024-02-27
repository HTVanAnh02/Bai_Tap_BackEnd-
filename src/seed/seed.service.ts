import { UserService } from '../modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class seedService {
    constructor(private readonly userService: UserService) {}
    async seedData() {
        const data = {
            name: 'Hoang Thi Van Anh',
            email: 'vanh@gmail.com',
            password: 'vanh1234',
            birthday: '22/12/2002',
            role: 'Admin',
            phone: '0328301422',
            avatar: 'https://res.cloudinary.com/dyo42vgdj/image/upload/v1706610033/product_NestJS/uclsk6nhxcxrc6cowykd.jpg',
        };
        const user = await this.userService.findUserByEmail(data.email);
        if (!user) {
            await this.userService.createUser(data);
        }
    }
}
