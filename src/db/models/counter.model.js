/**
 * Customer-Table
 * ID - NAME - SURNAME - STREET+NO - ZIP - CITY - TEL[+] - MOBILE[+] - MAIL[+]
 * ***********************************************************************
 * Work-Table
 * ID - CUSTOMERID - DESCRIPTION
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
// Customer-Table
// ID - NAME - SURNAME - STREET+NO - ZIP - CITY - TEL[+] - MOBILE[+] - MAIL[+]
const customerTable = {
  name: "customersTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": {},
    "surname:string": {},
    "street:string": {},
    "zip:string": {},
    "city:string": {},
    "tel:string[]": {},
    "mobile:string[]": {},
    "mail:string[]": {},
    "works:string[]": {} // workTable
  },
  queries: [
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
// ID - CUSTOMERID - DESCRIPTION
const workTable = {
  name: "workTable",
  model: {
    "id:uuid": { pk: true },
    "customerID:string": { notNull: true },
    "name:string": {},
    "labour:string[]": {}, // workDurationTable
    "materials:string[]": {}, // materialItemTable
    "description:string": {}
  },
  queries: [
    {
      name: "createNewWorkLogForCustomer",
      args: {
        "customerID:uuid": {}
      },
      call: (db, args) => {
        const work = {
          name: "New Work Log",
          customerID: args.customerID,
          labour: [],
          materials: [],
          description: ""
        };
        return db.query("upsert", work).emit();
      }
    },
    {
      name: "getWorkLogsOfCustomer",
      args: {
        "customerID:uuid": {}
      },
      call: (db, args) => {
        return db
          .query("select")
          .where(["customerID", "=", args.customerID])
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
  customerTable,
  workTable,
  workDurationTable,
  materialItemTable,
  materialListTable,
  materialStockTable,
  unitEnumsTable
];

export default counterModelTables;
