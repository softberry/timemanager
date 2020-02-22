import React from "react";

import Card, { CardBody, CardTitle } from "../../__ui/card";
const MaterialLogs = ({ id = 0 }) => {
  return (
    <>
      <Card>
        <CardTitle>Materials - Autocomplete</CardTitle>
        <CardBody>List of materials</CardBody>
      </Card>
    </>
  );
};

export default MaterialLogs;
