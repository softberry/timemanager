import React, { FC, createContext, useReducer, useEffect } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import {
  ThemeEnums,
  ValidationTypeEnums,
  IContactsTableModel,
  PresetSuggestionEnums,
} from "../../../__typings/interfaces.d";
import Input from "../input";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

interface ISuggestionProps {
  /** Name of the suggestion field */
  name: string;
  /** Label of the suggestion (input) field  */
  label: string;
  /** Type of Suggestion, which decides to data table to be searched for */
  type: PresetSuggestionEnums[];
  /** is Field required */
  required: boolean;
  /** Sould be validated */
  validate: boolean;
  /** Callback Function to be called on selection event */
  onSelectCallback: (selectedEntry: IContactsTableModel) => void;
}

/*
  <Suggestion />
  uses <Input /> component internally. <Input /> component contains <SuggestionList />
  which listens SuggestionContext and renders itself if hasList parameter is true.

*/

interface ISuggestionState {
  hasList: boolean;
  target?: { [PresetSuggestionEnums: string]: boolean };
  value?: string;
  required?: boolean;
  validate?: boolean;
}

interface ISuggestionAction {
  type: "SET" | "RESET";
  data?: IContactsTableModel;
  value: string;
}
const SuggestionContext = createContext<ISuggestionState>({ hasList: false });
const SuggestionDispatcher = createContext((p: ISuggestionAction) => {
  //
});

const Suggestion: FC<ISuggestionProps> = ({
  name,
  label,
  type,
  required,
  validate,
  onSelectCallback,
}: ISuggestionProps) => {
  function suggestedEntryReducer(state: ISuggestionState, action: ISuggestionAction): ISuggestionState {
    switch (action.type) {
      case "SET":
        if (!action.data) return state;
        onSelectCallback(action.data);
        return {
          ...state,
          value: `${action.data.name} ${action.data.surname}`,
        };
      case "RESET":
        return {
          ...state,
        };
      default:
        return { ...state };
    }
  }

  const [suggesttedEntry, dispatchSuggestedEntry] = useReducer(suggestedEntryReducer, { hasList: false });

  useEffect(() => {
    console.log(suggesttedEntry);
  }, [suggesttedEntry]);

  return (
    <SuggestionContext.Provider
      value={{
        hasList: true,
        target: {
          [PresetSuggestionEnums.CONTACT]: true,
        },
        required,
        validate,
      }}
    >
      <SuggestionDispatcher.Provider value={dispatchSuggestedEntry}>
        <Input
          name={name}
          label={label}
          type="text"
          required={true}
          validate={true}
          value={suggesttedEntry.value}
          validationType={ValidationTypeEnums.SUGGESTION}
        />
      </SuggestionDispatcher.Provider>
    </SuggestionContext.Provider>
  );
};

export { Suggestion as default, SuggestionContext, SuggestionDispatcher };
export * from "./suggestionList";
