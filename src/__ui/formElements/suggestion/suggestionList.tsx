import React, { FC, useContext, useEffect, useState } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import { SuggestionDispatcher } from "./index";
import ViewContext from "../../../views";

import {
  ThemeEnums,
  ISuggestionListProps,
  IDatabaseReducer,
  IContactsTableModel,
} from "../../../__typings/interfaces.d";
import { useSelector } from "react-redux";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const SuggestionList: FC<ISuggestionListProps> = ({ query, table }) => {
  const dispatchSuggestion = useContext(SuggestionDispatcher);
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);
  const [results, setResults] = useState<IContactsTableModel[]>([]); //TODO: Add other table types aswell

  useEffect(() => {
    const searchTerm = query.trim();
    if (searchTerm.length === 0) {
      if (results.length > 0) setResults([]);
      return;
    }

    nSQL("contactsTable")
      .presetQuery(table, { query: searchTerm })
      .exec()
      .then((r: IContactsTableModel[]) => {
        setResults(r);
      });
  }, [nSQL, query, table, results.length]);

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
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestionList;
