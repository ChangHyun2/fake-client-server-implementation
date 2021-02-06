import database from "../../database";
import { TimeoutPromise } from "../../utils";

const MyDB = (function () {
  let myDB = null;

  function createInstance() {
    let connectedDB;
    let connected = false;
    let models = [];

    myDB = {
      connect: (url) =>
        TimeoutPromise((res, rej) => {
          if (!database[url]) {
            rej(new Error("db url is not correct"));
          }

          connectedDB = database[url];
          connected = true;

          models.forEach(
            (model) =>
              connectedDB.getCollection(model) ||
              connectedDB.createCollection(model)
          );

          res(true);
        }, 200),
      checkConnected: () => {
        if (!connected) {
          throw new Error("db is not connected!");
        }
      },
      model: (name) => {
        models.push(name);

        const Model = function (data) {
          myDB.checkConnected();

          console.log(connectedDB);
          const model = connectedDB.collections[name].insertDocument(data);

          return TimeoutPromise((res, rej) => {
            if (!model) {
              rej(`${name} model is not created`);
            }
            res(model);
          }, 200);
        };

        Model.getAll = () => {
          myDB.checkConnected();

          return TimeoutPromise((res, rej) => {
            const models = connectedDB.collections[name].getAll();
            if (!models) {
              rej(`thire is no ${name} model in DB`);
            }
            res(models);
          }, 200);
        };

        Model.findById = (id) => {
          myDB.checkConnected();

          return TimeoutPromise((res, rej) => {
            const model = connectedDB.collections[name].getDocument(id);

            if (!model) {
              rej(new Error(`can not get ${name} model by id:${id}`));
            }

            res(model);
          }, 200);
        };

        Model.delete = (id) => {
          myDB.checkConnected();

          return TimeoutPromise((res, rej) => {
            const deleted = connectedDB.collections[name].deleteDocument(id);
            if (!deleted) {
              rej(new Error(`can not delete ${name} model by id: ${id}`));
            }
            res(deleted);
          }, 200);
        };

        Model.update = (id, data) => {
          myDB.checkConnected();

          return TimeoutPromise((res, rej) => {
            const updated = connectedDB.collections[name].updateDocument(
              id,
              data
            );
            if (!updated) {
              rej(new Error(`can not update ${name} model by id: ${id}`));
            }
            res(updated);
          }, 200);
        };

        return Model;
      }
    };

    return myDB;
  }

  return function () {
    this.getInstance = function () {
      if (myDB) {
        return myDB;
      }

      myDB = createInstance();
      return myDB;
    };
  };
})();

const myDB = new MyDB();

export default myDB.getInstance();
