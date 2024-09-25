# wompi_test
Full stack developer test for Wompi
Wompi Test Project

Description

This project integrates a payment system allowing users to simulate purchases through a frontend interface, while the backend processes payment requests and connects to the database.

Technologies Used

Backend: NestJS
- Framework: NestJS (Node.js)
    - Modular and scalable architecture.
    - TypeScript is used as the primary programming language.
  
- Key Packages:
    - @nestjs/common: Provides decorators, middleware, and core features of the framework.
    - @nestjs/typeorm: ORM used for interaction with PostgreSQL.
    - class-validator & class-transformer: Libraries for validation and transformation of DTOs and entities.
    - passport & @nestjs/passport: Authentication setup.
    - jest: Testing framework for unit and integration tests.
    - swagger: Automatic API documentation generation.

- Testing:
    - Jest was used for unit and integration tests in the backend. Tests are configured in the test/app.e2e-spec.ts file.

- Validations:
    - Class Validator was used to handle data validations in API requests, such as validating credit card numbers, emails, and more.

Frontend: React
- Framework: React
    - We used Create React App to set up the frontend environment.
  
- Key Packages:
    - axios: For making HTTP requests to the backend.
    - formik & yup: To manage forms and validations in the frontend.
    - react-router-dom: For handling routing between different pages.
    - redux: For state management across the application.

- Frontend Structure:
    - The application is divided into components, with key pages like:
        - PaymentPage: Where users input their payment details.
        - SummaryPage: Displays the order summary and confirmation.
        - StatusPage: Displays the transaction status.
    - Forms are managed with Formik to validate fields like credit card numbers, CVV, name, email, and delivery address.

Database: PostgreSQL
- Database: PostgreSQL
    - Database connection is handled via TypeORM.
    - Migrations and models for tables such as users, products, and transactions were created and managed.

Development Environment Setup

Backend (NestJS)
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Environment Variables: Create a .env file in the backend directory with the following configuration:
   ```bash
   DATABASE_URL=postgresql://username:password@localhost:5432/wompi_test
   ```

3. Run the server in development mode:
   ```bash
   npm run start:dev
   ```

4. API Documentation: Swagger API documentation is available at:
   ```
   http://localhost:3000/api
   ```

5. Testing: Run tests using Jest with:
   ```bash
   npm run test
   ```

Frontend (React)
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Environment Variables: Create a .env file in the frontend directory with the following variable:
   ```bash
   REACT_APP_API_URL=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   npm run start
   ```

4. Build for production:
   ```bash
   npm run build
   ```
Additional Notes

- CORS: CORS is enabled on the backend to allow requests from the frontend (app.enableCors()).
- Migrations: TypeORM migrations are executed automatically when starting the backend.

