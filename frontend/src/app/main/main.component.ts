import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  newTaskDescription = '';
  userName = '';
  showWarningModal = false;
  warningMessage = '';
  searchText = '';

  showModal = false;
  modalWarningMessage = '';

  showLogoutModal = false;

  constructor(private taskService: TaskService, public auth: AuthService, public router: Router) {}

  get filteredTasks(): Task[] {
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.userName = localStorage.getItem('name') || '';
      this.loadTasks();
    } else {
      this.tasks = [];
    }
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.sort((a, b) => {
          const parseDate = (createdTimestamp: string | undefined): number => {
            if (!createdTimestamp || typeof createdTimestamp !== 'string' || createdTimestamp.trim() === '') {
              return 0;
            }
            const date = new Date(createdTimestamp);

            return isNaN(date.getTime()) ? 0 : date.getTime();
          };

          const timeA = parseDate(a.createdAt);
          const timeB = parseDate(b.createdAt);

          return timeB - timeA;
        });
      },
      error: (err) => {
        if (err.status === 401) {
          alert('Por favor inicia sesión para ver tus tareas.');
          this.auth.logout();
          this.tasks = [];
        } else {
          console.error('Error al cargar tareas:', err);
        }
      }
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim() || !this.newTaskDescription.trim()) {
      this.modalWarningMessage = 'Por favor agrega un título y una descripción.';
      return;
    }
    const task: Partial<Task> = { title: this.newTaskTitle, description: this.newTaskDescription, completed: false };
    this.taskService.addTask(task as Task).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.modalWarningMessage = '';
        this.showModal = false;
        this.loadTasks();
      },
      error: (err) => {
        if (err.status === 401) {
          this.warningMessage = 'Sesión expirada, por favor inicia sesión de nuevo.';
          this.showWarningModal = true;
          this.auth.logout();
          this.tasks = [];
        } else {
          this.modalWarningMessage = 'Error al agregar la tarea. Intenta de nuevo.';
          console.error('Error al agregar tarea:', err);
        }
      }
    });
  }

  toggleComplete(task: Task) {
    if (!this.auth.isLoggedIn()) {
      alert('Debes iniciar sesión para modificar tareas.');
      return;
    }

    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe({
      error: (err) => {
        if (err.status === 401) {
          alert('Sesión expirada, por favor inicia sesión de nuevo.');
          this.auth.logout();
          this.tasks = [];
        } else {
          task.completed = !task.completed;
          alert('Error al actualizar la tarea.');
          console.error('Error al actualizar tarea:', err);
        }
      }
    });
  }
  deleteTask(id: string | undefined) {
    if (!this.auth.isLoggedIn()) {
      alert('Debes iniciar sesión para eliminar tareas.');
      return;
    }
    if (!id) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => {
        if (err.status === 401) {
          alert('Sesión expirada, por favor inicia sesión de nuevo.');
          this.auth.logout();
          this.tasks = [];
        }
      }
    });
  }

  logout() {
    this.showLogoutModal = true;
  }

  confirmLogout() {
    this.auth.logout();
    this.tasks = [];
    this.newTaskTitle = '';
    this.userName = '';
    this.showLogoutModal = false;
    this.router.navigate(['/']);
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

  closeWarningModal() {
    this.showWarningModal = false;
  }
}