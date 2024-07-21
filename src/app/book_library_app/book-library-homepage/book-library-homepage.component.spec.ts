import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLibraryHomepageComponent } from './book-library-homepage.component';

describe('BookLibraryHomepageComponent', () => {
  let component: BookLibraryHomepageComponent;
  let fixture: ComponentFixture<BookLibraryHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookLibraryHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookLibraryHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
