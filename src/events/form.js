import { saveTask, updateTask } from "../modules/storage.js";
import { renderTaskLists } from "../modules/views.js";
import { filterElement } from "./filter.js";

document.querySelector("#task_form").addEventListener("submit", (e) => {
    e.preventDefault();

    const input_field = document.querySelector('[name="task_field"]');

    if (input_field.dataset._id) {
        updateTask(input_field.dataset._id, { summary: input_field.value });
    } else {
        saveTask(
            {
                created_at: new Date().toISOString(),
                is_complete: false,
                summary: input_field.value,
                _id: +new Date(),
            },
            false
        );
    }

    input_field.value = "";
    delete input_field.dataset._id;
    document.querySelector("#label_task").innerHTML = "Add Task";

    renderTaskLists(filterElement?.value);
});
