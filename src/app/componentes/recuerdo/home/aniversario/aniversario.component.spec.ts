import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AniversarioComponent } from './aniversario.component';

describe('AniversarioComponent', () => {
  let component: AniversarioComponent;
  let fixture: ComponentFixture<AniversarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AniversarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AniversarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
