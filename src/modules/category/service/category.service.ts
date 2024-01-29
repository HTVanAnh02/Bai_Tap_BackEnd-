import { BaseService } from '../../../common/base/base.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import {
    CreateCategoryDto,
    GetCategoryListQuery,
    UpdateCategoryDto,
} from '../../category/service/category.interface';

import { Category } from '../../../database/schemas/category.schema';
import { CategoryRepository } from './category.repository';
import { CategoryAttributesForList } from './category.contant';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryRepository> {
    constructor(private readonly categoryRepository: CategoryRepository) {
        super(categoryRepository);
    }

    async createCategory(dto: CreateCategoryDto) {
        try {
            // console.log({...(dto as any)})
            const category: SchemaCreateDocument<Category> = {
                ...(dto as any),
            };
            const res = await this.categoryRepository.createOne(category);
            // console.log(res)
            return res;
        } catch (error) {
            this.logger.error(
                'Error in categoryService createcategory: ' + error,
            );
            throw error;
        }
    }

    async updateCategory(id: Types.ObjectId, dto: UpdateCategoryDto) {
        try {
            await this.categoryRepository.updateOneById(id, dto);
            return await this.findCategoryById(id);
        } catch (error) {
            this.logger.error(
                'Error in CategoryService updateCategory: ' + error,
            );
            throw error;
        }
    }

    async deleteCategory(id: Types.ObjectId) {
        try {
            await this.categoryRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error(
                'Error in CategoryService deleteCategory: ' + error,
            );
            throw error;
        }
    }

    async findCategoryById(
        id: Types.ObjectId,
        attributes: (keyof Category)[] = CategoryAttributesForList,
    ) {
        try {
            return await this.categoryRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error(
                'Error in CategoryService findCategoryById: ' + error,
            );
            throw error;
        }
    }
    async findAllAndCountCategoryByQuery(query: GetCategoryListQuery) {
        try {
            const result =
                await this.categoryRepository.findAllAndCountCategoryByQuery(
                    query,
                );
            return result;
        } catch (error) {
            this.logger.error(
                'Error in CategoryService findAllAndCountCategoryByQuery: ' +
                    error,
            );
            throw error;
        }
    }
}
