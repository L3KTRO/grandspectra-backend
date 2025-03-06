<?php

namespace App\Enums;

enum SyncMode: int
{
    case UPSERT = 0;
    case ONLY_NEW = 1;

    public static function labels(): array
    {
        return [
            self::UPSERT->value => 'Upsert',
            self::ONLY_NEW->value => 'Only new'
        ];
    }
}
