import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-lista',
  templateUrl: './modal-lista.component.html',
  styleUrls: ['./modal-lista.component.scss'],
})
export class ModalListaComponent implements OnInit {
  // Data passed in by componentProps
  @Input() title: string;
  @Input() valores: any;

  public onClose: Subject<any>;

  public searchData: Array<any>;
  isItemAvailable = false;

  constructor(public modalCtrl: ModalController) {

  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm() {
    this.modalCtrl.dismiss({
      dismissed: false,
      respuesta: this.valores.filter(valor => valor.checked)
    });
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.searchData = this.valores;
    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.searchData = this.searchData.filter((item) => (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1));
    } else {
      this.isItemAvailable = false;
    }
  }

}
