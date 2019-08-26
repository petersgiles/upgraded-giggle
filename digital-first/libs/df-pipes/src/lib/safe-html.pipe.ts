import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    if (value) {
      return this.sanitized.bypassSecurityTrustHtml(value)
    }
  }

}


@Pipe({
  name: 'safeHtmlStyle'
})
export class SafeHtmlStylePipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    if (value) {
      return this.sanitized.bypassSecurityTrustStyle(value)
    }
  }

}
