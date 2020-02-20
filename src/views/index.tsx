import { createContext } from "react";

import { DesignEnums } from "../__typings/interfaces.d";

const ViewContext = createContext(DesignEnums.PRIMARY_VIEW);

export default ViewContext;
