import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  private userService = inject(UsersService)
  userId = input.required<string>();

  userName = computed(() => this.userService.users.find(u => u.id === this.userId())?.name)

}
