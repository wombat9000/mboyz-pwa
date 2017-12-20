import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageBoxComponent} from './message-box.component';
import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

describe('MessageBoxComponent', () => {
  let component: MessageBoxComponent;
  let fixture: ComponentFixture<MessageBoxComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatListModule, MatFormFieldModule, FormsModule, MatInputModule, NoopAnimationsModule],
      declarations: [MessageBoxComponent]
    })
      .compileComponents();
  }));

  describe('initial state', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(MessageBoxComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      await fixture.detectChanges();
    });

    it('should have input box', () => {
      let input = debugElement.query(By.css('input'));
      expect(input).toBeTruthy();
    });

    describe('posting a message', () => {
      let input;

      beforeEach(async () => {
        input = debugElement.query(By.css('input'));
      });

      it('should put the new message into the list', async() => {
        let someMessage = 'someMessage';
        input.nativeElement.value = someMessage;
        input.nativeElement.dispatchEvent(new KeyboardEvent("keyup",{
          "key": "Enter"
        }));
        await fixture.detectChanges();
        await fixture.whenStable();

        let list: DebugElement[] = debugElement.queryAll(By.css('.mat-list-item-content'));

        let find = list
          .map(it => it.nativeElement.textContent)
          .find((it) => it.includes(someMessage));

        expect(find).toContain(someMessage);
      });
    });
  });


});
