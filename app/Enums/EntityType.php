<?php

namespace App\Enums;

enum EntityType: int
{
    case MOVIES_AND_SERIES = 0;
    case ONLY_MOVIES = 1;
    case ONLY_SERIES = 2;

    public static function labels(): array
    {
        return [
            self::MOVIES_AND_SERIES->value => 'Movies and Series',
            self::ONLY_MOVIES->value => 'Only movies',
            self::ONLY_SERIES->value => 'Only series'
        ];
    }
}
