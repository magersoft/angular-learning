import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PostFormComponent } from './post-form/post-form.component';
import { PostComponent } from './post/post.component';
import { StyleDirective } from './directives/style.directive';
import { IfnotDirective } from './directives/ifnot.directive';
import { MultByPipe } from './pipes/mult-by.pipe';
import { ExMarksPipe } from './pipes/ex-marks.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PostFormComponent,
    PostComponent,
    StyleDirective,
    IfnotDirective,
    MultByPipe,
    ExMarksPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
