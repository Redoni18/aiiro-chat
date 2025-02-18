# AI Chat Application

This is a full-stack chat application built with FastAPI, NestJS, and Next.js. The application allows users to interact with an AI model through a simple web interface.

## Project Structure

- `fastapi-service/` - Backend AI service built with FastAPI
- `nestjs-service/` - API Gateway service built with NestJS
- `frontend-dashboard/` - Web interface built with Next.js

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- Python 3.10+ (for local development)
- OpenAI API key

## Quick Start with Docker

1. Clone the repository
2. Create a `.env` file in the `fastapi-service` directory:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```
3. Run the application:
   ```bash
   docker-compose up
   ```
4. Access the application:
   - Frontend: http://localhost:3000
   - NestJS API: http://localhost:4000
   - FastAPI Service: http://localhost:6000


## API Documentation

### NestJS Gateway API

- `POST /ask`
  - Request body: `{ "question": string }`
  - Response: `{ "response": string }`

### FastAPI Service

- `POST /generate`
  - Request body: `{ "prompt": string }`
  - Response: `{ "response": string }`

## Environment Variables

### FastAPI Service
- `OPENAI_API_KEY` - Your OpenAI API key

## Troubleshooting

1. **OpenAI API Error**
   - Verify your API key is correctly set in the `.env` file
   - Check if you have sufficient API credits

2. **Service Connection Issues**
   - Ensure all services are running
   - Check if the ports (3000, 4000, 6000) are available
   - Verify Docker network connectivity

3. **Docker Build Failures**
   - Clear Docker cache: `docker system prune`
   - Rebuild containers: `docker-compose up --build`
