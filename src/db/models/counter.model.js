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
    "mail:string[]": {}
  }
};

// Work-Table
// ID - CUSTOMERID - DESCRIPTION
const workTable = {
  name: "workTable",
  model: {
    "id:uuid": { pk: true },
    "customerId:string": {},
    "description:string": {}
  }
};

//  Work-Duration-Table
//  ID - WORKID - START-TIMESTAMP - FINISHED-TIMESTAMP - DESCRIPTION
const workDurationTable = {
  name: "workDurationTable",
  model: {
    "id:uuid": { pk: true },
    "workId:string": {},
    "timeStart:date": { notNull: true },
    "timeEnd:date": { notNull: true },
    "description:string": {}
  }
};

// Material-Item-Table
// ID - NAME - DESCRIPTION - PRICE - UNIT-NAME(kg, meter, litre etc.)

const materialItemTable = {
  name: "materialItemTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": { notNull: true },
    "description:string": "",
    "price:float": {},
    "unit:string": { default: "n/a" }
  }
};

//  Material-List-Table
//  ID - WORKID - MATERIALID - AMOUNT - PRICE - NOTES

const materialListTable = {
  name: "materialListTable",
  model: {
    "id:uuid": { pk: true },
    "workId:string": {},
    "materialItemId:string": {},
    "amount:float": {},
    "price:float": {},
    "notes:string": {}
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
  unitEnumsTable
];

export default counterModelTables;
