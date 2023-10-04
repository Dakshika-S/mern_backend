const mongoose = require("mongoose");

// Get an array of all registered model names
const registeredModelNames = mongoose.modelNames();

// Loop through the array to see the names of all available models
console.log("Available Models:");
for (const modelName of registeredModelNames) {
  console.log(modelName);
}
