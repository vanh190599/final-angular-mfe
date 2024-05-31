import { inject, Pipe, PipeTransform, SecurityContext } from "@angular/core";

@Pipe({
  name: "markdown",
  standalone: true,
})
export class MarkdownPipe {

}
