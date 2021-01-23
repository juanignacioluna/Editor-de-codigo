<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// use App\Cardgame;

class CardgameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return session('user');
        

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        session(['user' => $request->user]);

        return "ok";


        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $select01 = Cardgame::where('playerName', $id)->get();


        $saludPlayer = $select01[0]['playerHP'];

        $shieldPlayer = $select01[0]['playerShield'];

        $saludEnemy = $select01[0]['enemyHP'];

        $shieldEnemy = $select01[0]['enemyShield'];

        switch ($request->cardSelectNAME) {
            case "salud":

                

                if(($saludPlayer + $request->cardSelectNUMBER) >= 100){
                    $saludPlayer = 100;
                }else{
                    $saludPlayer = ($saludPlayer + $request->cardSelectNUMBER);
                }


                break;
            case "ataque":


                $diferencia = ($shieldEnemy - $request->cardSelectNUMBER);


                if($diferencia > 0){

                    $shieldEnemy = $diferencia;

                    $saludEnemy = $saludEnemy;

                }else if($diferencia==0){

                    $shieldEnemy = $diferencia;

                    $saludEnemy = $saludEnemy;

                }else if($diferencia < 0){

                        $shieldEnemy = 0;

                        $saludEnemy = ($saludEnemy + $diferencia);

                }


            break;
            case "shield":

                if(($shieldPlayer + $request->cardSelectNUMBER) >= 30){
                    $shieldPlayer = 30;
                }else{
                    $shieldPlayer = ($shieldPlayer + $request->cardSelectNUMBER);
                }


            break;
        }




        $valueEnemy = rand(1,30);


        switch(rand(1,3)){

            case 1: //salud

                

                if(($saludEnemy + $valueEnemy) >= 100){
                    $saludEnemy = 100;
                }else{
                    $saludEnemy = ($saludEnemy + $valueEnemy);
                }


            break;

            case 2: //ataque



                $diferencia = ($shieldPlayer - $valueEnemy);


                if($diferencia > 0){

                    $shieldPlayer = $diferencia;

                    $saludPlayer = $saludPlayer;

                }else if($diferencia==0){

                    $shieldPlayer = $diferencia;

                    $saludPlayer = $saludPlayer;

                }else if($diferencia < 0){

                        $shieldPlayer = 0;

                        $saludPlayer = ($saludPlayer + $diferencia);

                }


            break;

            case 3: //shield

                if(($shieldEnemy + $valueEnemy) >= 30){
                    $shieldEnemy = 30;
                }else{
                    $shieldEnemy = ($shieldEnemy + $valueEnemy);
                }


            break;

        }








        Cardgame::where('playerName', $id)->update(array(   
                                                            'turns' => ($select01[0]['turns'] + 1),
                                                            'cardSalud' => rand(1, 30),
                                                            'cardAtaque' => rand(1, 30),
                                                            'cardShield' => rand(1, 30),
                                                            'playerHP' => $saludPlayer,
                                                            'playerShield' => $shieldPlayer,
                                                            'enemyHP' => $saludEnemy,
                                                            'enemyShield' => $shieldEnemy,

                                                        ));

        $select02 = Cardgame::where('playerName', $id)->get();



        if($select02[0]['turns'] > 20){


            $select02[0]['game']="GAME OVER: TE HAS QUEDADO SIN TURNOS";


            Cardgame::where('playerName', $id)->update(array(   
                'turns' =>  1,
                'cardSalud' => rand(1, 30),
                'cardAtaque' => rand(1, 30),
                'cardShield' => rand(1, 30),
                'playerHP' => 100,
                'playerShield' => 0,
                'enemyHP' => 100,
                'enemyShield' => 0,

            ));


        }


        if($select02[0]['playerHP'] <= 0){

            $select02[0]['game']="GAME OVER: TU ENEMIGO TE HA ELIMINADO";

            Cardgame::where('playerName', $id)->update(array(   
                'turns' =>  1,
                'cardSalud' => rand(1, 30),
                'cardAtaque' => rand(1, 30),
                'cardShield' => rand(1, 30),
                'playerHP' => 100,
                'playerShield' => 0,
                'enemyHP' => 100,
                'enemyShield' => 0,

            ));

        }

        if($select02[0]['enemyHP'] <= 0){

            $select02[0]['game']="FELICITACIONES: HAS GANADO!!!";

            Cardgame::where('playerName', $id)->update(array(   
                'turns' =>  1,
                'cardSalud' => rand(1, 30),
                'cardAtaque' => rand(1, 30),
                'cardShield' => rand(1, 30),
                'playerHP' => 100,
                'playerShield' => 0,
                'enemyHP' => 100,
                'enemyShield' => 0,

            ));

        }




        return $select02;
        
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
