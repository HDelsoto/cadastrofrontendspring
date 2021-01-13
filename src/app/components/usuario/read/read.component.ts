
import { CPFPipe } from './../../../cpf.pipe';
import { Usuario } from './../usuario.model';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  show:any="true"
  usuarios: Usuario[] =[];
  usuarios2: Usuario[] =[];
  usuario:Usuario={
    nome:'',
    cpf:'',
    email:'',
    telefone:'',
    funcao:'',
    perfil:'',
    situacao:''
}
  displayedColumns = ['email','nome', 'perfil','toggle', 'action']
  constructor(private usuarioService: UsuarioService,private router: Router ) { }

  ngOnInit(): void {
    this.show=true
    this.usuarioService.read().subscribe(usuarios => {
      this.usuarios=usuarios
      console.log(usuarios)
    })
  }

  updateStatus(element: any): void {
      element.situacao=!element.situacao
      if (element.id != null) {
        if(element.situacao)this.usuarioService.update(element).subscribe(() =>{
          this.usuarioService.showMessage('Usuário habilitado com sucesso!')  
        })  
        else this.usuarioService.update(element).subscribe(() =>{
          this.usuarioService.showMessage('Usuário desabilitado com sucesso!')  
        })     
        this.cancel()
      }
    }

  cancel(): void{
    this.router.navigate(['/usuarios'])
  }

  /*showTable(): void{
    this.show=false
    this.usuarios=this.usuarios2
    setTimeout(() => {
      this.show = true // retorna com tabela para o DOM e os dados atualizados do 
                          
    }, 5000);
  }*/

  pesquisar(): void{
    this.usuarioService.readByFilter(this.usuario.nome, this.usuario.perfil, this.usuario.situacao).subscribe(usuarios => {
      this.usuarios=usuarios
      console.log(usuarios)
    })
    console.log("nome", this.usuarios)
    console.log("nomeEnd")
  }

  
  
}
