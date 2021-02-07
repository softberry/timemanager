import Appointments from "../../components/appointments";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { ViewEnums } from "../../__typings/interfaces.d";

const CalendarView: React.FC = () => {
  return (
    <ViewContext.Provider value={ViewEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <Appointments />
      </DefaultLayout>
    </ViewContext.Provider>
  );
};

export default CalendarView;
