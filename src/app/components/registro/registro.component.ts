import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {}

  registrar = new FormGroup({
    prinom: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('[A-Z]*'),
    ]),
    otrosnom: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('[A-Z]*'),
    ]),
    priap: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('[A-Z]*'),
    ]),
    segap: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('[A-Z]*'),
    ]),
    numid: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9]*'),
    ]),
    pais: new FormControl('', Validators.required),
    tipoid: new FormControl('', Validators.required),
    fechain: new FormControl('', Validators.required),
    area: new FormControl('', Validators.required),
    fechareg: new FormControl(new Date()),
    estado: new FormControl(true),
    correo: new FormControl(''),
  });

  ngOnInit(): void {}

  get prinomInvalid() {
    return (
      this.registrar.get('prinom').invalid &&
      this.registrar.get('prinom').touched
    );
  }

  get priapInvalid() {
    return (
      this.registrar.get('priap').invalid && this.registrar.get('priap').touched
    );
  }

  get segapInvalid() {
    return (
      this.registrar.get('segap').invalid && this.registrar.get('segap').touched
    );
  }

  get otrosnomInvalid() {
    return (
      this.registrar.get('otrosnom').invalid &&
      this.registrar.get('otrosnom').touched
    );
  }

  get paisInvalid() {
    return (
      this.registrar.get('pais').invalid && this.registrar.get('pais').touched
    );
  }

  get tipoidInvalid() {
    return (
      this.registrar.get('tipoid').invalid &&
      this.registrar.get('tipoid').touched
    );
  }

  get numidInvalid() {
    return (
      this.registrar.get('numid').invalid && this.registrar.get('numid').touched
    );
  }

  get fechainInvalid() {
    return (
      this.registrar.get('fechain').invalid &&
      this.registrar.get('fechain').touched
    );
  }

  get areaInvalid() {
    return (
      this.registrar.get('area').invalid && this.registrar.get('area').touched
    );
  }

  enviar() {
    if (this.registrar.invalid) {
      return Object.values(this.registrar.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    this.firestore
      .collection('registros')
      .add({
        prinom: this.registrar.value.prinom,
        otrosnom: this.registrar.value.otrosnom,
        priap: this.registrar.value.priap,
        segap: this.registrar.value.segap,
        pais: this.registrar.value.pais,
        tipoid: this.registrar.value.tipoid,
        numid: this.registrar.value.numid,
        fechain: this.registrar.value.fechain,
        area: this.registrar.value.area,
        fechareg: this.registrar.value.fechareg,
        estado: this.registrar.value.estado,
        correo:
          this.registrar.value.prinom +
          '.' +
          this.registrar.value.priap +
          '@abc.com.co',
      })
      .then((resp) => {
        console.log(resp);
        this.registrar.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
