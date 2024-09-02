# Quick Find

A simple web application which allows users to search for information on our website.

## Assumptions

- APIs adhere to Single Responsibility Principle (SRP); Each endpoint only deals with one specific service (e.g. providing search suggestions / fetching documents)
- APIs will be dynamic in the real world, providing responses based on search parameters.
- The backend will determine which portions of texts are highlighted when returning the list of documents.
- Pagination will be done by backend, client will send an offset value to retrieve the relevant page.
- Each authenticated user will have a unique session token to authenticate with the APIs (ideally with CORS protection), preventing malicious actors from accessing the APIs even though the endpoint link is exposed on the client.

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
