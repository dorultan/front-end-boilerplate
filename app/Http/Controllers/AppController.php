<?php

namespace App\Http\Controllers;

use App\App\Http\Json;
use Illuminate\Http\JsonResponse;

class AppController extends Controller
{
    public function config(): JsonResponse
    {
        return Json::data([
            'env' => env('APP_ENV'),
        ]);
    }
}
