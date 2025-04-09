import { renderTaskLists } from "../modules/views.js";

document.querySelector("#clear-task").addEventListener("click", () => {
    const is_confirm = confirm("Are you sure want to clear the task?");

    if (is_confirm) {
        renderTaskLists();
    }
});
