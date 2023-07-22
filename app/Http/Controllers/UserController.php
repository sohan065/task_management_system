<?php

namespace App\Http\Controllers;

use Token;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Task;
use App\Models\TaskAssign;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\UserAccessToken;
use Jenssegers\Agent\Facades\Agent;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function userRegistration(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|string|min:3|max:50',
            'email' => 'bail|required|string|email',
            'phone' => 'bail|required|numeric|min:11|unique:users,phone',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response($validator->messages(), 422);
        }
        $validated = $request->only(['name','email','phone','password']);
        
        try{
            User::create([
                'uuid'=>Str::uuid(),
                'name'=> $validated['name'],
                'email'=>$validated['email'],
                'phone'=>$validated['phone'],
                'password' => Hash::make($validated['password']),
            ]);
            return response(['msg'=>'success'],201);
        }catch(Exception $e){
            log::error($e);
            return $e;
        }
        return response(['msg'=>'not acceptable'],406);
    }
    public function userLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'bail|required|numeric|exists:users,phone',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response($validator->messages(), 422);
        }
        $validated = $request->only(['phone','password']);
        $user=User::where('phone', $validated['phone'])->first();

        if($user&&Hash::check( $validated['password'], $user['password']))
        {
                $os = Agent::platform();
                $browser = Agent::browser();
                $ipAddress = request()->ip();
                $user_uuid = $user['uuid'];
                $phone = $user['phone'];

                $tokenData = [
                    'uuid' => $user_uuid,
                    'phone' => $phone,
                    'os' => $os,
                    'browser' => $browser,
                    'ip_address' =>  $ipAddress,
                    'time' => Carbon::now()
                ];
                 $token= Token::create($tokenData);
                if($token)
                {
                    try{
                        UserAccessToken::create([
                            'user_uuid'=>$user['uuid'],
                            'os'=>  $os? $os:null,
                            'browser'=>$browser?$browser:null,
                            'token'=>$token,
                        ]);
                        return response(['token'=>$token],201);
                    }catch(Exception $e){
                        log::error($e);
                    }
                }
        }
        return response(['msg'=>'not acceptable'],406);
    }
    public function userLogout(Request $request)
    {
        
       $token = $request->header('token');
        
       $tokenInfo=Token::decode($token);

       if($tokenInfo)
       {
            UserAccessToken::where('user_uuid', $tokenInfo['uuid'])->delete();
            return response(['message' => 'log out'], 410);
       }

    }
    public function createUserTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'bail|required|string|min:3|max:50',
            'descripton' => 'bail|required|string',
            'deadline' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response($validator->messages(), 422);
        }
        $validated = $request->only(['title','descripton','deadline']);
        
        try{
            Task::create([
                'uuid'=>Str::uuid(),
                'title'=> $validated['title'],
                'descripton'=>$validated['descripton'],
                'deadline'=>$validated['deadline'],
            ]);
            return response(['msg'=>'success'],201);
        }catch(Exception $e){
            log::error($e);
        }
        return response(['msg'=>'not acceptable'],406);
    }
    public function taskAssign(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task_uuid' => 'bail|required|string|exists:tasks,uuid',
            'user_uuid' => 'bail|required|string|exists:users,uuid',
        ]);

        if ($validator->fails()) {
            return response($validator->messages(), 422);
        }
        $token=$request->header('token');

        $validated = $request->only(['task_uuid','user_uuid']);
        
        $tokenData=Token::decode($token);
         
        $loginUserCheck=User::where('uuid',$tokenData['uuid'])->first();
        if($loginUserCheck)
        {
            try{
                TaskAssign::create([
                    'task_uuid'=>$validated['task_uuid'],
                    'user_uuid'=> $validated['user_uuid'],
                ]);
                return response(['msg'=>'success'],201);
            }catch(Exception $e){
                log::error($e);
            }
           
        }
        return response(['msg'=>'user not log in'],406);
        
    }
    public function getAllUserList(Request $request)
    {
        return User::select('uuid as value','name as label')->get();
        
    }
    public function getAllTaskList(Request $request)
    {
        return Task::select('uuid as value','name as label')->get();
        
    }
}
