import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAppComponent } from './page-app.component';

describe('PageAppComponent', () => {
  let component: PageAppComponent;
  let fixture: ComponentFixture<PageAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
