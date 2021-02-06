import Collection from "./Collection";

export default function DB() {
  this.collections = {};

  this.createCollection = (name) => {
    if (this.collections[name]) {
      throw new Error("collection already exists");
    }

    this.collections[name] = new Collection(name);
    return this.collections[name];
  };

  this.getCollection = (name) => {
    return this.collections[name];
  };
}
