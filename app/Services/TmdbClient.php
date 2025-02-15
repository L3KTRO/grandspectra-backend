<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class TmdbClient
{
    protected Client $client;
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('tmdb.api_key');
        $baseUri = config('tmdb.base_uri');

        $this->client = new Client([
            'base_uri' => $baseUri,
            'verify' => true, // Asegúrate de contar con un cacert.pem actualizado o ajusta esta opción según tu entorno
        ]);
    }

    /**
     * Realiza una solicitud HTTP al endpoint indicado.
     *
     * @param string $method Método HTTP, por ejemplo, 'GET', 'POST'
     * @param string $uri URI relativa del endpoint (por ejemplo, '/movie/123')
     * @param array $options Opciones adicionales para la solicitud
     * @return array Respuesta decodificada en formato array
     * @throws GuzzleException
     */
    protected function request(string $method, string $uri, array $options = []): array
    {
        // Añade la api_key a los parámetros de consulta
        $options['query']['api_key'] = $this->apiKey;

        $response = $this->client->request($method, $uri, $options);

        return json_decode($response->getBody()->getContents(), true);
    }

    /**
     * Obtiene los detalles de una película por su ID.
     *
     * @param int $id ID de la película
     * @param array $query Opciones adicionales query
     * @return array
     * @throws GuzzleException
     */
    public function getMovie(int $id, array $query = []): array
    {
        return $this->request('GET', "/3/movie/{$id}", [
            'query' => $query,
        ]);
    }

    /**
     * Obtiene una lista de películas populares.
     *
     * @param array $query Opciones adicionales query
     * @return array
     * @throws GuzzleException
     */
    public function getPopularMovies(array $query = []): array
    {
        return $this->request('GET', '/movie/popular', [
            'query' => $query,
        ]);
    }

    public function getCompany(int $id, array $query = []): array
    {
        return $this->request('GET', "/3/company/{$id}", [
            'query' => $query,
        ]);
    }

    public function getPerson(int $id, array $query = []): array
    {
        return $this->request('GET', "/3/person/{$id}", [
            'query' => $query,
        ]);
    }
}
