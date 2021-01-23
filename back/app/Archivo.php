<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $fillable = [
        'id',
        'user', 
        'nombre', 
        'tipo', 
        'codigo', 
    ];
}