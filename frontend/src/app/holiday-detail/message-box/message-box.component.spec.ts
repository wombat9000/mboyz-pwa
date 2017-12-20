import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageBoxComponent} from './message-box.component';
import {MatFormFieldModule, MatInputModule, MatListModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import moment = require('moment');

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
      const input = debugElement.query(By.css('input'));
      expect(input).toBeTruthy();
    });

    describe('posting a message', () => {
      const someMessage = 'someMessage';

      beforeEach(async () => {
        await sendMessage(someMessage);
      });

      it('message should appear in the list', async () => {
        const message = debugElement.queryAll(By.css('.mat-list-item-content'))
          .map(it => it.nativeElement.textContent)
          .find((it) => it.includes(someMessage));

        expect(message).toContain(someMessage);
      });

      it('message should have a timestamp', () => {
        const message = debugElement.queryAll(By.css('.mat-list-item-content'))
          .map(it => it.nativeElement.textContent)
          .find((it) => it.includes(someMessage));

        const messageInComponent = component.messages.find(it => it.message === someMessage);

        expect(message).toContain(moment().format('Do MMMM'));
      });
    });
  });

  async function sendMessage(someMessage: string) {
    const input = debugElement.query(By.css('input'));
    input.nativeElement.value = someMessage;
    input.nativeElement.dispatchEvent(new KeyboardEvent("keyup", {
      "key": "Enter"
    }));
    await fixture.detectChanges();
    await fixture.whenStable();
  }
});
