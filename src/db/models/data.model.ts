import { InanoSQLTableConfig } from "@nano-sql/core/lib/interfaces";

/**
 * Contact-Table
 * ID - NAME - SURNAME - STREET+NO - ZIP - CITY - TEL[+] - MOBILE[+] - MAIL[+]
 * ***********************************************************************
 * Work-Table
 * ID - CONTACTID - DESCRIPTION
 * ***********************************************************************
 * Work-Duration-Table
 * ID - WORKID - START-TIMESTAMP - FINISHED-TIMESTAMP - DESCRIPTION
 * ***********************************************************************
 * Material-List-Table
 * ID - WORKID - MATERIALID - AMOUNT - NOTES - PRICE
 * ***********************************************************************
 * Material-Item-Table
 * ID - NAME - DESCRIPTION - PRICE - UNIT-NAME(kg, meter, litre etc.)
 * ***********************************************************************
 * UNIT-ENUMS
 * - NAME -
 */

const counterTable: InanoSQLTableConfig = {
  name: "counterTable",
  model: {
    "id:uuid": { pk: true },
    "delaying:boolean": { default: false },
    "active:boolean": { default: false },
    "start:int": { default: 0 },
    "current:int": { default: 0 },
    "diff:obj": {
      name: "counterTableDiff",
      model: {
        "hour:int": { default: 0 },
        "minute:int": { default: 0 },
        "second:int": { default: 0 },
      },
    },
  },
};
// export default counterTable;
// Contact-Table
// ID - NAME - SURNAME - STREET+NO - ZIP - CITY - TEL[+] - MOBILE[+] - MAIL[+]
const contactsTable: InanoSQLTableConfig = {
  name: "contactsTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": { default: "" },
    "surname:string": { notNull: true },
    "street:string": { default: "" },
    "zip:string": { default: "" },
    "city:string": { default: "" },
    "tel:string[]": { default: [""] },
    "mobile:string[]": { default: [""] },
    "mail:string[]": { default: [""] },
  },
  queries: [
    {
      name: "createNewEmptyUserEntryForEdit",
      args: {},
      call: (db: any, args: any) => {
        return db.query("upsert", { id: "new-contact-to-edit" }).emit();
      },
    },
  ],
};
// Work-Table
// ID - CONTACTID - DESCRIPTION
const workTable: InanoSQLTableConfig = {
  name: "workTable",
  model: {
    "id:uuid": { pk: true },
    "contactID:string": { notNull: true },
    "name:string": {},
    "labour:string[]": {}, // workDurationTable
    "materials:string[]": {}, // materialItemTable
    "description:string": {},
  },
  queries: [
    {
      name: "createNewWorkLogForContact",
      args: {
        "contactID:uuid": {},
      },
      call: (db: any, args: any) => {
        const work = {
          name: "New Work Log",
          contactID: args.contactID,
          labour: [],
          materials: [],
          description: "",
        };
        return db.query("upsert", work).emit();
      },
    },
    {
      name: "getWorkLogsOfContact",
      args: {
        "contactID:uuid": {},
      },
      call: (db: any, args: any) => {
        return db
          .query("select")
          .where(["contactID", "=", args.contactID])
          .emit();
      },
    },
  ],
};

//  Work-Duration-Table
//  ID - WORKID - START-TIMESTAMP - FINISHED-TIMESTAMP - DESCRIPTION
const workDurationTable: InanoSQLTableConfig = {
  name: "workDurationTable",
  model: {
    "id:uuid": { pk: true },
    "start:date": { notNull: true },
    "finish:date": { notNull: true },
    "description:string": {},
    "workID:string": {},
  },
};

//  Material-List-Table
//  ID - WORKID - MATERIALID - AMOUNT - PRICE - NOTES

const materialListTable: InanoSQLTableConfig = {
  name: "materialListTable",
  model: {
    "id:uuid": { pk: true },
    "items:materialItemTable[]": {},
    "workID:string": {},
  },
};

// Material-Item-Table
// ID - NAME - DESCRIPTION - PRICE - UNIT-NAME(kg, meter, litre etc.)

const materialItemTable: InanoSQLTableConfig = {
  name: "materialItemTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": { notNull: true },
    "description:string": {},
    "price:float": {},
    "amount:float": {},
    "unit:string": { default: "n/a" },
    "materialListID:string": {},
  },
};

// Material-Stocks-Table

// ID - NAME - DESCRIPTION - PRICE - UNIT-NAME(kg, meter, litre etc.)

const materialStockTable: InanoSQLTableConfig = {
  name: "materialStockTable",
  model: {
    "id:uuid": { pk: true },
    "amount:float": { notNull: true },
    "description:string": { default: "0" },
    "price:float": {},
    "unit:string": { default: "n/a" },
  },
};

// UNIT-ENUMS
const unitEnumsTable: InanoSQLTableConfig = {
  name: "unitEnumsTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": { default: "" }, // METER|KG|
  },
};

const counterModelTables = [
  counterTable,
  contactsTable,
  workTable,
  workDurationTable,
  materialItemTable,
  materialListTable,
  materialStockTable,
  unitEnumsTable,
];

export default counterModelTables;
