import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNFoundComponent } from './page-n-found.component';

describe('PageNFoundComponent', () => {
  let component: PageNFoundComponent;
  let fixture: ComponentFixture<PageNFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
