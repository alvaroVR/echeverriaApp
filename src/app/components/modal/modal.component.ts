import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {Subject} from "rxjs";
import {ModalService} from "./modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
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

  public onConfirm(values) {
    const respuesta =
      {id: values.id, nombre: values.nombre, checked: true}

    this.modalCtrl.dismiss({
      dismissed: false,
      respuesta
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
