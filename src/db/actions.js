// const tables = [
//   "contactsTable",
//   "toolbarButtonsTable",
//   "workTable",
//   "workDurationTable",
//   "materialItemTable",
//   "materialListTable",
//   "materialStockTable"
// ];

// const events = ["change", "upsert", "delete"];

// export default function nSQLEventListeners(nSQL, cb) {

//   tables.forEach(table => {
//     events.forEach(e => {
//       nSQL(table).on(e, event => {
//         cb({
//           type: e.toUpperCase(),
//           event: event
//         });
//       });
//     });
//   });
// }
