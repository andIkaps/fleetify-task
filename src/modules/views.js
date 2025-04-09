import { filterElement } from "../events/filter.js";
import { deleteTask, listTasks, updateTask } from "./storage.js";

const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} - ${hours}:${minutes}`;
};

const handleActions = (tasks) => {
    tasks.forEach((task) => {
        const checkbox = document.querySelector(`#task-${task._id}`);
        const delete_button = document.querySelector(
            `#delete_task-${task._id}`
        );
        const edit_button = document.querySelector(`#edit_task-${task._id}`);

        checkbox.addEventListener("change", (event) => {
            const { created_at, is_complete, summary, _id } =
                event.target.dataset;
            const payload = {
                created_at,
                is_complete: /^true$/i.test(is_complete),
                summary,
                _id: parseInt(_id),
            };

            payload.is_complete = event.target.checked;

            updateTask(payload._id, payload);

            renderTaskLists(filterElement?.value);
        });

        delete_button.addEventListener("click", (e) => {
            const is_confirm = confirm("Are you sure want to clear the task?");

            if (is_confirm) {
                deleteTask(parseInt(e.target.dataset._id));

                renderTaskLists(filterElement?.value);
            }
        });

        edit_button.addEventListener("click", (e) => {
            const input_field = document.querySelector('[name="task_field"]');
            input_field.value = e.target.dataset?.summary;
            input_field.dataset._id = e.target.dataset._id;

            document.querySelector("#label_task").innerHTML = "Update Task";

            console.log(e.target.dataset);
        });
    });
};

export const renderTaskLists = (type) => {
    let tasks = listTasks();

    tasks = tasks.filter((task) => {
        switch (type) {
            case "done":
                return task.is_complete == true;
            case "pending":
                return task.is_complete == false;

            default:
                return task;
        }
    });

    let content = "";

    if (!tasks?.length) {
        console.log("asjdasjdkj");

        content += `
            <div class="flex flex-col justify-center items-center gap-5">
                <img src="/assets/empty.png" alt="Image empty" />

                <div class="text-center space-y-1">
                    <h1 class="font-semibold text-gray-100">Oopps...</h1>
                    <p class="text-gray-400">You don't have any tasks at the moment.</p>
                </div>
            </div>
        `;
    }

    tasks.forEach((task) => {
        content += `
            <div class="flex gap-3 transform translate-y-4 animate-fadeIn ${
                task.is_complete && "line-through decoration-red-700"
            }">
                <div class="flex h-6 shrink-0 items-center">
                    <div class="group grid size-4 grid-cols-1">
                        <input
                            id="task-${task._id}"
                            data-_id="${task._id}"
                            data-summary="${task.summary}"
                            data-created_at="${task.created_at}"
                            data-is_complete="${task.is_complete}"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            ${task.is_complete && "checked"}
                            class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                            class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            viewBox="0 0 14 14"
                            fill="none"
                        >
                            <path
                                class="opacity-0 group-has-checked:opacity-100"
                                d="M3 8L6 11L11 3.5"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                class="opacity-0 group-has-indeterminate:opacity-100"
                                d="M3 7H11"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                <div class="text-sm/6 w-full">
                    <div class="flex justify-between items-center">
                        <label
                            for="task-${task._id}"
                            class="font-medium text-gray-900  dark:text-gray-100"
                        >
                            ${formatDate(task.created_at)}
                        </label>

                        <div class="space-x-2">
                            <button id="edit_task-${task._id}" data-_id="${
            task._id
        }" data-summary="${task.summary}" class="${
            task.is_complete && "hidden"
        }">
                                <svg class="pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z" stroke="#fbdd1d" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18" stroke="#fbdd1d" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </button>

                            <button id="delete_task-${task._id}" data-_id="${
            task._id
        }">
                                <svg
                                    class="pointer-events-none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                                        stroke="#9d0208"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p id="comments-description" class="text-gray-500">
                        ${task.summary}
                    </p>
                </div>
            </div>
        `;
    });

    document.querySelector("#task_lists").innerHTML = content;

    handleActions(tasks);
};
