import { User } from '../../database/schemas/user.schema';

export enum UserOrderBy {
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updatedAt',
}

export const UserAttributesForList: (keyof User)[] = [
    '_id',
    'id',
    'name',
    'createdAt',
    'updatedAt',
    'email',
    'password',
    'birthday',
    'phone',
    'avatar',
    'role',
];

export const UserAttributesForDetail: (keyof User)[] = [
    '_id',
    'id',
    'name',
    'email',
    'password',
    'birthday',
    'phone',
    'avatar',
    'role',
];
