import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalListaComponent} from "./modal-lista/modal-lista.component";
import {ModalComponent} from "./modal/modal.component";
import {HeaderComponent} from "./header/header.component";
import {ExpandableComponent} from "./expandable/expandable.component";


@NgModule({
  declarations: [ModalListaComponent, ModalComponent, HeaderComponent, ExpandableComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalListaComponent, ModalComponent, HeaderComponent, ExpandableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {
}
