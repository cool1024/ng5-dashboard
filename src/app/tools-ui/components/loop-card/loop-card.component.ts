import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ts-loop-card',
  templateUrl: './loop-card.component.html',
  styleUrls: ['./loop-card.component.css']
})
export class LoopCardComponent {

  @Input() loopCard: { id: number, url: string, src: string | SafeResourceUrl, active?: boolean, file?: File };

  @Output() onSave = new EventEmitter<{ id: number, url: string, src: string | SafeResourceUrl, active?: boolean, file?: File }>();
  @Output() onRemove = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) { }

  changeFile(files: File[]) {
    if (files && files.length > 0) {
      this.loopCard.active = false;
      this.loopCard.file = files[0];
      this.loopCard.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.loopCard.file));
    }
  }

  save() {
    this.onSave.emit(this.loopCard);
  }

  remove() {
    this.onRemove.emit();
  }
}
