 Webhook Order Processing System

  A scalable backend system that acts as a middleware between three services:

   . Kitchen Service
   . Accounting Service
   . Delivery Service

The system is designed using Clean Architecture and asynchronous processing with queues.

 Architecture

The project follows Clean Architecture with 4 layers:

- Presentation Layer   → Controllers / Routes / middlewares
- Application Layer    → Use cases / business logic orchestration
- Domain Layer         → Core entities & rules /repositories 
- Infrastructure Layer → DB, Queue, workers ,External services(services and security)

⚙️ Tech Stack
 -Node.js
 -Express.js
 -PostgreSQL
 -Redis
 -BullMQ (Queue system)
 -Docker & Docker Compose
 -JWT Authentication
 -HMAC Signature Validation
 System Design Overview
  Order Flow:
  1. Client sends Create Order
  2. Server:
    .Validates JWT
    .Verifies HMAC signature
    .Pushes order to Queue
    .Returns response immediately ✅
  3. Worker processes:
   .Stores order in DB
   .Sends to:
     .Kitchen Queue
     .Accounting Queue
     .Delivery Queue

  Security
  1. Authentication
    . JWT-based login system
  2. Authorization
    .ADMIN:
     .getAllOrders
     .delete order
    .USER:
     .create order
     .getById
     .update order


✅ Signature Validation (HMAC)

Each request to create order must include:

x-signature: <generated_signature>


 API Documentation
  1. Auth Endpoints
     .Register
      .POST /auth/register

      .Body:
        {
         "email": "basheerdaoud@test.com",
         "password": "123456",
         "role": "admin"
        }


    .Login
       .POST /auth/login

       .Body:
       {
        "email": "basheerdaoud@test.com",
        "password": "123456"
       }
       .Response:
        -JWT Token

  2. Order Endpoints
      .Create Order
        .POST /webhook/order

        .Body:
           {
             "total": 1020,
             "address": "Amman"
           }

    . Get Order By ID
       .GET /webhook/order/get/:id
        .Requires login (Admin or User)

    . Get All Orders
      .GET /webhook/order/getAllOrders
       . Admin only

    . Update Order
      .PUT /webhook/order/update/:id
       .Requires login
         . شرط:

           Only allowed if status = pending
          ❌ Delete Order

    .DELETE /webhook/order/delete/:id

     . Admin only
     . Only if status = pending


 Signature Generation (Postman)

In Pre-request Script:

const secret = "my_super_secret";

const body = JSON.parse(pm.request.body.raw);
const payload = JSON.stringify(body);

const signature = CryptoJS.HmacSHA256(payload, secret).toString();

pm.request.headers.upsert({
    key: "x-signature",
    value: signature
});

🐳 Docker Setup
📦 Docker Images
     . basheerdaoud/webhook-backend
     . basheerdaoud/webhook-worker-order
     . basheerdaoud/webhook_worker_accounting
     . basheerdaoud/webhook-worker-kitchen
     . basheerdaoud/webhook-worker-delivery

Also required:

  . redis:7
  .postgres:15

▶️ Run Project
   .docker-compose up --build

🌐 Services
  Service	Port
   . Backend API	3000
   . PostgreSQL	5432
   . Redis	6379

🧵 Queue System

   Queues used:

    .Order Queue
    .Kitchen Queue
    .Accounting Queue
    .Delivery Queue
   Workers:
    .Order Worker → saves to DB
    .Kitchen Worker → processes kitchen logic
    .Accounting Worker → billing logic
    .Delivery Worker → delivery processing


 Design Decisions
    Why use a Queue?
      . Reduces load on the main server
      . Improves performance by making the system non-blocking
      . Instead of forcing the client to wait for the order to be    stored  in the database:
        .The order is pushed to a queue
        .A response is sent immediately to the client ✅
        .Processing happens asynchronously in the background

    Why Clean Architecture?
      . Separation of concerns
      . Easier to maintain and extend
      . Improves testability

    Why HMAC Signature?
      . Protects against:
         .Request tampering
         .Unauthorized or fake requests


   Why Separate Workers?
      . Each service is independent (Kitchen, Accounting, Delivery)
      . Allows scaling each service separately
      . Improves system reliability and fault isolation

 Notes :
    . Orders can only be updated or deleted if their status is pending
    . All protected routes require authentication
    . Admin-only endpoints require role = admin


 Author
   Basheer Daoud