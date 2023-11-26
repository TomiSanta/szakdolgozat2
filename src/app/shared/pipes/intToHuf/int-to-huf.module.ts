import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntToHufPipe } from './int-to-huf.pipe';

@NgModule({
    declarations: [IntToHufPipe],
    imports: [CommonModule],
    exports: [IntToHufPipe],
    providers: [IntToHufPipe],
})
export class IntToHufModule { }