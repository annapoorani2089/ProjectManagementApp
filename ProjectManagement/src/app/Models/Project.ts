import { Task } from '../Models/Task';
export class Project {
    public project_id: number;
    public project1: string;
    public start_date: Date;
    public end_date: Date;
    public priority: number = 0;
    public suspended: boolean = false;
    public user_id: number;
    public Tasks: Task[] = [];
}