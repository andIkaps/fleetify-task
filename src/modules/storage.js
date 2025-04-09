export const listTasks = () => {
    const data = localStorage.getItem("tasks");

    const tasks = JSON.parse(data) || [];

    return tasks.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
};

export const saveTask = (data, with_clean = false) => {
    return new Promise((resolve, reject) => {
        try {
            const existing_tasks = listTasks();

            const payload = !with_clean ? [...existing_tasks] : data;

            !with_clean && payload.push(data);

            localStorage.setItem("tasks", JSON.stringify(payload));

            resolve(true);
        } catch (error) {
            console.log(error);

            reject(false);
        }
    });
};

export const updateTask = (id, data) => {
    const existing_tasks = listTasks();

    const updatedTask = existing_tasks.map((task) => {
        return task._id == id ? { ...task, ...data } : task;
    });

    saveTask(updatedTask, true);
};

export const deleteTask = (id) => {
    const existing_tasks = listTasks();

    const deletedTask = existing_tasks.filter((task) => task._id != id);

    saveTask(deletedTask, true);
};
