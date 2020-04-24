import React, { FunctionComponent, createContext, useReducer, useEffect } from "react";

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
  name: string;
  label: string;
  type: "contact";
  required: boolean;
  validate: boolean;
  onSelectCallback: (selectedEntry: IContactsTableModel) => void;
}

interface ISuggestionState {
  value: string;
}
interface ISuggestionAction {
  type: "SET" | "RESET";
  data?: IContactsTableModel;
  value: string;
}
const SuggestionContext = createContext<ISuggestionState>({ value: "" });
const SuggestionDispatcher = createContext((p: ISuggestionAction) => {
  //
});

const Suggestion: FunctionComponent<ISuggestionProps> = ({
  name,
  label,
  type,
  required,
  validate,
  onSelectCallback,
}) => {
  function suggestedEntryReducer(state: ISuggestionState, action: ISuggestionAction): ISuggestionState {
    switch (action.type) {
      case "SET":
        if (!action.data) return state;
        return {
          ...state,
          value: `${action.data.name} ${action.data.surname}`,
        };
      case "RESET":
        return {
          ...state,
        };
    }
    return { ...state, ...action };
  }

  const [suggesttedEntry, dispatchSuggestedEntry] = useReducer(suggestedEntryReducer, { value: "" });

  useEffect(() => {
    console.log(suggesttedEntry);
  }, [suggesttedEntry]);

  return (
    <SuggestionContext.Provider value={{ value: "" }}>
      <SuggestionDispatcher.Provider value={dispatchSuggestedEntry}>
        <Input
          name={name}
          label={label}
          type="text"
          required={true}
          validate={true}
          value={suggesttedEntry.value}
          validationType={ValidationTypeEnums.SUGGESTION}
          suggestionTable={PresetSuggestionEnums.contactsSuggestion}
        />
      </SuggestionDispatcher.Provider>
    </SuggestionContext.Provider>
  );
};

export { Suggestion as default, SuggestionContext, SuggestionDispatcher };