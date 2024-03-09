import * as bcrypt from 'bcrypt';

export class BcryptService {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePassword(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }
}
