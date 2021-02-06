import { v4 as uuidv4 } from "uuid";

export default function Collection(name) {
  this.name = name;
  const stack = [];

  this.insertDocument = (data) => {
    const document = {
      _id: uuidv4(),
      ...data
    };

    stack.push(document);
    return document;
  };

  this.getDocument = (id) => stack.find((document) => document._id === id);
  this.deleteDocument = (id) => {
    const deletedIndex = stack.findIndex((document) => document._id === id);
    if (deletedIndex === -1) {
      return false;
    }

    return stack.splice(deletedIndex, 1);
  };
  this.updateDocument = (id, data) => {
    const updatedIndex = stack.findIndex((document) => document._id === id);
    if (updatedIndex === -1) {
      return false;
    }
    stack[updatedIndex] = data;
    return stack[updatedIndex];
  };
  this.getAll = () => {
    const all = [...stack];
    return all;
  };

  return this;
}
