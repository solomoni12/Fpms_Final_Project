<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\ChangePasswordRequest;

class AuthController extends Controller
{
    use HttpResponses;

    // function to register user
    public function register(StoreUserRequest $request){
       
        $request->validated($request->all());   

        $user = User::create([
            'fname'=>$request->fname,
            'lname'=>$request->lname,
            'sex'=>$request->sex,
            'phone_number'=>$request->phone_number,
            'physical_address'=>$request->physical_address,
            'email'=>$request->email,
            'password'=> Hash::make($request->password),
        ]);


        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API token of' . $user->lname)->plainTextToken
        ]);
    }

     // Function to user login
     public function login(LoginUserRequest $request){

        $request->validated($request->all());  
        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return $this->error('','Credential do not match', 401);
        }

        $user = User::where('email', $request->email)->first();
        
        return $this->success([
            'user'=>$user,
            'token'=>$user->createToken('API token of' . $user->name)->plainTextToken
        ]);
    }

    public function user(){
        $user = User::all();
        return $this->success([
            'user'=>$user
        ]);
    }
    public function updateUser(Request $request, $userId){

        $user = User::findOrFail($userId);

        $user->update($request->all());

        return $this->success([
            'user' => $user,
            'message' => 'User details updated successfully'
        ]);
    }


    

     // Function to find logged user
    public function logged_user(){
        $logged_user = auth()->user();

        return $this->success([
            'user' => $logged_user,
            'message' => 'logged user'
        ]);
    }
    
     // Function to change password of user
    public function change_password(ChangePasswordRequest $request){
        
        $request->validated([
            'password' => 'required|confirmed',
        ]);

        $user = auth()->user();
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'user' => $user,
            'message' => 'Password changed successfully',
        ]);
    }
   
    // user logout function
    public function logout(){
        
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message'=>'You have been successfuly logged out and your token has been deleted'
        ]);
    }
}
