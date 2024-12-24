import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarElements: string[] = ["Books", "Coffee Mugs", "Mouse Pads", "Luggage Tags"];
}
