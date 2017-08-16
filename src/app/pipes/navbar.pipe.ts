import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'navbar'
})
export class NavbarPipe implements PipeTransform {

  transform(value: any): any {
    var output: any[] = [];
    value.forEach((page) => {
      if (page.displayInNav) {
        output.push(page);
      }
    });
    return output;
  }

}
