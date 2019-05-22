import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InspectionCompletedPage } from './inspection-completed.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionCompletedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InspectionCompletedPage]
})
export class InspectionCompletedPageModule {}
