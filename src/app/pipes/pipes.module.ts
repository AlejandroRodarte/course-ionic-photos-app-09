import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';



@NgModule({
  declarations: [
    ImageSanitizerPipe
  ],
  exports: [
    ImageSanitizerPipe
  ]
})
export class PipesModule { }
