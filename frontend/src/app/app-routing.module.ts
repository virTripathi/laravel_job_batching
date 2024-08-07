import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { ProcessorComponent } from 'src/app/components/pages/processor/processor.component';
import { ProcessedDataComponent } from 'src/app/components/pages/processed-data/processed-data.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'processor',component: ProcessorComponent},
  {path:'processed-data',component: ProcessedDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
