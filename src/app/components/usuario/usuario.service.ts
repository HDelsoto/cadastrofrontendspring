import { Usuario } from './usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar }from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl= "http://localhost:8081/usuarios"
  constructor(private snackBar: MatSnackBar, private http:HttpClient) { }

  showMessage(msg: string, isError: boolean=false): void{
    this.snackBar.open(msg, '',{
      duration:3000,
      horizontalPosition:"right",
      verticalPosition:"top",
      panelClass: isError?['msg-error'] : ['msg-success']
    })
  }

  create(usuario: Usuario): Observable<Usuario>{
      return this.http.post<Usuario>(this.baseUrl, usuario).pipe(
        map((obj) => obj), catchError((e) => this.errorHandler(e))
      )
  }
 
  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro!', true)  
    return EMPTY
  }

  read(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    ) 
  }

  readById(id:string): Observable<Usuario>{
    const url=`${this.baseUrl}/${id}`    
    return  this.http.get<Usuario>(url).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    )
  }

  //Json-Server
  /*readByCpf(cpf:string): Observable<Usuario>{
    const url=`${this.baseUrl}?cpf=${cpf}`    
    console.log ("url = ", url)
    return  this.http.get<Usuario>(url)
    
  }*/
  //Spring Boot------
  readByCpf(cpf:string): Observable<Usuario>{
    const url=`${this.baseUrl}/cpf=${cpf}`    
    return  this.http.get<Usuario>(url)
  }
  //Spring Boot------

  //Json-Server
  /*
  readByFilter(nome:string, perfil:string, situacao:string): Observable<Usuario[]>{
    const url=`${this.baseUrl}?nome_like=${nome}&perfil_like=${perfil}&situacao_like=${situacao}`
    return  this.http.get<Usuario[]>(url).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    )
  }*/

   //Spring Boot------
  readByFilter(nome:string, perfil:string, situacao:string): Observable<Usuario[]>{
    if(nome.length==0 && situacao.length==0 && perfil.length==0) var url=`${this.baseUrl}/xyzabc/xyzabc/xyzabc`
    else if(nome.length==0 && situacao.length==0) var url=`${this.baseUrl}/xyzabc/xyzabc/${perfil}`
    else if(situacao.length==0 && perfil.length==0) var url=`${this.baseUrl}/${nome}/xyzabc/xyzabc`
    else if(nome.length==0 && perfil.length==0) var url=`${this.baseUrl}/xyzabc/${situacao}/xyzabc`
    else if (nome.length==0) var url=`${this.baseUrl}/xyzabc/${situacao}/${perfil}`
    else if (situacao.length==0) var url=`${this.baseUrl}/${nome}/xyzabc/${perfil}`
    else if (perfil.length==0) var url=`${this.baseUrl}/${nome}/${situacao}/xyzabc`
    else var url=`${this.baseUrl}/${nome}/${situacao}/${perfil}`
    return  this.http.get<Usuario[]>(url).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    )
  }
  //-------------------

  update(usuario: Usuario): Observable<Usuario>{
    const url=`${this.baseUrl}/${usuario.id}`
    return this.http.put<Usuario>(url,usuario).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    )
  }

  delete(id:number): Observable<Usuario>{
    const url=`${this.baseUrl}/${id}`;
    return this.http.delete<Usuario>(url).pipe(
      map((obj) => obj), catchError((e) => this.errorHandler(e))
    )
  }

}
