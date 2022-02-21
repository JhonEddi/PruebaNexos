import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CargoService } from 'src/app/services/cargo/cargo.service';
import { MercanciaService } from 'src/app/services/mercancia/mercancia.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  mercanciaForm: FormGroup;
  eliminarForm: FormGroup;
  fCreacion: Date = new Date();
  usuarios: any;
  mercancias: any;


  constructor(
    public fb: FormBuilder,
    public cargoService: CargoService,
    public mercanciaService: MercanciaService,
    public usuarioService: UsuarioService
  ) {

  }
  ngOnInit(): void {
    this.mercanciaForm = this.fb.group({
      idMercancia: ['', Validators.required],
      cantidad: ['', Validators.required],
      fCreacion: ['', Validators.required],
    });;

    this.eliminarForm = this.fb.group({
      // idMercancia: ['', Validators.required],
      usuario: ['', Validators.required],
    })

    this.usuarioService.getAllUsuarios().subscribe(resp => {
      this.usuarios = resp;
    },
      error => { console.error(error) }
    );

    this.mercanciaService.getAllMercancias().subscribe(resp => {
      this.mercancias = resp;
    },
      error => { console.error(error) }
    );
    this.mercanciaService.getAllMercancias().subscribe(resp => {
      this.mercancias = resp;
    },
      error => { console.error(error) }
    );
    
    this.eliminarForm.get('usuario').valueChanges.subscribe(value => {
      this.mercanciaService.getAllMercanciasByUsuario(value.idUsuario).subscribe(resp => {
        this.mercancias = resp;
      })
    })
  }

  guardar(): void {
    this.mercanciaService.save(this.mercanciaForm.value).subscribe(resp => {
      this.mercanciaForm.reset();
      this.mercancias.push(resp);
    },
      error => { console.error(error) }
    )
  }

}
