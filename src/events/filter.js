import { renderTaskLists } from "../modules/views.js";

export const filterElement = document.querySelector("#filter");

filterElement?.addEventListener("change", (e) => {
    renderTaskLists(e.target.value);
});
