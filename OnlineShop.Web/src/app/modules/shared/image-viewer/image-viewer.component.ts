import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit, OnChanges {
  @Input() file: Blob | null = null
  @Input() isLoading: boolean = false
  @Input() customWidth: number = 150
  @Input() customHeight: number = 150
  imageToShow: any;
  constructor() { }

  ngOnInit(): void {
      this.imageToShow = this.isLoading ? "assets/loading.gif" : "assets/image-not-found.png";
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isLoading) {
      this.imageToShow = this.isLoading ? "assets/loading.gif" : "assets/image-not-found.png";
    }
    else if (changes.file) {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
      }, false);

      if (this.file) {
        reader.readAsDataURL(this.file);
      }
    }
  }
}
