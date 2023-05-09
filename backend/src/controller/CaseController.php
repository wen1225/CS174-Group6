<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CaseController
{
    private $cases;
    private $filePath = __DIR__ . '/../data/cases.json';

    public function __construct()
    {
        $this->loadCases();
    }

    private function loadCases(): void
    {
        if (file_exists($this->filePath)) {
            $this->cases = json_decode(file_get_contents($this->filePath), true);
        } else {
            $this->cases = [];
        }
    }

    private function saveCases(): void
    {
        file_put_contents($this->filePath, json_encode($this->cases));
    }

    public function createCase(Request $request, Response $response): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);

        // Data validation
        if (
            !isset($data['title']) || !is_string($data['title'])
            || !isset($data['startDate']) || !is_string($data['startDate'])
            || !isset($data['isCaseClosed']) || !is_bool($data['isCaseClosed'])
            || !isset($data['associatedMemberId']) || !is_string($data['associatedMemberId'])
            || !isset($data['Description']) || !is_string($data['Description'])
        ) {
            $response->getBody()->write('Invalid data. title, startDate, isCaseClosed, associatedMemberId, and Description fields should be of the correct data type.');
            return $response->withStatus(400)->withHeader('Content-Type', 'text/plain');
        }

        $caseId = uniqid();
        $this->cases[$caseId] = $data;

        $this->saveCases();

        $response->getBody()->write($caseId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getCases(Request $request, Response $response): Response
    {
        $response->getBody()->write(json_encode($this->cases));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getCase(Request $request, Response $response, array $args): Response
    {
        $caseId = $args['case-id'];
        if (!isset($this->cases[$caseId])) {
            return $response->withStatus(404);
        }

        $response->getBody()->write(json_encode($this->cases[$caseId]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateCase(Request $request, Response $response, array $args): Response
    {
        $caseId = $args['case-id'];
        if (!isset($this->cases[$caseId])) {
            return $response->withStatus(404);
        }
        $data = json_decode($request->getBody()->getContents(), true);


        // Data validation
        if (
            !isset($data['title']) || !is_string($data['title'])
            || !isset($data['startDate']) || !is_string($data['startDate'])
            || !isset($data['isCaseClosed']) || !is_bool($data['isCaseClosed'])
            || !isset($data['associatedMemberId']) || !is_string($data['associatedMemberId'])
            || !isset($data['Description']) || !is_string($data['Description'])
        ) {
            $response->getBody()->write('Invalid data. title, startDate, isCaseClosed, associatedMemberId, and Description fields should be of the correct data type.');
            return $response->withStatus(400)->withHeader('Content-Type', 'text/plain');
        }

        $this->cases[$caseId] = $data;

        $this->saveCases();

        $response->getBody()->write('Successfully updated');
        return $response->withHeader('Content-Type', 'text/plain');
    }

    public function deleteCase(Request $request, Response $response, array $args): Response
    {
        $caseId = $args['case-id'];
        if (!isset($this->cases[$caseId])) {
            return $response->withStatus(404);
        }

        unset($this->cases[$caseId]);

        $this->saveCases();

        $response->getBody()->write('Successfully removed');
        return $response->withHeader('Content-Type', 'text/plain');
    }
}
