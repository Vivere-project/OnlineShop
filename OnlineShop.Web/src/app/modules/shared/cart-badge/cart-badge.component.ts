import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cart-badge',
  templateUrl: './cart-badge.component.html',
  styleUrls: ['./cart-badge.component.scss']
})
export class CartBadgeComponent implements OnInit {

  @Input() itemsCount: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
