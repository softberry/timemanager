import  { createContext } from "react";
import { VDESIGN } from "../store/constant-enums";

const ViewContext = createContext(VDESIGN.DESIGN_VIEW_PRIMARY);

export default ViewContext;
