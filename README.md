# Ticket Sale Microservices Architecture

This project implements a ticket sale application built using microservices architecture with Node.js, TypeScript, and Kubernetes. The application includes multiple services such as authentication, ticket management, orders, payments, expiration, and a client-facing interface. The deployment is managed with **Kubernetes** and **Skaffold** for a smooth local development experience.

## Project Overview

This project consists of several microservices, each representing different functionality in the ticket sale application:

1. **Auth Service** (`patf3lix/auth`): Handles user authentication, including login and registration.
2. **Client Service** (`patf3lix/client`): The frontend of the ticket sale system, where users interact with the app.
3. **Tickets Service** (`patf3lix/tickets`): Manages available tickets and ticket inventory.
4. **Orders Service** (`patf3lix/orders`): Handles order creation and management for ticket purchases.
5. **Expiration Service** (`patf3lix/expiration`): Manages ticket expiration times and enforces expiration logic.
6. **Payments Service** (`patf3lix/payments`): Processes payments for ticket purchases.

## Prerequisites

Before running the application locally, make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Kubernetes](https://kubernetes.io/docs/setup/)
- [Skaffold](https://skaffold.dev/docs/)

Additionally, ensure you have a working Kubernetes cluster (local or cloud-based).

## Getting Started

### Clone the repository

```bash
git clone <repo-url>
cd <repo-directory>
```
## Build and Run the Application with Skaffold

1. Install dependencies for each microservice by navigating into each service directory (auth, client, tickets, etc.) and running:

```bash
npm install
```

2. Run the project using Skaffold in development mode:
   
```bash
skaffold dev
```

This will:

Build Docker images for each service.

Deploy the services to your Kubernetes cluster.

Enable live-reloading of changes in your code.

## Application Services

Auth Service: Accessible via /auth endpoints for user login/registration.

Client Service: Accessible via a web browser at the URL defined in your Kubernetes ingress or port-forwarded address.

Tickets Service: Exposes APIs to manage available tickets and their availability.

Orders Service: Allows users to create, view, and manage their orders.

Expiration Service: Enforces expiration rules for tickets.

Payments Service: Processes payment requests and integrates with external payment providers.

## Kubernetes Setup

This project assumes you have a working Kubernetes cluster. The services are defined as Kubernetes manifests in the ./infra/k8s/ directory. Skaffold uses these manifests to deploy the services to your cluster.

To manually deploy the services:

```bash
kubectl apply -f ./infra/k8s/
```

Dockerfiles

Each service has its own Dockerfile for containerization. Docker will use the relevant Dockerfile to build an image and deploy it within Kubernetes.

## Development Workflow

Code Changes: Any changes you make to the code will automatically sync with the running container (via the sync configuration in skaffold.yaml), so you can see updates in real-time.

Service Updates: Skaffold will automatically rebuild and redeploy the affected services when code is modified.

Testing: Use the appropriate endpoints to test each service independently or interactively via the front-end (client service).

## Project Structure

├── auth/
│   ├── src/
│   └── Dockerfile
├── client/
│   ├── src/
│   └── Dockerfile
├── tickets/
│   ├── src/
│   └── Dockerfile
├── orders/
│   ├── src/
│   └── Dockerfile
├── expiration/
│   ├── src/
│   └── Dockerfile
├── payments/
│   ├── src/
│   └── Dockerfile
├── infra/
│   └── k8s/
│       ├── auth-deployment.yaml
│       ├── client-deployment.yaml
│       ├── tickets-deployment.yaml
│       ├── orders-deployment.yaml
│       ├── expiration-deployment.yaml
│       ├── payments-deployment.yaml
│       └── k8s-service.yaml
└── skaffold.yaml

## Skaffold Configuration

The skaffold.yaml configures how each microservice is built and deployed. It defines:

Dockerfiles for each service.

Sync configuration to enable live-reloading of code changes.

Deployment with kubectl to apply Kubernetes manifests.

## Testing the Microservices

Each microservice exposes different API endpoints to test its functionality. Below are example endpoints:

Auth Service:

POST /auth/signup: Register a new user.

POST /auth/login: Log in an existing user.

Tickets Service:

GET /tickets: Get all available tickets.

POST /tickets: Add a new ticket.

Orders Service:

POST /orders: Create a new order.

GET /orders/{id}: Retrieve order details by ID.

Payments Service:

POST /payments: Process a payment for an order.

For testing, you can use tools like Postman or curl to interact with the endpoints.

## Deployment to Production

For deploying to a production environment, use the appropriate cloud or Kubernetes setup. Ensure that:

A proper production configuration is in place for Kubernetes manifests (e.g., scaling, environment variables, and secret management).

The correct Docker images are built and pushed to a container registry.

You can modify the skaffold.yaml to push Docker images to a remote repository (e.g., Docker Hub, AWS ECR, or Google Container Registry) by setting push: true.

## Troubleshooting
Common issues:

Docker Build Errors: Ensure that all dependencies are correctly installed in each service.

Kubernetes Connectivity: Check your Kubernetes setup (kubectl get pods and kubectl logs <pod-name>) for any errors during deployment.

Skaffold Sync Issues: Make sure that the sync paths are correctly set in skaffold.yaml to ensure live code synchronization.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. Be sure to follow the project's coding standards and write tests for any new features.

## License

This project is for educational purposes only.
