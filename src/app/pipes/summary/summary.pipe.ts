import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, limit?: number): unknown {
      let actualLimit = (limit) ? limit : 20
      return !value ? null : value.substring(0, actualLimit) + "...";
  }

}
