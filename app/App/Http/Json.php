<?php

namespace App\App\Http;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

final class ValidationObject
{
    public $passes = false;
    public $errors = [];

    public function __construct(bool $passes, array $errors = [])
    {
        $this->passes = $passes;
        $this->errors = $errors;
    }
}

class Json
{
    public static function validate(array $rules = [], array $messages = [], array $data = null): ValidationObject
    {
        $data = is_null($data) ? request()->all() : $data;
        $validator = Validator::make($data, $rules, $messages);

        if ($validator->fails()) {
            return new ValidationObject(false, $validator->getMessageBag()->all());
        }

        return new ValidationObject(true);
    }

    public static function errors(array $errors = [], $code = 422): JsonResponse
    {
        return response()->json($errors, $code);
    }

    public static function data(array $data = [], $code = 200): JsonResponse
    {
        return response()->json($data, $code);
    }
}
