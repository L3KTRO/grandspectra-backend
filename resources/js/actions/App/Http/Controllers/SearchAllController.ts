import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SearchAllController::search
* @see app/Http/Controllers/SearchAllController.php:11
* @route '/api/meili/all'
*/
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/meili/all',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchAllController::search
* @see app/Http/Controllers/SearchAllController.php:11
* @route '/api/meili/all'
*/
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchAllController::search
* @see app/Http/Controllers/SearchAllController.php:11
* @route '/api/meili/all'
*/
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SearchAllController::search
* @see app/Http/Controllers/SearchAllController.php:11
* @route '/api/meili/all'
*/
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SearchAllController::onlyMedia
* @see app/Http/Controllers/SearchAllController.php:51
* @route '/api/meili/media'
*/
export const onlyMedia = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: onlyMedia.url(options),
    method: 'get',
})

onlyMedia.definition = {
    methods: ["get","head"],
    url: '/api/meili/media',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SearchAllController::onlyMedia
* @see app/Http/Controllers/SearchAllController.php:51
* @route '/api/meili/media'
*/
onlyMedia.url = (options?: RouteQueryOptions) => {
    return onlyMedia.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SearchAllController::onlyMedia
* @see app/Http/Controllers/SearchAllController.php:51
* @route '/api/meili/media'
*/
onlyMedia.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: onlyMedia.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SearchAllController::onlyMedia
* @see app/Http/Controllers/SearchAllController.php:51
* @route '/api/meili/media'
*/
onlyMedia.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: onlyMedia.url(options),
    method: 'head',
})

const SearchAllController = { search, onlyMedia }

export default SearchAllController