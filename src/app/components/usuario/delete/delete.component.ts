import { Router,  ActivatedRoute } from '@angular/router';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './../usuario.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  usuario:Usuario={
    id: 0,
    nome:'',
    cpf:'',
    email:'',
    telefone:'',
    funcao:'',
    perfil:'',
    situacao:''
}
  constructor(private usuarioService:UsuarioService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    if(id!=null)this.usuarioService.readById(id).subscribe(usuario =>{
      this.usuario =usuario})
    
  }
  deleteUsuario() :void{
    if(this.usuario.id!=null)this.usuarioService.delete(this.usuario.id).subscribe(()=>{
      this.usuarioService.showMessage('Exclusão efetuada com sucesso.')
      this.router.navigate(['/usuarios'])
    })
  }
  cancel(): void{
    this.router.navigate(['/usuarios'])
  }
}
