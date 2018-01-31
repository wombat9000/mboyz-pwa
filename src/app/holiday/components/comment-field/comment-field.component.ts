import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-comment-field',
  template: `
    <mat-form-field>
    <textarea matInput
              matTextareaAutosize
              [(ngModel)]="value"
              (keyup.enter)="submitComment.emit($event.target.value)"
              placeholder="Kommentieren ..."></textarea>
    </mat-form-field>
  `,
  styleUrls: ['./comment-field.component.scss']
})
export class CommentFieldComponent {

  @Output()
  submitComment = new EventEmitter<string>();
  value = '';
}
