import MyDB from "../../lib/MyDB";

MyDB.connect("mydb:2021")
  .then(() => console.log("connectaed success"))
  .catch((e) => {
    console.log(e);
  });
