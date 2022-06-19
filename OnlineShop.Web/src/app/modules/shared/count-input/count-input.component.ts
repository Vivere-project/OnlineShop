import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-input',
  templateUrl: './count-input.component.html',
  styleUrls: ['./count-input.component.scss']
})
export class CountInputComponent implements OnInit {

  countToAdd = 0;
  isCountValid = false;

  constructor() { }

  ngOnInit(): void {
  }

  counterAddOne() {
    this.countToAdd ++;
  }

  counterDropOne() {
    if (this.countToAdd > 1)
      this.countToAdd --;
  }

  onCountChange(newValue: any) {
    newValue = Number(newValue);
    this.isCountValid = !isNaN(newValue) && (newValue) > 0;
    if (this.isCountValid)
      this.countToAdd = Number(newValue);
  }
}
