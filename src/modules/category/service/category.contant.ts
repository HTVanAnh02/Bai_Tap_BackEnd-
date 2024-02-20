import { Category } from '../../../database/schemas/category.schema';

export enum CategoryOrderBy {
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updatedAt',
}

export const CategoryAttributesForList: (keyof Category)[] = [
    '_id',
    'id',
    'Name',
    'Description',
    'updatedAt',
    'CreatedDate',
    'UpdatedDate',
    'Status',
    'ImageCategory',
];

export const CategoryAttributesForDetail: (keyof Category)[] = [
    '_id',
    'id',
    'Name',
    'Description',
    'updatedAt',
    'CreatedDate',
    'UpdatedDate',
    'Status',
    'ImageCategory',
];
