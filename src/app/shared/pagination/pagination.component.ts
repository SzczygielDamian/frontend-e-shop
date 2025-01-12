import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  pageNumber = input.required<number>();
  pageSize = input.required<number>();
  totalElements = input.required<number>();
  pageChanged = output<PageEvent>();

  handlePageEvent(e: PageEvent) {
    this.pageChanged.emit(e);
  }
}
