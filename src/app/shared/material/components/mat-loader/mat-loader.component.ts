import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "mat-loader",
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: "./mat-loader.component.html",
  styleUrls: ["./mat-loader.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatLoaderComponent {
  @Input() diameter: number = 100;
  @Input() strokeWidth: number = 8;
}
