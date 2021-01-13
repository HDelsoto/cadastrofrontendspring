import { Usuario } from './../usuario.model';
import { UsuarioService } from './../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  usuarios: Usuario[] =[];
  usuario:Usuario={
        nome:'',
        cpf:'',
        email:'',
        telefone:'',
        funcao:'',
        perfil:'',
        situacao:''
  }
  
  constructor(private usuarioService: UsuarioService, private router: Router ) { }

  ngOnInit(): void {
    
  }
  createUsuario(): void{
    var scpf =new String();
    scpf= this.splitCpf(this.usuario.cpf);
    if(this.validaCpf(scpf)){
      this.usuario.cpf = scpf.toString();
      this.usuarioService.readByCpf(this.usuario.cpf).subscribe(usuario => {
         console.log("retorno unique", Object.keys(usuario).length) 
         if(Object.keys(usuario).length===0) {
           this.usuarioService.create(this.usuario).subscribe(()=>{
           this.usuarioService.showMessage('Cadastro efetuado com sucesso!')
           this.router.navigate(['/usuarios'])})      
          }  
         else {
          this.usuarioService.showMessage('Operação não realizada. Usuário já Incluido.', true)
          this.router.navigate(['/usuarios'])
         }  
      })
    }
    else
    {
      this.usuarioService.showMessage('Operação não realizada. CPF digitado inválido.', true)
          this.router.navigate(['/usuarios'])
    }
 }

  uniqueCpf(): void{
      this.usuarioService.readByCpf(this.usuario.cpf).subscribe(usuario => {
         console.log("retorno unique", Object.keys(usuario).length) 
         if(Object.keys(usuario).length===0) console.log("Cpf Unico")
         else console.log("Cpf Duplicado")
      })
    } 

  cancel(): void{ 
    this.router.navigate(['/usuarios'])
  }

  splitCpf(cpf : any): String{
    var splitted = cpf.split("-", 2);
    if (splitted.length>1) var teste = splitted[0].toString().concat(splitted[1].toString());
    else var teste = splitted[0].toString()
    splitted = teste.split(".", 3)
    if(splitted.length>1) teste =  splitted[0].toString().concat(splitted[1].toString(),splitted[2].toString());
    else teste =  splitted[0].toString()
    console.log (teste.toString());
    return teste.toString();
   
  }

  validaCpf(strCPF : String): Boolean{
    var Soma;
    var Resto;
    var i;
    Soma = 0;   
    //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
    if (strCPF == "00000000000")
	  return false;
    for (i=1; i<=9; i++)
	     Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
       Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	     Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) )
	    return false;
	Soma = 0;
    for (i = 1; i <= 10; i++)
       Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
       Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	     Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return false;
    return true;
  }
   

}
