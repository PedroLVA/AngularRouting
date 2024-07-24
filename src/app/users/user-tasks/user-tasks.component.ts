import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';


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
  private activatedRoute = inject(ActivatedRoute);

  userName = computed(() => this.userService.users.find(u => u.id === this.userId())?.name)

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: data => {
        console.log(data)
      }
    })
  }

}


