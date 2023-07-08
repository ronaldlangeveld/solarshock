export interface ITask {
    run(): Promise<void>;
    schedule(): string; // cron format string
    getName(): string;
}

export interface IAdapter {
    getTasks(): ITask[];
}

export class TaskManager {
    private tasks: ITask[] = [];

    constructor(adapters: IAdapter[]) {
        for (const adapter of adapters) {
            this.tasks.push(...adapter.getTasks());
        }
    }

    startAllTasks() {
        for (const task of this.tasks) {
            this.startTask(task);
        }
    }

    private startTask(task: ITask) {
        const job = new CronJob(task.schedule(), () => task.run());
        job.start();

        console.log(`Task ${task.getName()} started.`);
    }
}
