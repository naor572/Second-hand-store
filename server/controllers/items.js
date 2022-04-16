const { mongoose } = require("mongoose");
const items = require("../models/items");
const getAllItems = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of post every page

    const total = await items.countDocuments({});
    const itemsOnPage = await items
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: itemsOnPage,
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getItemsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const itemsByCategory = await items.find({ category }).exec();
    res.status(201).json(itemsByCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const createItem = async (req, res) => {
  const newItem = new items({
    ...req.body,
    create_at: new Date().toISOString(),
  });
  try {
    await newItem.save();
    console.log(newItem);
    return res.status(201).json(newItem);
  } catch (error) {
    console.log(error.errors);
    return res.status(400).json(error.errors);
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    await items.findByIdAndDelete(id);
    res.status(201).json({ message: "The item successfully deleted" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "The item id is not correct" });
  await items.findByIdAndUpdate(id, req.body);
  res.status(201).json({ message: "The item successfully updated" });
};
const soldItem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "The item id is incorrect" });
    const currentItem = await items.findById(id);
    currentItem.sold = true;
    await items.findByIdAndUpdate(id, currentItem);
    res.status(201).json(currentItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const likeItem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "The item id is incorrect" });
    const currentItem = await items.findById(id);
    const index = currentItem.likes.findIndex(
      (id) => id === String(req.userId)
    );
    console.log(index);
    if (index === -1) {
      currentItem.likes.push(req.userId);
    } //like item
    else
      currentItem.likes = currentItem.likes.filter(
        (id) => id !== String(req.userId)
      );
    await items.findByIdAndUpdate(id, currentItem);
    res.status(201).json(currentItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const itemDetails = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await items.findById(itemId).exec();
    res.status(201).json(item);
  } catch (err) {
    res.status(409).json({ message: "this item does not exist in the shop" });
  }
};
module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  updateItem,
  likeItem,
  itemDetails,
  getItemsByCategory,
  soldItem,
};
