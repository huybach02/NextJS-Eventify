import {Document, Schema, model, models} from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
}

// Declare the Schema of the Mongo model
var categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

//Export the model
const Category = models.Category || model("Category", categorySchema);
export default Category;
