import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemsgComponent } from './deletemsg.component';

describe('DeletemsgComponent', () => {
  let component: DeletemsgComponent;
  let fixture: ComponentFixture<DeletemsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletemsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletemsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
