import faker from "faker";

function random(count) {
  const buffer = this;
  const result = [];
  function getRandomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  while (count > 0) {
    const randomIndex = getRandomIndex(buffer.length - 1);
    result.push(buffer.splice(randomIndex, 1));
    count--;
  }
  return result;
}

function fakeContacts(num = 0) {
  const list = new Array(num).fill("");

  const results = list.map((item, id) => {
    return {
      id: `dummy-data-${id}`,
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      street: `${faker.address.streetAddress()} ${faker.address.streetSuffix()}`,
      zip: faker.address.zipCode(),
      city: faker.address.city(),
      tel: [faker.phone.phoneNumber()],
      mobile: [faker.phone.phoneNumber()],
      mail: [faker.internet.email()]
    };
  });

  return results;
}

function fakeWorkTable(num = 0, customers) {
  const list = new Array(num).fill("");

  const results = list.map((item, id) => {
    return {
      id: `dummy-data-work-${id}`,
      customerId: random.call(customers, 1).id,
      description: faker.lorem.paragraphs()
    };
  });

  return results;
}

function createFakeDataSet(size = 0) {
  const result = {
    contacts: fakeContacts(size)
  };

  result.workTable = new Array(5).fill(fakeWorkTable(5, result.contacts));
}

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
