import MyDB from "../../lib/MyDB";
import { TimeoutPromise } from "../../utils";

export const connectDB = TimeoutPromise(async (res, rej) => {
  MyDB.connect("mydb:2021")
    .then(() => {
      console.log("server is connected to mydb");
      res(true);
    })
    .catch((e) => {
      console.log(e);
      rej(e);
    });
}, 1000);
