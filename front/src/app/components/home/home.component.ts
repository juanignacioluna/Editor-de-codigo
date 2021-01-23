import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';
import $ from 'jquery';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

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

  misArchivos(event){
    this.router.navigate(['/misArchivos']);
  }

  login(event){
    this.router.navigate(['/login']);
  }


}