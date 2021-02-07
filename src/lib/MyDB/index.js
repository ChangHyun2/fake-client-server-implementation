import database from "../../database";
import { TimeoutPromise } from "../../utils";
import { DB_SPEED } from "../../variable/requestSpeed";

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
        }, DB_SPEED),
      checkConnected: () => {
        if (!connected) {
          throw new Error("db is not connected!");
        }
      },
      model: (name) => {
        models.push(name);

        const Model = function (data) {
          myDB.checkConnected();

          const model = connectedDB.collections[name].insertDocument(data);

          return TimeoutPromise((res, rej) => {
            if (!model) {
              rej(`${name} model is not created`);
            }
            res(model);
          }, DB_SPEED);
        };

        Model.getAll = () => {
          myDB.checkConnected();

          return TimeoutPromise((res, rej) => {
            const models = connectedDB.collections[name].getAll();
            if (!models) {
              rej(`thire is no ${name} model in DB`);
            }
            res(models);
          }, DB_SPEED);
        };

        Model.findById = (id) => {
          myDB.checkConnected();

          return TimeoutPromise((res, rej) => {
            const model = connectedDB.collections[name].getDocument(id);

            if (!model) {
              rej(new Error(`can not get ${name} model by id:${id}`));
            }

            res(model);
          }, DB_SPEED);
        };

        Model.delete = (id) => {
          myDB.checkConnected();

          return TimeoutPromise((res, rej) => {
            const deleted = connectedDB.collections[name].deleteDocument(id);
            if (!deleted) {
              console.log("noting");
              res(undefined);
            }
            res(deleted);
          }, DB_SPEED);
        };

        Model.update = (id, data) => {
          myDB.checkConnected();

          return TimeoutPromise((res, rej) => {
            const updated = connectedDB.collections[name].updateDocument(
              id,
              data
            );
            if (!updated) {
              res(undefined);
            }
            res(updated);
          }, DB_SPEED);
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
