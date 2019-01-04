import { ParentTask } from '../Models/ParentTask';
import { Project } from './Project';
import { User } from '../User';
export class Task {
    public parent_id: number;
    public project_id: number;
    public task1: string;
    public start_date: Date;
    public end_date: Date;
    public priority: number = 0;
    public status: string;
    public user_id: number;
    public parent_task: ParentTask = new ParentTask();
    public task_id: number;
    public Project: Project = new Project();
    public users: User[] = [];
}