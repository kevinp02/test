import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styles: [],
})
export class RegistrosComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {}
  registros: any[] = [];
  consulta: any;
  mensaje = '';
  id = '';
  editar = false;
  mensaje2 = '';
  cargando = false;
  config: any;
  collection = this.registros.length;

  query = new FormGroup({ texto: new FormControl('') });

  formaEditar = new FormGroup({
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
  });

  ngOnInit(): void {
    this.cargando = true;
    this.firestore
      .collection('registros')
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          this.registros.push(doc.data());
          this.cargando = false;
        });
      });
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection,
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  get prinomInvalid() {
    return (
      this.formaEditar.get('prinom').invalid &&
      this.formaEditar.get('prinom').touched
    );
  }

  get priapInvalid() {
    return (
      this.formaEditar.get('priap').invalid &&
      this.formaEditar.get('priap').touched
    );
  }

  get segapInvalid() {
    return (
      this.formaEditar.get('segap').invalid &&
      this.formaEditar.get('segap').touched
    );
  }

  get otrosnomInvalid() {
    return (
      this.formaEditar.get('otrosnom').invalid &&
      this.formaEditar.get('otrosnom').touched
    );
  }

  get paisInvalid() {
    return (
      this.formaEditar.get('pais').invalid &&
      this.formaEditar.get('pais').touched
    );
  }

  get tipoidInvalid() {
    return (
      this.formaEditar.get('tipoid').invalid &&
      this.formaEditar.get('tipoid').touched
    );
  }

  get numidInvalid() {
    return (
      this.formaEditar.get('numid').invalid &&
      this.formaEditar.get('numid').touched
    );
  }

  get fechainInvalid() {
    return (
      this.formaEditar.get('fechain').invalid &&
      this.formaEditar.get('fechain').touched
    );
  }

  get areaInvalid() {
    return (
      this.formaEditar.get('area').invalid &&
      this.formaEditar.get('area').touched
    );
  }

  buscar() {
    const docRef = this.firestore.collection('registros', (ref) =>
      ref.where('prinom', '==', this.query.value.texto)
    );

    if (!this.query.value.texto) {
      this.mensaje = 'No puede estar vacio';
      this.consulta = null;
    } else {
      this.firestore
        .collection('registros', (ref) =>
          ref.where('prinom', '==', this.query.value.texto)
        )
        .get()
        .subscribe((ss) => {
          if (ss.docs.length === 0) {
            this.mensaje = 'No se encontro nombre, intente de nuevo';
            this.consulta = null;
          } else {
            ss.docs.forEach((doc) => {
              this.mensaje = '';
              this.consulta = doc.data();
              console.log(this.consulta);
            });
          }
        });
      docRef.get().subscribe((ss) => {
        docRef.snapshotChanges().forEach((changes) => {
          changes.map((a) => {
            this.id = a.payload.doc.id;
          });
        });
      });
    }
  }

  /*consultasVarias() {
    const docRef = this.firestore.collection('registros', (ref) =>
      ref.where('prinom', '==', this.query.value.texto)
    );

    return
      docRef.get().subscribe((ss) => {
        docRef.snapshotChanges().forEach((changes) => {
          changes.map((a) => {
            this.id = a.payload.doc.id;
          });
        });
      });
    }
  }*/

  toggleEditar() {
    this.editar = !this.editar;
  }

  editarReg() {
    if (this.formaEditar.invalid) {
      return Object.values(this.formaEditar.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    if (!this.formaEditar.value.prinom) {
      this.mensaje2 = 'No puede estar vacio';
    } else {
      this.firestore.collection('registros').doc(this.id).update({
        prinom: this.formaEditar.value.prinom,
        otrosnom: this.formaEditar.value.otrosnom,
        priap: this.formaEditar.value.priap,
        segap: this.formaEditar.value.segap,
        pais: this.formaEditar.value.pais,
        tipoid: this.formaEditar.value.tipoid,
        numid: this.formaEditar.value.numid,
        fechain: this.formaEditar.value.fechain,
        area: this.formaEditar.value.area,
      });
      this.editar = false;
      this.mensaje2 = '';
      this.consulta = null;
    }
  }

  eliminar() {
    if (confirm('Esta seguro que desea borrar al empleado ?')) {
      this.firestore.collection('registros').doc(this.id).delete();
      this.editar = false;
      this.consulta = null;
    }
  }
}
