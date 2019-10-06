import { nSQL } from "nSQL";
nSQL().createDatabase({
    id: "shoplist_local", // can be anything that's a string
    mode: "PERM", // save changes to IndexedDB, WebSQL or SnapDB!
    tables: [ // tables can be created as part of createDatabase or created later with create table queries
        {
            name: "users",
            model: {
                "id:uuid": {pk: true},
                "name:string": {},
                "age:int": {}
            }
        }
    ],
    version: 3, // current schema/database version
    onVersionUpdate: (prevVersion) => { // migrate versions
         return new Promise((res, rej) => {
             switch(prevVersion) {
                 case 1:
                     // migrate v1 to v2
                    res(2);
                    break;
                 case 2:
                     // migrate v2 to v3
                     res(3);
                     break;
             }

         });

     }
}).then(() => {
    // ready to query!
}).catch(() => {
    // ran into a problem
})
