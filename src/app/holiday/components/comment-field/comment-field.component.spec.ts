import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommentFieldComponent} from './comment-field.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('CommentFieldComponent', () => {
  let component: CommentFieldComponent;
  let fixture: ComponentFixture<CommentFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule],
      declarations: [CommentFieldComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('produces output when submitting a comment', async (done) => {
    component.submitComment.subscribe(async (it: string) => {
      await fixture.whenStable();
      expect(it).toBe('someComment');
      expect(component.value).toBe('');
      done();
    });

    const input = fixture.debugElement.query(By.css('textarea'));
    input.nativeElement.value = 'someComment';
    input.nativeElement.dispatchEvent(new Event('input'));
    input.nativeElement.dispatchEvent(new KeyboardEvent('keyup', {
      'key': 'Enter'
    }));
  });
});
