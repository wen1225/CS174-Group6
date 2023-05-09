<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AuthController {
    private $staffCredentials;

    public function __construct() {
        $this->staffCredentials = [
            'username' => 'admin',
            'password' => 'admin123'
        ];
    }

    public function login(Request $request, Response $response): Response {
        $data = json_decode($request->getBody()->getContents(), true);

        if ($data['username'] === $this->staffCredentials['username'] &&
            $data['password'] === $this->staffCredentials['password']) {
            $response->getBody()->write('Login successful');
            return $response->withHeader('Content-Type', 'text/plain')->withStatus(200);
        } else {
            $response->getBody()->write('Login failed');
            return $response->withHeader('Content-Type', 'text/plain')->withStatus(401);
        }
    }
}
