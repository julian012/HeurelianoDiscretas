# Hamiltonian Path Server

## Objective
This program will start a server that receives a graph in the form of a JSON object and does the following:
1. Validates that the request body is a graph. (The request body must be a JSON, and every value must be a key (or array of keys) in the same JSON).
2. Determines if the graph has a Hamiltonian Path, and returns a response containing either the path, or False if it does not exist. (A graph contains a Hamiltonian Path if one can start from any vertex, and traverse through each vertex exactly once before returning to the original vertex)

e.g `{A:C, B:[C,D], C:[B:D], D:A}` contains the Hamiltonian `[A,C,B,D,A]`

## Requirements
- Node.js, >= version 6.9.2

## Intstallation
`node install`

## Starting the program
`npm index.js`

## Running the tests
`npm test`

## Current State
As indicated by the tests, there is one known flaw in the program execution. A Hamiltonian Path should only contain each vertex once. This requirement is not being honored.