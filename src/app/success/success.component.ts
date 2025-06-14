import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule,NgIf],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string ,waring:string}) {}

  get message(): string {
    return this.data?.message || 'Operation completed.';
  }
  get waring():string{
    return this.data?.waring || 'error';
  }
}
