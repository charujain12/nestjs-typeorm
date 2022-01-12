import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTasksDto } from './dto/create-task.dto';
import { GettaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ){}
  
  getTask(filterDto: GettaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTask(filterDto);
  }

  async getTaskbyId(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTasksDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {    
    const count = await this.tasksRepository.delete(id);
    if (count.affected == 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskbyId(id);
    task.status = status;

    await this.tasksRepository.save(task);
    return task;
  }
}
