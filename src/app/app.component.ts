import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig  } from '@angular/material/dialog';
import { ImmunizationAlertComponent } from './components/immunization-alert/immunization-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public matDialog: MatDialog) { }

  title = 'koru-assignment';

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "95vh";
    dialogConfig.width = "100%";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ImmunizationAlertComponent, dialogConfig);
  }
}
