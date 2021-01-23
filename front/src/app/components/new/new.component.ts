import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';
import $ from 'jquery';
import Chart from 'chart.js';


@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.less']
})
export class NewComponent implements OnInit {

  userSession;

  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    $("#close").hide();
    $("#login").hide();

    let headers = new Headers();

    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost/pruebasLARAVEL/codeGenerator01/back/public/');


    fetch('http://localhost/pruebasLARAVEL/codeGenerator01/back/public/get', { 
      
      // headers: headers,
      credentials : 'include', 
      headers: headers
    })
    .then(response => response.text())
    // .then((data) => {alert(data);})
    .then((data) => {this.userSession=data;})
    .then((data2) => {

      if(this.userSession != ""){
        $("#close").show();
      }else{
        $("#login").show();
      }

    })

  }

  cerrarSesion(event){

    let headers = new Headers();

    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Access-Control-Allow-Origin', 'http://localhost/pruebasLARAVEL/codeGenerator01/back/public/');


    fetch('http://localhost/pruebasLARAVEL/codeGenerator01/back/public/cerrarSesion', { 
      
      // headers: headers,
      credentials : 'include', 
      headers: headers
    })
    .then((response) => {
      console.log(response.text());
    })
    .then((data) => {

      fetch('http://localhost/pruebasLARAVEL/codeGenerator01/back/public/get', { 
      
        // headers: headers,
        credentials : 'include', 
        headers: headers
      })
      .then(response => response.text())
      // .then((data) => {alert(data);})
      .then((data) => {this.userSession=data;})
      .then((login) => {
        $("#close").hide();
        $("#login").show();
      })
      
    });

  }


  add(event){


    let llenos = true;

    $('input').each(function() {

      if ($(this).val() == '') {
        llenos = false;
      }

    });

    if(llenos){


      let nombre = $("#nombre").val();

      let tipo = $("select").val();
  
      const data = { nombre: nombre, tipo: tipo };
  
      fetch('http://localhost/pruebasLARAVEL/codeGenerator01/back/public/add', {
          method: 'POST', 
          credentials : 'include', 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost/pruebasLARAVEL/codeGenerator01/back/public/'
  
            
          },
          body: JSON.stringify(data),
      })
      .then(response => response.text())
      .then((data) => {this.router.navigate(['/misArchivos']);})

    }else{
      alert("Ingrese un nombre");
    }



  }


  misArchivos(event){
    this.router.navigate(['/misArchivos']);
  }

  home(event){
    this.router.navigate(['/home']);
  }

  login(event){
    this.router.navigate(['/login']);
  }

}