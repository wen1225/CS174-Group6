<?php
require __DIR__ . '/../vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

// Add these lines
use Laminas\Diactoros\ResponseFactory;
use Laminas\Diactoros\ServerRequestFactory;
use Laminas\Diactoros\StreamFactory;
use Laminas\Diactoros\UploadedFileFactory;
use Laminas\Diactoros\UriFactory;

$responseFactory = new ResponseFactory();

// Set the ResponseFactory implementation
AppFactory::setResponseFactory($responseFactory);

$app = AppFactory::create();

// Add routes and middleware

// Create the ServerRequest object manually
$serverRequestCreator = new ServerRequestFactory();
$uriFactory = new UriFactory();
$uploadedFileFactory = new UploadedFileFactory();
$streamFactory = new StreamFactory();
$serverRequest = $serverRequestCreator->createServerRequest($_SERVER['REQUEST_METHOD'], $uriFactory->createUri($_SERVER['REQUEST_URI']));


// Import controller classes
require __DIR__ . '/../src/MembershipController.php';
require __DIR__ . '/../src/CaseController.php';
require __DIR__ . '/../src/AuthController.php';

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

$app->run();
