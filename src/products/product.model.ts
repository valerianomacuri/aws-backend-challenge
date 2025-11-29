import dynamoose from './dynamoose';

const ProductSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    thumbnailUrl: String,
  },
  {
    timestamps: true,
  },
);

export const ProductModel = dynamoose.model('Products', ProductSchema);
