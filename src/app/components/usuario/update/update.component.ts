import { Router,  ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './../usuario.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  usuario:Usuario={
    nome:'',
    cpf:'',
    email:'',
    telefone:'',
    funcao:'',
    perfil:'',
    situacao:''
}
  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(id)
    if (id!=null) this.usuarioService.readById(id).subscribe(usuario => {
      this.usuario = usuario
    });
  }
  updateUsuario(): void {
    this.usuarioService.update(this.usuario).subscribe(() =>{
      this.usuarioService.showMessage('Alteração realizada com sucesso!')
      this.router.navigate(['/usuarios']);
    })
  }
  cancel(): void{
    this.router.navigate(['/usuarios'])
  }

}
