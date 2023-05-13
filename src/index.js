import "./styles/global.css";
import "./styles/header.css";
import "./styles/sidebar.css";
import "./styles/main.css";
import "./styles/modals.css";

import { initModals, loadProjectsList, loadThisWeek } from "./app";

initModals();
loadProjectsList();
loadThisWeek();
