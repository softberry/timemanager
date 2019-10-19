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

export default counterTable;
