import React, { FC, useContext, useEffect, useState, useReducer } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import { SuggestionDispatcher, SuggestionContext } from "./index";
import ViewContext from "../../../views";

import {
  ThemeEnums,
  ISuggestionListProps,
  IDatabaseReducer,
  IContactsTableModel,
  PresetSuggestionEnums,
} from "../../../__typings/interfaces.d";
import { useSelector } from "react-redux";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);
/**
 * SuggestionList Component
 */
export const SuggestionList: FC<ISuggestionListProps> = ({ query }) => {
  const dispatchSuggestion = useContext(SuggestionDispatcher);
  const ctxSuggestion = useContext(SuggestionContext);
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);
  const [results, setResults] = useState<IContactsTableModel[]>([]); //TODO: Add other table types aswell

  function resultsDispatch(
    state: ISuggestionListResults,
    action: {
      type?: PresetSuggestionEnums;
      results?: IContactsTableModel[];
    }
  ): ISuggestionListResults {
    if (action.type && action.results) {
      return {
        [action.type]: action.results,
      };
    }
    return {
      ...state,
    };
  }
  interface ISuggestionListResults {
    [PresetSuggestionEnums.CONTACT]?: IContactsTableModel[];
  }
  const [resultsList, dispatchResultsList] = useReducer(resultsDispatch, {});

  console.log("ctxSuggestion:", ctxSuggestion);
  const suggestionTableMap = new Map();
  suggestionTableMap.set(PresetSuggestionEnums.CONTACT, "contactsTable");
  //TODO: suggestionTableMap.set(PresetSuggestionEnums.MATERIAL, "materialsTable");

  useEffect(() => {
    const searchTerm = query.trim();
    if (searchTerm.length === 0) {
      if (results.length > 0) setResults([]);
      return;
    }
    if (ctxSuggestion.target === undefined) return;

    if (ctxSuggestion.target[PresetSuggestionEnums.CONTACT] === true) {
      nSQL(suggestionTableMap.get(PresetSuggestionEnums.CONTACT))
        .presetQuery(PresetSuggestionEnums.CONTACT, { query: searchTerm })
        .exec()
        .then((r: IContactsTableModel[]) => {
          dispatchResultsList({
            type: PresetSuggestionEnums.CONTACT,
            results: r,
          });
        });
    }
  }, [ctxSuggestion.target, nSQL, query, results.length, suggestionTableMap]);

  return (
    <>
      <div className={styles[`Suggestion-${theme}-${view}`]}>
        <div className={styles[`Suggestion-${theme}-${view}-Wrapper`]}>
          <div className={styles[`Suggestion-${theme}-${view}-List`]}>
            {results.map((data: IContactsTableModel, key) => (
              <div
                key={key}
                onClick={(): void => {
                  dispatchSuggestion({
                    type: "SET",
                    data,
                    value: "",
                  });
                }}
                className={styles[`Suggestion-${theme}-${view}-ListItem`]}
              >
                {data.name}, {data.surname}
              </div>
            ))}
            <div>{resultsList}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestionList;
