# Technical Assessment Web - Copilot Instructions

## Project context

This repository contains the frontend for the Technical Assessment Platform.

The application allows users to browse technical assessments, view assessment details, solve programming questions, execute code, submit answers, and review results.

This is a time-boxed technical Kata. Prioritize a complete, simple and demonstrable MVP over unnecessary complexity.

## Technology stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Monaco Editor
- Vercel

## Responsibilities

The frontend is responsible for:

- Listing assessments.
- Showing assessment details.
- Displaying programming questions.
- Allowing language selection.
- Providing a code editor.
- Running candidate code.
- Showing stdout, compilation errors and runtime errors.
- Submitting answers.
- Showing scoring and final results.

## Architecture

Keep the frontend simple and modular.

Prefer:

- Pages for route-level screens.
- Components for reusable UI.
- Services for API communication.
- Types for shared frontend contracts.
- Feature-oriented organization when it improves clarity.

Do not introduce unnecessary state management libraries or architectural layers for the MVP.

## API communication

The frontend consumes the backend API deployed separately.

Use an environment variable for the API base URL.

Example:

VITE_API_URL=http://localhost:3000

Do not hardcode production URLs inside components.

Keep HTTP communication outside presentational components when possible.

## Code editor

Use Monaco Editor for programming exercises.

Mandatory languages for the MVP:

- Java
- JavaScript / Node.js
- Python

Possible later additions:

- TypeScript
- COBOL

Do not treat optional languages as mandatory.

## Styling

Use Tailwind CSS and shadcn/ui.

Prefer:

- clean layouts;
- reusable components;
- responsive design;
- clear loading, error and empty states;
- visual consistency.

Avoid unnecessary custom CSS when Tailwind utilities are sufficient.

## TypeScript conventions

- Keep TypeScript strict.
- Avoid `any` unless strongly justified.
- Prefer explicit interfaces and types.
- Keep components focused.
- Use clear English identifiers.
- Avoid large components with unrelated responsibilities.

## Security

Never:

- expose backend secrets;
- expose Judge0 credentials;
- expose private test cases;
- hardcode sensitive configuration.

Only variables prefixed with `VITE_` are available to frontend code, so do not place secrets in frontend environment variables.

## Development principles

- Build incrementally.
- Prioritize the end-to-end MVP.
- Avoid premature abstractions.
- Do not install libraries without a clear need.
- Prefer reusable UI only when it reduces duplication.
- Keep the frontend easy to demonstrate and explain.

## Deployment

Frontend deployment target:

GitHub
→ Vercel

Backend:

Render

Database:

MongoDB Atlas

Code execution:

Judge0

## Copilot

Use these instructions as persistent project context.

Do not create a Custom Agent yet.

A Custom Agent may be added later once the application has a functional base.