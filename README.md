# Quick Find

A simple web application which allows users to search for information on our website.

## Assumptions

- APIs adhere to Single Responsibility Principle (SRP); Each endpoint only deals with one specific service (e.g. providing search suggestions / fetching documents)
- APIs will be dynamic in the real world, taking in values from query paramaters
- Each authenticated user has a session token to authenticate with the APIs

## Getting Started

Install the required packages:

```
pnpm install
```

Create a `.env` file in the root directory and add the following:

```
NEXT_PUBLIC_SEARCH_DOCUMENTS_ENDPOINT=<task-1-endpoint>
NEXT_PUBLIC_SEARCH_SUGESSTIONS_ENDPOINT=<task-2-endpoint>
```

Run the development server:

```
pnpm dev
```

## Testing

Unit tests were conducted on all important components.

Run the jest development server:

```
pnpm test
```
