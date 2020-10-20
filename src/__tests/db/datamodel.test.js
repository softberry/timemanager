import { nSQL } from "@nano-sql/core";
import counterModelTables from "../../db/models/data.model";
const materialItemTable = {
  name: "materialitem",
  description: "aciklama",
  price: "1.1",
  amount: "2.1",
  unit: "ml",
};

const materialListTable = { items: [materialItemTable] };

describe("Delay Bar ", () => {
  test("Initialize db", () => {
    expect.assertions(1);
    return nSQL()
      .createDatabase({
        id: "shoplist_test", // can be anything that's a string
        mode: "TEMP", // save changes to IndexedDB, WebSQL or SnapDB!
        tables: [
          // tables can be created as part of createDatabase or created later with create table queries
          ...counterModelTables,
        ],
        version: 3, // current schema/database version
      })
      .then(e => {
        expect(nSQL().selectedDB).toEqual("shoplist_test");
      });
  });

  test("Create Material Item Table", async () => {
    expect.assertions(1);
    return nSQL("materialItemTable")
      .query("upsert", materialItemTable)
      .exec()
      .then(m => {
        expect(m[0].name).toBe("materialitem");
      });
  });
});
