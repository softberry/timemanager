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
    "delaying:boolean": false,
    "active:boolean": false,
    "start:int": 0,
    current: 0,
    diff: {
      "hour:int": 0,
      "minute:int": 0,
      "second:int": 0
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
    "name:string": "",
    "surname:string": "",
    "street:string": "",
    "zip:string": "",
    "city:string": "",
    "tel:array": [],
    "mobile:array": [],
    "mail:array": []
  }
};

// Work-Table
// ID - CUSTOMERID - DESCRIPTION
const workTable = {
  name: "workTable",
  model: {
    "id:uuid": { pk: true },
    "customerId:string": "",
    "description:string": ""
  }
};

//  Work-Duration-Table
//  ID - WORKID - START-TIMESTAMP - FINISHED-TIMESTAMP - DESCRIPTION
const workDurationTable = {
  name: "workDurationTable",
  model: {
    "id:uuid": { pk: true },
    "workId:string": "",
    "timeStampStart:string": "",
    "timeStampEnd:string": "",
    "description:string": ""
  }
};

// Material-Item-Table
// ID - NAME - DESCRIPTION - PRICE - UNIT-NAME(kg, meter, litre etc.)

const materialItemTable = {
  name: "materialItemTable",
  model: {
    "id:uuid": { pk: true },
    "name:string": "",
    "description:string": "",
    "price:string": "",
    "unit:string": ""
  }
};

//  Material-List-Table
//  ID - WORKID - MATERIALID - AMOUNT - PRICE - NOTES

const materialListTable = {
  name: "materialListTable",
  model: {
    "id:uuid": { pk: true },
    "workId:string": "",
    "materialItemId:string": "",
    "amount:string": "",
    "price:string": "",
    "notes:string": ""
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
