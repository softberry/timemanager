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

const counterTable = {
  name: "counters",
  model: {
    "id:uuid": { pk: true },
    "delaying:boolean": { default: false },
    "active:boolean": { default: false },
    "start:int": { default: 0 },
    "current:int": 0,
    "diff:obj": {
      model: {
        "hour:int": { default: 0 },
        "minute:int": { default: 0 },
        "second:int": { default: 0 }
      }
    }
  }
};
// export default counterTable;
// Contact-Table
// ID - NAME - SURNAME - STREET+NO - ZIP - CITY - TEL[+] - MOBILE[+] - MAIL[+]
const contactsTable = {
  name: "contactsTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": { default: "" },
    "surname:string": { default: "" },
    "street:string": { default: "" },
    "zip:string": { default: "" },
    "city:string": { default: "" },
    "tel:string[]": { default: [""] },
    "mobile:string[]": { default: [""] },
    "mail:string[]": { default: [""] },
    "works:string[]": { default: [""] } // workTable
  },
  queries: [
    {
      name: "createNewEmptyUserEntryForEdit",
      args: {},
      call: (db, args) => {
        return db.query("upsert", { id: "new-contact-to-edit" }).emit();
      }
    },
    {
      name: "addNewWork",
      args: {
        "id:uuid": {},
        "workID:uuid": {},
        "works:string[]": {}
      },
      call: (db, args) => {
        return db
          .query("upsert", { works: args.works.push(args.workID) })
          .where(["id", "=", args.id])
          .emit();
      }
    },
    {
      name: "getWorksArray",
      args: {
        "id:uuid": {}
      },
      call: (db, args) => {
        return db
          .query("select", ["works"])
          .where(["id", "=", args.id])
          .emit();
      }
    }
  ]
};

// Work-Table
// ID - CONTACTID - DESCRIPTION
const workTable = {
  name: "workTable",
  model: {
    "id:uuid": { pk: true },
    "contactID:string": { notNull: true },
    "name:string": {},
    "labour:string[]": {}, // workDurationTable
    "materials:string[]": {}, // materialItemTable
    "description:string": {}
  },
  queries: [
    {
      name: "createNewWorkLogForContact",
      args: {
        "contactID:uuid": {}
      },
      call: (db, args) => {
        const work = {
          name: "New Work Log",
          contactID: args.contactID,
          labour: [],
          materials: [],
          description: ""
        };
        return db.query("upsert", work).emit();
      }
    },
    {
      name: "getWorkLogsOfContact",
      args: {
        "contactID:uuid": {}
      },
      call: (db, args) => {
        return db
          .query("select")
          .where(["contactID", "=", args.contactID])
          .emit();
      }
    }
  ]
};

//  Work-Duration-Table
//  ID - WORKID - START-TIMESTAMP - FINISHED-TIMESTAMP - DESCRIPTION
const workDurationTable = {
  name: "workDurationTable",
  model: {
    "id:uuid": { pk: true },
    "start:date": { notNull: true },
    "finish:date": { notNull: true },
    "description:string": {},
    "workID:string": {}
  }
};

//  Material-List-Table
//  ID - WORKID - MATERIALID - AMOUNT - PRICE - NOTES

const materialListTable = {
  name: "materialListTable",
  model: {
    "id:uuid": { pk: true },
    "items:materialItemTable[]": {},
    "workID:string": {}
  }
};

// Material-Item-Table
// ID - NAME - DESCRIPTION - PRICE - UNIT-NAME(kg, meter, litre etc.)

const materialItemTable = {
  name: "materialItemTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": { notNull: true },
    "description:string": {},
    "price:string": {},
    "amount:string": {},
    "unit:string": { default: "n/a" },
    "materialListID:string": {}
  }
};

// Material-Stocks-Table

// ID - NAME - DESCRIPTION - PRICE - UNIT-NAME(kg, meter, litre etc.)

const materialStockTable = {
  name: "materialStockTable",
  model: {
    "id:uuid": { pk: true },
    "amount:float": { notNull: true },
    "description:string": "",
    "price:float": {},
    "unit:string": { default: "n/a" }
  }
};

// UNIT-ENUMS
const unitEnumsTable = {
  name: "unitEnumsTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": "" // METER|KG|
  }
};

const counterModelTables = [
  counterTable,
  contactsTable,
  workTable,
  workDurationTable,
  materialItemTable,
  materialListTable,
  materialStockTable,
  unitEnumsTable
];

export default counterModelTables;
