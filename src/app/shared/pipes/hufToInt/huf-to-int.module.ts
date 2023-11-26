import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HufToIntPipe } from './huf-to-int.pipe';

@NgModule({
    declarations: [HufToIntPipe],
    imports: [CommonModule],
    exports: [HufToIntPipe],
    providers: [HufToIntPipe],
})
export class HufToIntModule { }