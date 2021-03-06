import { InanoSQLTableConfig, InanoSQLInstance, InanoSQLQuery, InanoSQLDataModel } from "@nano-sql/core/lib/interfaces";
import { NewEntryEnums, PresetQueryEnums } from "../../__typings/interfaces.d";

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
    "surname:string": { default: "", notNull: true },
    "street:string": { default: "" },
    "zip:string": { default: "" },
    "city:string": { default: "" },
    "tel:string[]": { default: [""] },
    "mobile:string[]": { default: [""] },
    "mail:string[]": { default: [""] },
  },
  queries: [
    {
      name: PresetQueryEnums.createNewEmptyUserEntryForEdit,
      call: (
        db: InanoSQLInstance,
        args?:
          | string
          | {
              [colAndType: string]: InanoSQLDataModel;
            }
      ): InanoSQLQuery => {
        return db.query("upsert", { id: NewEntryEnums.NEW_CONTACT_ID }).emit();
      },
    },
    {
      name: "contactsSuggestion",
      args: {
        "query:string": {},
      },
      call: (db: InanoSQLInstance, args: { query: string }): InanoSQLQuery => {
        return db
          .query("select")
          .where([["name", "LIKE", `%${args.query}%`], "OR", ["surname", "LIKE", `%${args.query}%`]])
          .orderBy(["name DESC", "surname DESC"])
          .emit();
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
    "labour:any[]": {
      notNull: false,
      model: {
        "id:uuid": { pk: true },
        "start:string": {},
        "finish:string": {},
        "description:string": {},
      },
    }, // calendarTable
    "materials:any[]": {
      model: {
        "id:uuid": { pk: true },
        "name:string": { notNull: true },
        "description:string": {},
        "price:float": {},
        "amount:float": {},
        "unit:string": { default: "n/a" },
        // "materialListID:string": {},
      },
    }, // materialItemTable
    "description:string": {},
  },
  queries: [
    {
      name: PresetQueryEnums.getWorkLogsOfContact,
      args: {
        "contactID:uuid": {},
      },
      call: (db: InanoSQLInstance, args: { contactID: string }): InanoSQLQuery => {
        return db
          .query("select")
          .where([["contactID", "=", args.contactID], "AND", ["id", "!=", NewEntryEnums.NEW_WORKLOG_ID]])
          .emit();
      },
    },
  ],
};

const calendarTable: InanoSQLTableConfig = {
  name: "calendarTable",
  model: {
    "id:uuid": { pk: true },
    "start:date": {
      notNull: true,
      default: new Date(Date.now()).toISOString(),
    },
    "finish:date": {
      notNull: true,
      default: new Date(Date.now()).toISOString(),
    },
    "description:string": {},
    "contactID:string": {},
    "type:string": {},
  },
};

const materialItemTable: InanoSQLTableConfig = {
  name: "materialItemTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": { notNull: true },
    "description:string": {},
    "price:float": {},
    "amount:float": {},
    "unit:string": { default: "n/a" },
    // "materialListID:string": {},
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
  calendarTable,
  materialItemTable,
  materialStockTable,
  unitEnumsTable,
];

export default counterModelTables;
