<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class MembershipController
{
    private $members;
    private $filePath = __DIR__ . '/../data/members.json';

    public function __construct()
    {
        $this->loadMembers();
    }

    private function loadMembers(): void
    {
        if (file_exists($this->filePath)) {
            $this->members = json_decode(file_get_contents($this->filePath), true);
        } else {
            $this->members = [];
        }
    }

    private function saveMembers(): void
    {
        file_put_contents($this->filePath, json_encode($this->members));
    }



    public function createMember(Request $request, Response $response): Response
    {
        $data = json_decode($request->getBody()->getContents(), true);

        // Data validation
        if (
            !isset($data['firstName']) || !is_string($data['firstName'])
            || !isset($data['lastName']) || !is_string($data['lastName'])
            || !isset($data['gender']) || !is_string($data['gender'])
            || !isset($data['birthday']) || !is_string($data['birthday'])
            || !isset($data['remarks']) || !is_string($data['remarks'])
        ) {
            $response->getBody()->write('Invalid data. firstName, lastName, gender, birthday, and remarks fields should be strings.');
            return $response->withStatus(400)->withHeader('Content-Type', 'text/plain');
        }

        $memberId = uniqid();
        $this->members[$memberId] = $data;

        $this->saveMembers();

        $response->getBody()->write($memberId);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getMembers(Request $request, Response $response): Response
    {
        $response->getBody()->write(json_encode($this->members));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function getMember(Request $request, Response $response, array $args): Response
    {
        $memberId = $args['member-id'];
        if (!isset($this->members[$memberId])) {
            return $response->withStatus(404);
        }

        $response->getBody()->write(json_encode($this->members[$memberId]));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function updateMember(Request $request, Response $response, array $args): Response
    {
        $memberId = $args['member-id'];
        if (!isset($this->members[$memberId])) {
            return $response->withStatus(404);
        }

        $data = json_decode($request->getBody()->getContents(), true);

        // Data validation
        if (
            !isset($data['firstName']) || !is_string($data['firstName'])
            || !isset($data['lastName']) || !is_string($data['lastName'])
            || !isset($data['gender']) || !is_string($data['gender'])
            || !isset($data['birthday']) || !is_string($data['birthday'])
            || !isset($data['remarks']) || !is_string($data['remarks'])
        ) {
            $response->getBody()->write('Invalid data. firstName, lastName, gender, birthday, email, phone and remarks fields should be strings.');
            return $response->withStatus(400)->withHeader('Content-Type', 'text/plain');
        }


        $this->members[$memberId] = $data;

        $this->saveMembers();

        $response->getBody()->write('Successfully updated');
        return $response->withHeader('Content-Type', 'text/plain');
    }

    public function deleteMember(Request $request, Response $response, array $args): Response
    {
        $memberId = $args['member-id'];
        if (!isset($this->members[$memberId])) {
            return $response->withStatus(404);
        }

        unset($this->members[$memberId]);

        $this->saveMembers();

        $response->getBody()->write('Successfully removed');
        return $response->withHeader('Content-Type', 'text/plain');
    }
}
