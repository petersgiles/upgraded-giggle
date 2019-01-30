import { Component } from '@angular/core'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'

@Component({
  selector: 'digital-first-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent {

  constructor() {

  }

  deck = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ]

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex)
    }
  }
}
