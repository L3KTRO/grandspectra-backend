<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait AppliesSorting
{
    protected function applySorting(
        Request $request,
        Builder $query,
        array $allowedSorts,
        string $defaultSort = 'created_at',
        string $defaultDirection = 'desc',
        int $perPage = 15,
    ): array {
        $sort = $this->normalizeSort($request->input('sort'), $allowedSorts, $defaultSort);
        $direction = $this->normalizeDirection($request->input('direction'), $defaultDirection);

        $results = $query->orderBy($sort, $direction)
            ->paginate($perPage)
            ->withQueryString();

        return [$results, $sort, $direction];
    }

    protected function normalizeSort(?string $sort, array $allowedSorts, string $defaultSort): string
    {
        if ($sort === null) {
            return $defaultSort;
        }

        return in_array($sort, $allowedSorts, true) ? $sort : $defaultSort;
    }

    protected function normalizeDirection(?string $direction, string $defaultDirection): string
    {
        if ($direction === null) {
            return $defaultDirection;
        }

        $direction = strtolower($direction);

        return in_array($direction, ['asc', 'desc'], true) ? $direction : $defaultDirection;
    }
}
