import React, { useReducer, useEffect } from "react";
import Typography from "./__ui/typography";
import NanoDataBase from "./db";
import {
  MemoryRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import "./index.scss";
import Home from "./views/home";
import WorkLog from "./views/worklogs";
import Customers from "./views/contacts";
import Settings from "./views/settings";
import Edit from "./views/edit";

function reducer(state, action) {
  const appliedState = {};
  switch (action.type) {
    case "CHANGE":
      break;
    case "UPSERT":
      //target: workTable
      // result: {id, ....}
      console.log("..", action);
      appliedState.cart = { position: "inline", id: action.event.result.id };
      break;
    case "DELETE":
      break;
    case "ORIENTATION":
      break;
    default:
  }
  return {
    ...state,
    ...appliedState
  };
}

function Page() {
  const location = useLocation();

  location.state = location.state || {};
  const [appState, dispatch] = useReducer(reducer, {
    ...location.state,
    cart: {
      position: ""
    }
  });

  document.oncontextmenu = function() {
    return false;
  };
  function getOrientation() {
    const orientation =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    dispatch({ type: "ORIENTATION", orientation });
  }
  function onDataChangeHandler(action) {
    dispatch(action);
  }
  useEffect(() => {
    location.state = {
      ...location.state,
      ...appState
    };
  }, [appState, location.state]);

  useEffect(() => {
    window.addEventListener("resize", getOrientation);
    return () => {
      window.removeEventListener("resize", getOrientation);
    };
  });

  return (
    <Typography>
      <NanoDataBase onDataChange={onDataChangeHandler}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/history" component={WorkLog} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/edit/:type/:id" component={Edit} />
        </Switch>
        {/* {<Cart state={location.state}></Cart>} */}
      </NanoDataBase>
    </Typography>
  );
}

function App() {
  return (
    <Router>
      <Page />
    </Router>
  );
}
export default App;
