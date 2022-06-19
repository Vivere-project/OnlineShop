import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-color-circle',
  templateUrl: './color-circle.component.html',
  styleUrls: ['./color-circle.component.scss']
})
export class ColorCircleComponent implements OnInit {

  @Input() color: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
