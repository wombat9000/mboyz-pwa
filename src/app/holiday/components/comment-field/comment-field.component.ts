import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-comment-field',
  template: `
    <mat-form-field>
    <textarea matInput
              matTextareaAutosize
              [(ngModel)]="value"
              (keyup.enter)="submit()"
              placeholder="Kommentieren ..."></textarea>
    </mat-form-field>
  `,
  styleUrls: ['./comment-field.component.scss']
})
export class CommentFieldComponent {
  value = '';
  @Output()
  submitComment = new EventEmitter<string>();

  submit() {
    this.submitComment.emit(this.value);
    this.value = '';
  }
}
