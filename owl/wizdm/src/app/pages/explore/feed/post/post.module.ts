import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { PostComponent } from './post.component';
import { PostCardModule } from '../post-card/post-card.module';

@NgModule({
  imports: [ 
    CommonModule,
    FlexLayoutModule,
    PostCardModule,

  ],
  declarations: [ PostComponent ],
  exports: [ PostComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class PostModule { }
