import { NgModule, ModuleWithProviders } from '@angular/core';

// Material
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatMenuModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatDividerModule,
  MatTabsModule,
  MatExpansionModule,
  MatProgressBarModule,
} from '@angular/material';

const materialComponents = [
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatMenuModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatGridListModule,
  MatDividerModule,
  MatTabsModule,
  MatExpansionModule,
  MatProgressBarModule,
];
@NgModule({
  imports: [...materialComponents],
  declarations: [],
  exports: [...materialComponents],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
