import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

  }));


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should add an element when clicked on Add button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    // Check how many items we have in the list
    const listItemCount = fixture.debugElement.queryAll(By.css('.items > .item')).length;
    const expectedListItemCount = listItemCount + 1;

    // Click on the "Add" button
    const addButton = fixture.debugElement.query(By.css('#add'));
    addButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    // Check how many items we have now
    const newListItemCount = fixture.debugElement.queryAll(By.css('.items > .item')).length;

    expect(newListItemCount).toBe(expectedListItemCount);
  });

  it('should save application state', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    // Save application state
    app.saveRows();

    const fetchedRows = localStorage.getItem("rows");

    expect(fetchedRows).toBeDefined();
    expect(fetchedRows).toEqual(JSON.stringify(app.rows));
  });

  it('should load application state', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Force save application state so that we have something to load from
    app.saveRows();
    // Load application state
    app.restoreRows();
    fixture.detectChanges();

    const savedRows = localStorage.getItem("rows");
    const currentRows = JSON.stringify(app.rows);

    expect(currentRows).toBeDefined();
    expect(currentRows).toEqual(savedRows);
  });


});
