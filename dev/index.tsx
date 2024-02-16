import { render } from "solid-js/web";
import "./styles.css";

import { Examples } from "./Examples";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      sortableHandle: boolean;
    }
  }
}

render(() => <Examples />, document.getElementById("root")!);
