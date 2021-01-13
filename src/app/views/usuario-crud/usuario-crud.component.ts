import { HeaderData } from './../../components/template/header/header-data.model';
import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario-crud',
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css']
})
export class UsuarioCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData={
      title:'Cadastro de usuários',
      routeUrl:'/usuarios'
    }
   }

  ngOnInit(): void {
  }
  navigateToUsuarioCreate():void{
    this.router.navigate(['/usuarios/create'])
 }

}
