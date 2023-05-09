<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__  . '/../src/middleware/CorsMiddleware.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Laminas\Diactoros\ResponseFactory;
use Laminas\Diactoros\ServerRequestFactory;
use Laminas\Diactoros\StreamFactory;
use Laminas\Diactoros\UploadedFileFactory;
use Laminas\Diactoros\UriFactory;

$responseFactory = new ResponseFactory();

// Set the ResponseFactory implementation
AppFactory::setResponseFactory($responseFactory);

$app = AppFactory::create();

$serverRequestCreator = new ServerRequestFactory();
$uriFactory = new UriFactory();
$uploadedFileFactory = new UploadedFileFactory();
$streamFactory = new StreamFactory();
$serverRequest = $serverRequestCreator->createServerRequest($_SERVER['REQUEST_METHOD'], $uriFactory->createUri($_SERVER['REQUEST_URI']));

$app->add(new CorsMiddleware());

// Import controller classes
require __DIR__ . '/../src/controller/MembershipController.php';
require __DIR__ . '/../src/controller/CaseController.php';
require __DIR__ . '/../src/controller/AuthController.php';

// Instantiate controllers
$membershipController = new MembershipController();
$caseController = new CaseController();
$authController = new AuthController();

// Membership routes
$app->post('/membership', [$membershipController, 'createMember']);
$app->get('/membership', [$membershipController, 'getMembers']);
$app->get('/membership/{member-id}', [$membershipController, 'getMember']);
$app->put('/membership/{member-id}', [$membershipController, 'updateMember']);
$app->delete('/membership/{member-id}', [$membershipController, 'deleteMember']);

// Case routes
$app->post('/case', [$caseController, 'createCase']);
$app->get('/case', [$caseController, 'getCases']);
$app->get('/case/{case-id}', [$caseController, 'getCase']);
$app->put('/case/{case-id}', [$caseController, 'updateCase']);
$app->delete('/case/{case-id}', [$caseController, 'deleteCase']);

// Authentication route
$app->post('/auth/login', [$authController, 'login']);

$app->options('/{routes:.+}', function (Request $request, Response $response) {
    // Do nothing, let the CORS middleware handle the preflight request
    return $response;
});


$app->run();
