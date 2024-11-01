import { CommonModule } from "@angular/common";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { matColor } from "src/app/shared/utils/button-utils";

@Component({
  selector: "mat-hollow-button",
  standalone: true,
  imports: [CommonModule, TranslateModule, MatButtonModule, MatTooltipModule, MatIconModule, MatBadgeModule],
  templateUrl: "./mat-hollow-button.component.html",
  styleUrls: ["./mat-hollow-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatHollowButtonComponent {
  @Input() badgeColor: matColor = "warn";
  @Input() badgeValue?: number;
  @Input() color?: matColor;
  @Input() icon?: string;
  @Input() isDisabled: boolean = false;
  @Input() label: string = "";
  @Input() tooltip: string = "";
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Used to emit the click event of the button to the parent component.
   */
  buttonClickEmitter() {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }
}
