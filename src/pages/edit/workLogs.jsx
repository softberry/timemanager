import React from "react";
import Input from "../../__ui/input";

export default function WorkLogDetails({ table }) {
  return (
    <>
      <div>
        {Object.keys(table).map((item, key) => {
          const field = {
            id: `${table.id}-${item}`,
            name: item,
            value: table[item]
          };

          return (
            <div key={key}>
              <Input {...field} />
            </div>
          );
        })}
      </div>
    </>
  );
}
