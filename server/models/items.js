const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An item must have a name"],
    minlength: [2, "An item name must have more than one character"],
    maxlength: [15, "An item name must have less than 26 characters"],
  },
  category: {
    type: String,
    required: [true, "An item must have a category type"],
    enum: {
      values: ["Electricy", "Pets", "Cars", "Furniture", "Clothing", "Other"],
      message:
        "Category is either: electricy, pets ,cars, furniture, clothing or other",
    },
  },
  sold: {
    type: Boolean,
    default: false,
  },
  seller: {
    type: String,
    required: [true, "An item must have a seller name"],
    minlength: [2, "An item seller must have more than one character"],
    maxlength: [25, "An item seller must have less than 26 characters"],
  },
  sellerId: {
    type: String,
    required: [true, "An item must have a seller id"],
    minlength: [2, "A seller id must have more than one character"],
  },
  description: {
    type: String,
    required: [true, "An item must have a description"],
    minlength: [2, "An item description must have more than one character"],
    maxlength: [99, "An item description must have less than 100 characters"],
  },
  pictureAddress: {
    type: String,
    required: [true, "An item must have a picture address"],
    minlength: [10, "A picture address must have more than 9 characters"],
  },
  create_at: {
    type: String,
    default: new Date().toISOString(),
  },
  price: {
    type: Number,
    required: [true, "An item must have a price"],
    min: [0, "A price must be  bigger or equal to zero"],
  },
  likes: { type: [String], default: [] },
});

const item = mongoose.model("itemsTable", itemSchema);
module.exports = item;
