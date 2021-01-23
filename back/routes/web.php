<?php
use Illuminate\Http\Request;

use App\User;

use App\Archivo;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('get', function () {

    return session('user');

});


Route::post('registro', function (Request $request) {


    if (User::where('user',$request->user)->count() > 0) {
        return "Ya existe un usuario con ese nombre";
     }else{

        $user = new User;
        
        $user->user = $request->user;
    
        $user->password = $request->password;
        
        $user->save();
    
        return "Usuario registrado correctamente";

     }

});

Route::get('cerrarSesion', function () {

    session()->forget('user');

    session()->flush();


});


Route::post('login', function (Request $request) {

    $matchThese = ['user' => $request->user, 'password' => $request->password];


    if (User::where($matchThese)->count() > 0) {

        session(['user' => $request->user]);

        return "Bienvenido " . session('user');

     }else{
    
        return "Datos incorrectos";

     }

});


Route::post('add', function (Request $request) {

    $archivo = new Archivo;

    $archivo->nombre = $request->nombre;

    $archivo->tipo = $request->tipo;

    $archivo->user = session('user');

    $archivo->save();

    return "Archivo añadido";

});


Route::get('getArchivos', function () {

    return Archivo::where('user', session('user'))->get();

});

Route::post('editar', function (Request $request) {

    Archivo::where('id', $request->id)->update(array('codigo' => $request->codigo));

    return "Actualizado!";

});


Route::post('borrar', function (Request $request) {

    Archivo::where('id', $request->id)->delete();

    return "Eliminado!";

});

