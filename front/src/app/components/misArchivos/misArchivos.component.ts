import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'
import { ChangeDetectorRef } from '@angular/core';
import $ from 'jquery';

@Component({
    selector: 'app-misArchivos',
    templateUrl: './misArchivos.component.html',
    styleUrls: ['./misArchivos.component.less']
})
export class MisArchivosComponent implements OnInit {

  userSession;

  constructor(public activatedRoute:ActivatedRoute, public router:Router, private sanitized: DomSanitizer, private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    $(".plus").hide();
    $(".aviso").hide();

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



        fetch('http://localhost/pruebasLARAVEL/codeGenerator01/back/public/getArchivos', { 
          credentials : 'include', 
          headers: headers
        })
        .then(response2 => response2.json())
        .then((data3) => {

          var i;


          for (i = 0; i < data3.length; i++) {


            let img='';

            let attr='';


            switch(data3[i]['tipo']) {
              case 'CSS':
                img = 'assets/css.png';
                attr = 'width="100px" height="125px"';
                break;
              case 'HTML':
                img = 'assets/html.png';
                attr = 'width="125px"';
                break;
              case 'Javascript':
                img = 'assets/js.png';
                attr = 'width="125px"';
                break;
            }
    
    
            $(".cards").append( `
            
            <a href='http://localhost:4200/#/archivo/` + data3[i]['user'] + `/` + data3[i]['id'] + `'><div class="card">

              <p>` + data3[i]['nombre'] + `</p>

              <img src="` + img + `" ` + attr + `>


            </div></a>` 
            
            );

          }

          $(".cards").append( `<style>

            .cards{
              text-align: center;
            }

            .cards a{
              text-decoration: none;
            }

            .card{
              font: bold 1.0em "Verdana", Geneva, sans-serif;
              background: #f2f2f2;
              color: black;
              margin-bottom: 20px;
              margin-right: 20px;
              padding: 10px;
              display: inline-block;
              min-width: 300px;
              max-width: 250px;
              text-align: center;
              border: 1px solid transparent;
              border-color: #323232;
              border-radius: 2.5px;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
              cursor: pointer;
            }


            @media screen and (max-width: 730px){

              .card{

                display: block;
                min-width: inherit;
                max-width: inherit;

              }
      
          
            }
    
          
          </style>` );
          
        })




        $(".plus").show();
        $("#close").show();
      }else{
        $(".aviso").show();
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

  login(event){
    this.router.navigate(['/login']);
  }

  home(event){
    this.router.navigate(['/home']);
  }

  new(event){
    this.router.navigate(['/new']);
  }

  archivo(event){
    this.router.navigate(['/archivo']);
  }


}