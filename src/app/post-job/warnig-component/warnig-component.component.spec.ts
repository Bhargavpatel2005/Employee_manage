import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnigComponentComponent } from './warnig-component.component';

describe('WarnigComponentComponent', () => {
  let component: WarnigComponentComponent;
  let fixture: ComponentFixture<WarnigComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarnigComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarnigComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
