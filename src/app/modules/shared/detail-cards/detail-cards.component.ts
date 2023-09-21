import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-cards',
  templateUrl: './detail-cards.component.html',
  styleUrls: ['./detail-cards.component.css']
})
export class DetailCardsComponent {

  @Input() title: string;
}
