import { createContext } from "react";

import { ViewEnums } from "../__typings/interfaces.d";

const ViewContext = createContext(ViewEnums.PRIMARY_VIEW);

export default ViewContext;
