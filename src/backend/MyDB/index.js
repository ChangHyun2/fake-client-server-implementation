import MyDB from "../../lib/MyDB";

MyDB.connect("mydb:2021")
  .then(() => console.log("server is connected to mydb"))
  .catch((e) => {
    console.log(e);
  });
