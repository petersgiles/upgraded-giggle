import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'niceName'
})
export class NiceNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let first = 'Jon'
    let last = 'Doe'

    if (value) {
      const split = value.replace(' ', '').split(',')
      first = split[1]
      last = split[0]
    }

    return `${first} ${last}`
  }

}
