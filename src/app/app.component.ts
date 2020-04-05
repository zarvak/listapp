import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

/**
 * @title MailerLite "JavaScript PHP developer" test assignment
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'listapp';
  rows = [1, 2, 3, 4, 5];

  //restore rows if they were saved earlier
  constructor() {
    this.restoreRows();
    console.log("restored");
  }

  restoreRows() {
    var fetchedRows = localStorage.getItem("rows");
    if (fetchedRows) {
      this.rows = JSON.parse(fetchedRows);
    }
  }

  //save rows to local storage
  saveRows() {
    localStorage.setItem("rows", JSON.stringify(this.rows));
  }

  //add row (usually on "Add" button click) and save the new setup
  addRow() {
    this.rows.push(this.rows.length + 1);
    this.saveRows();
  }

  //on drop, shift array and save
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rows, event.previousIndex, event.currentIndex);
    this.saveRows();
  }

  // on "Add" button click
  onClickAddButton() {
    this.addRow();
  }
}
