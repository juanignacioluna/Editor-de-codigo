import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';
import $ from 'jquery';
import Chart from 'chart.js';
import CodeFlask from 'codeflask';

@Component({
    selector: 'app-archivo',
    templateUrl: './archivo.component.html',
    styleUrls: ['./archivo.component.less']
})
export class ArchivoComponent implements OnInit {

  userSession;

  id;

  user;

  info;

  tipo;



  flask;




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





    this.activatedRoute.params.subscribe( params => {

      this.id = params['id'];

      this.user = params['user'];

    });


    fetch('http://localhost/pruebasLARAVEL/codeGenerator01/back/public/getArchivos', { 
      credentials : 'include', 
      headers: headers
    })
    .then(response2 => response2.json())
    .then((data3) => {

      var i;


      for (i = 0; i < data3.length; i++) {

        if(data3[i]['id']==this.id){

          console.log(data3[i]);

          this.info = data3[i];

        }

      }

    })
    .then((data4) => {

      this.cargarArchivo();

    })

  }


  editar(event){


    let codigo = this.flask.getCode();

    const data = { id: this.id, codigo: codigo };

    fetch('http://localhost/pruebasLARAVEL/codeGenerator01/back/public/editar', {
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
    .then((data) => {alert(data);})

  }


  borrar(event){

    const data = { id: this.id };

    fetch('http://localhost/pruebasLARAVEL/codeGenerator01/back/public/borrar', {
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
    .then((data) => {alert(data); this.router.navigate(['/misArchivos']);})

  }



  cargarArchivo(){


    var tipo;


    switch(this.info['tipo']) {
      case 'CSS':
        tipo = 'css';
        break;
      case 'HTML':
        tipo = 'html';
        break;
      case 'Javascript':
        tipo = 'js';
        break;
    }

    this.tipo = tipo;


    this.flask = new CodeFlask('#code', { 
      language: tipo,
      lineNumbers: true,
    });

    // flask.updateCode('const my_new_code_here = "Blabla"');

    if(this.info['codigo']==null){

      this.flask.updateCode('');

    }else{
      this.flask.updateCode(this.info['codigo']);
    }

    


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

  login(event){
    this.router.navigate(['/login']);
  }

  misArchivos(event){
    this.router.navigate(['/misArchivos']);
  }

  home(event){
    this.router.navigate(['/home']);
  }


}