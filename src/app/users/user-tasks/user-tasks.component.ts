import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports:[RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  private userService = inject(UsersService)
  userId = input.required<string>();
  message = input.required<string>()

  userName = computed(() => this.userService.users.find(u => u.id === this.userId())?.name)

  ngOnInit(): void {
    console.log("message: " + this.message())
  }




}
