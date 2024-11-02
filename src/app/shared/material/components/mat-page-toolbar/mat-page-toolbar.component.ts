import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TranslateModule } from "@ngx-translate/core";
import { MatHollowButtonComponent } from "@shared";

@Component({
  selector: "mat-page-toolbar",
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatHollowButtonComponent, TranslateModule],
  templateUrl: "./mat-page-toolbar.component.html",
  styleUrl: "./mat-page-toolbar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatPageToolbarComponent {
  @Input() pageTitle: string = "";
  @Output() openDialogAction: EventEmitter<void> = new EventEmitter();

  public openDialog() {
    this.openDialogAction.emit();
  }
}
