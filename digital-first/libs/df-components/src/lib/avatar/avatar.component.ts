import { Component, Input, OnChanges, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'digital-first-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {

  _email: string
  _name: string

  @Input('email')
  set email(val: string) {
    this._email = val
  }

  get email(): string {
    return this._email
  }

  @Input('name')
  set name(val: string) {
    this._name = val
  }

  get name(): string {
    return this._name
  }

  @Input('size') size = 100

  @Input('background') background = this.getRandomColor()

  @Input('displayType') displayType = 'none'

  letter = '?'

  @Input('defaultProtocol') defaultProtocol: string = null

  fontSize = 49
  fontColor = '#FFFFFF'
  props: any = null

  getRandomColor(): string {
    const letters = '0123456789ABCDEF'.split('')
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  getLetterColor(letters): string {

    const padded = letters.padEnd(3, '~').substring(0, 3)

    const color = this.ascii_to_hexa(padded)
    return `#${color}`
  }

  ascii_to_hexa(str) {
    const arr1 = []
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16)
      arr1.push(hex)
    }
    return arr1.join('')
  }

  /**
   * Set the avatar letter based on full name or email
   */
  getLetter(): void {
    if (this.name && this.name.length) {
      const nameInitials = this.name.match(/\b(\w)/g)
      if (nameInitials) {
        const nameLetters = nameInitials.slice(0, 3).join('')
        this.letter = nameLetters.toUpperCase()
      } else {
        this.letter = this.name[0]
      }
    } else if (this.email && this.email.length) {
      const emailInitials = this.email.split('@')[0].match(/\b(\w)/g)
      const emailLetters = emailInitials.slice(0, 3).join('')
      this.letter = emailLetters.toUpperCase()
    }

    this.background = this.getLetterColor(this.letter)
  }

  setCssProps() {
    this.fontSize = (39 * this.size) / 100
    this.props = {
      size: `${this.size}px`,
      lineheight: `${this.size}px`,
      background: this.background,
      fontSize: `${this.fontSize}px`
    }

    switch (this.displayType) {
      case 'rounded':
        this.props['borderradius'] = '5%'
        break
      case 'circle':
        this.props['borderradius'] = '50%'
        break
      default:
        this.props['borderradius'] = '0'
    }
  }

  /**
   * Set avatar size, background and display type
   */
  ngOnInit() {
    this.setCssProps()
    this.getLetter()
  }

  /**
   * Updates avatar image and letter on email updates
   */
  ngOnChanges() {
    this.getLetter()
  }

}