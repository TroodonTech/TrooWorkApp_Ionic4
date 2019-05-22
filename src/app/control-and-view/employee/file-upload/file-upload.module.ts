import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadPage } from './file-upload.page';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Pipe } from '@angular/core';
import { Directive } from '@angular/core';
const routes: Routes = [
  {
    path: '',
    component: FileUploadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FileUploadPage],
  providers: [
    Pipe,Directive
  ]
})
export class FileUploadPageModule {}
