import React, {useEffect, useState} from "react";
import "./App.css"
import Filters from "./components/UI/Filters";

function App() {
  const [filters, setFilters] = useState({
    admNo: '',
    semNo: '',
    semType: '',
    dept: '',
    session: ''
  });

  const filtersChangeHandler = (key, value) => {
    switch(key){
      case "admNo": {
        setFilters((prevState) => {
          return {...prevState, admNo: value};
        })
      }
        break;
      case "session": {
        setFilters((prevState) => {
          return {...prevState, session: value};
        })
      }
        break;
      case "semNo": {
        setFilters((prevState) => {
          return {...prevState, semNo: value};
        })
      }
        break;
      case "semType": {
        setFilters((prevState) => {
          return {...prevState, semType: value};
        })
      }
        break;
      case "dept": {
        setFilters((prevState) => {
          return {...prevState, dept: value};
        })
      }
        break;
    }
  }
  console.log(filters);
  return (
    <Filters changeHandler={filtersChangeHandler} />
  );
}

export default App;
