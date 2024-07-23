import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';

import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService)
  //order = input<'asc' | 'desc'>();
  order = signal<'asc' | 'desc'>('desc')
  userId = input.required<string>()
  userTasks = computed(() => this.tasksService.allTasks().filter(task => task.userId === this.userId())
  .sort((a, b) => {
    if(this.order() === 'desc'){
      return a.id > b.id ? -1 : 1
    }else{
      return a.id > b.id ? 1 : -1
    }
  })
)
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    const subscription =this.activatedRoute.queryParams.subscribe({
      next: params => this.order.set(params['order']),
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}
