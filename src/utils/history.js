import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from "history";
import { isLogged } from "utils/token";
export function loginJump(history) {
  if (!isLogged()) {
    setTimeout(() => {
      history.replace("/login");
    }, 1000);
  } 

}
