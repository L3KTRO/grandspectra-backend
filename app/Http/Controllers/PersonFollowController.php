<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PersonFollowController extends Controller
{
    public function update(Request $request, $person_id): JsonResponse
    {
        $user = $request->user();
        $person = Person::find($person_id);

        if (!$person) {
            return response()->json(["message" => "Person not found"], 404);
        }

        if ($user->personFollow()->where('person_id', $person->id)->exists()) {
            return response()->json(["message" => "You are already following '$person->name'"], 409);
        }

        $user->personFollow()->attach($person->id);

        return response()->json(['message' => "You are now following '$person->name'"]);
    }

    public function delete(Request $request, $person_id): JsonResponse
    {
        $person = Person::where('id', $person_id)->first();
        if (!$person) return response()->json(["message" => "Person not found"], 404);

        $user = $request->user();

        if (!$user->personFollow()->where('person_id', $person->id)->exists()) {
            return response()->json(["message" => "You are not following this '$person->name'"], 409);
        }

        $user->personFollow()->detach($person->id);

        return response()->json(['message' => "You are no longer following '$person->name'"], 204);
    }

}
