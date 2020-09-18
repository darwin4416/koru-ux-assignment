import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import records from '../../../assets/data.json';

export interface User {
    id: number,
    name: string;
    description: string;
    webReference: string;
}

@Component({
    selector: 'app-immunization-alert',
    templateUrl: './immunization-alert.component.html',
    styleUrls: ['./immunization-alert.component.css']
})

export class ImmunizationAlertComponent implements AfterViewInit {
    userForm: FormGroup;

    ELEMENT_DATA: User[] = records.data;
    displayedColumns: string[] = ['select', 'name', 'description', 'webReference'];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    selection = new SelectionModel<User>(true, []);

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public dialogRef: MatDialogRef<ImmunizationAlertComponent>,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', [Validators.required]],
            webReference: ['', [Validators.required]]
        });
    }
   
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    closeModal() {
        this.dialogRef.close();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
    
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: User): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    onUserFormSubmit(form) {
        this.userForm.value.id = this.ELEMENT_DATA.length + 1;
        this.ELEMENT_DATA.push(this.userForm.value);
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
    }

    deleteRows() {
        if (this.selection.selected.length > 0) {
            var result = confirm("Delete " + this.selection.selected.length + " rows ?");
            if (result) {
                this.selection.selected.forEach(element => {
                    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
                        if (element.id == this.ELEMENT_DATA[i].id) {
                            this.ELEMENT_DATA.splice(i, 1);
                        }
                    }
                });
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                this.selection.clear();
            }
        } else {
            alert("Nothing to Delete");
        }
    }
}
