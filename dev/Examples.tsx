import { A, Route, Router } from "@solidjs/router";
import { Component } from "solid-js";

import { FlexPage } from "./FlexPage";
import { Layouts } from "./Layouts";

const ExamplesLinkList: Component = () => {
  return (
    <div>
      <h2>Examples</h2>
      <ol>
        <li>
          <A href="/custom-layouts">Custom Layouts</A>
        </li>
        <li>
          <A href="/flex-page">Flex Layout</A>
        </li>
      </ol>
    </div>
  );
};

export const Examples: Component = () => {
  return (
    <Router>
      <Route path="/" component={ExamplesLinkList} />
      <Route path="/custom-layouts" component={Layouts} />
      <Route path="/flex-page" component={FlexPage} />
    </Router>
  );
};
