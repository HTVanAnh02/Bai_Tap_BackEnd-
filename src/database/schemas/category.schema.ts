import { Prop, Schema } from '@nestjs/mongoose';
import { MongoBaseSchema } from './base.schema';
import { CategoryCollection } from '../utils/constants';
import { createSchemaForClass } from '../utils/helper';
export type CategoryDocument = SchemaDocument<Category>;
@Schema({
    timestamps: true,
    collection: CategoryCollection.CATEGORY,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
})
export class Category extends MongoBaseSchema {
    @Prop({ required: true, type: String })
    Name: string;

    @Prop({ required: true, type: String })
    Description: string;

    @Prop({ required: true, type: Date })
    CreatedDate: Date;

    @Prop({ required: true, type: Date })
    UpdatedDate: Date;

    @Prop({ required: true, type: String })
    Status: string;

    @Prop({ required: false, type: String })
    ImageCategory: string;
}
const CategorySchema = createSchemaForClass(Category);

export { CategorySchema };
