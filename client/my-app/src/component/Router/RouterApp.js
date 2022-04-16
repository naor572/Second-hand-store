import { Routes, Route } from "react-router-dom";
import React from "react";
import linksData from "./routerData";

const RouterApp = () => {
  return (
    <div>
      <Routes>
        {linksData.map((element, index) => {
          const { path } = element;
          return (
            <Route
              key={"route" + index}
              path={path}
              exact
              element={<element.component />}
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default RouterApp;
//<Route path="*" element={<WrongUrl />}></Route>
