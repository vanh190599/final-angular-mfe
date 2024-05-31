import { Component, Input } from "@angular/core";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "app-list-errors",
  templateUrl: "./list-errors.component.html",
  imports: [NgIf, NgForOf],
  standalone: true,
})
export class ListErrorsComponent {

}
