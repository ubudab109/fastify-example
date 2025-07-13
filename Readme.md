# Fastify Research

Research - Fastify

1. Introduction

Fastify is a lightweight and expressive middleware framework for Node.js, created by the same team behind Express.js. The purpose of this research is to explore the basics of Fastify, including project setup, endpoint creation, middleware implementation, and unit testing.

2. Environment Setup

Steps to set up Fastify in a local development environment:
- Initialize the project using npm
- Install dependencies: fastify, @fastify/router, fastify-bodyparser
- Install development dependencies: TypeScript and related type definitions
- Configure tsconfig.json for TypeScript compilation
- Install and configure Redis for rate limiting
- Setup Prisma ORM for MySQL database access
- Configure Jest and Supertest for testing
- Create `.env`, `.env.test`, and `.env.example` to separate config per environment

## 🗂️ Project Structure

Recommended folder structure for maintainability and scalability:

```plaintext
Recommended folder structure for maintainability and scalability:
fastify-ts-app/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── app.ts
│   └── server.ts
├── tsconfig.json
├── package.json
fastify-ts-app/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   ├── utils/
│   ├── config/
│   ├── app.ts
│   └── server.ts
├── jest.setup.ts
├── tsconfig.json
├── package.json
```

4. Core Concepts

4.1 Creating Endpoints

Endpoints are created using @fastify/router. Controllers are used to handle the business logic for each route.

4.2 Middleware

Middleware functions are used to process requests before and after they reach the route handler. Example use cases include logging, error handling, and authentication.
Additional middleware used includes Redis-based rate limiting (fastify-ratelimit), error handling (custom error middleware), and validation middleware using Zod.

4.3 Unit Testing

Unit testing in Fastify can be performed using Jest in combination with Supertest. Testing helps ensure the functionality of each route and middleware component.
A jest.setup.ts file is used to preload environment config, run database migrations, and tear down Prisma and Redis connections after tests.
CI/CD integration with GitHub Actions ensures tests run automatically on push to main/development branches.

5. Sample Code Snippets

Example of a logging middleware:
```ts
import { FastifyRequest, FastifyReply } from 'fastify';

export const loggerMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  console.log(`[${req.method}] ${req.url}`);
};


```
Example controller for registration and login:
```ts
import { FastifyRequest, FastifyReply } from 'fastify';

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};


```

Example of validation middleware using Zod:
```ts
export const validate = (schema: ZodSchema) => async (ctx: Context, next: Next) => {
  try {
    ctx.request.body = await schema.parseAsync(ctx.request.body);
    await next();
  } catch (err) {
    ctx.throw(400, err);
  }
};
```

6. Notes & Recommendations

- Use TypeScript to improve maintainability and type safety
- Follow a modular folder structure for better scalability
- Implement reusable middleware for logging, error handling, etc.
- Start writing unit tests early during development

7. References

- https://fastifyjs.com/
- https://github.com/fastifyjs/fastify
- https://github.com/fastifyjs/router

8. Use Cases

- Lightweight REST APIs where performance and modularity are important
- Microservices where minimal dependencies and full control over middleware flow are required
- Projects requiring granular control over request/response handling without built-in features like routing or templating
- Educational or experimental projects focused on learning core concepts of middleware and async/await in Node.js
- Highly testable backend systems with layered architecture (Service-Repository pattern)

9. Comparison with Express.js

Similarities:
- Both are web frameworks built on top of Node.js
- Both support middleware architecture
- Both can be used to build APIs and web applications

Differences:
- Fastify is more minimal and does not include routing, templating, or other built-in features (requires manual inclusion)
- Fastify uses async/await natively, which provides better error handling and avoids callback hell
- Express.js has more built-in features and a larger community with more middleware packages readily available

10. Security Practices

- Use helmet middleware (via fastify-helmet) to secure HTTP headers
- Sanitize and validate incoming data to prevent injection attacks
- Enable CORS carefully with fastify-cors
- Use rate limiting and logging to monitor suspicious activities
- Always use HTTPS in production environments
- Use strong secrets for JWT and session keys
- Separate configuration using environment-specific `.env` files (e.g., .env.test)
- Ensure CI/CD does not expose secrets in logs

11. Additional Insights

- KOA's small core allows for high customizability, making it suitable for developers who want more control
- Its lean architecture makes KOA a good fit for modern architectures like serverless or cloud functions
- Because KOA relies on external modules for most functionality, developers must manage dependencies and compatibility more carefully
- CI/CD setup with GitHub Actions automates database migration and test runs using test containers
- Redis usage in testing requires proper connection teardown to prevent open handles

12. Benchmark Results

The benchmark compared Express, Fastify across 3 endpoints: /, /json, and /async.
Fastify consistently outperformed Express in terms of requests per second and latency.

13. Conclusion

Fastify delivers significantly better performance than Express in lightweight scenarios.

Express is more stable with a bigger ecosystem.

14. Fastify – Pros & Cons

✅ Pros:

Native async/await

Lightweight and clean design

More control over request flow

Easier to scale with clear layer separation

❌ Cons:

Smaller ecosystem

More setup required (e.g., routing, sessions)

Learning curve slightly higher

15. Fastify – Pros & Cons

✅ Pros:

- Extremely high performance
- Built-in schema validation and input sanitization
- Built-in logging using pino
- Full TypeScript support
- Modular and encapsulated plugin system

❌ Cons:

- Smaller ecosystem compared to Express
- Plugin encapsulation may be confusing
- Stricter learning curve for advanced features

16. Comparison with Other Frameworks

Compared to Express:

- Fastify is significantly faster under load
- Express has more legacy compatibility and middleware options
- Fastify encourages modular architecture with encapsulation

Compared to Fastify:

- Koa is lighter but requires more manual setup
- Koa provides greater freedom in middleware flow but lacks built-in logging and validation
- Fastify wins in performance and developer experience out-of-the-box

17. Summary & Use Cases

When to use Fastify:

- High-throughput APIs
- Modern architecture using plugins and validation
- TypeScript-heavy codebases
- Realtime applications and edge deployments

When NOT to use Fastify:

- Projects already heavily dependent on Express-specific middleware
- Teams unfamiliar with plugin encapsulation model
- Cases where mature third-party integrations exist only for Express

18. Hidden Gotchas & Edge Cases

- Plugin encapsulation affects route scope and dependency sharing
- Logging is tightly integrated with pino — difficult to switch
- Schema validation is enforced early and strictly, which might confuse beginners
- Hooks lifecycle and custom decorators require learning curve

19. Full Comparison: Fastify vs Koa vs Express

🧾 Summary of What They Do:

- **Fastify**: A fast, low-overhead web framework focused on performance, validation, and modern plugin-based architecture.

- **Koa**: A minimalist and expressive middleware framework that leverages async/await and gives developers full control.

- **Express**: A mature, widely-used framework with a large ecosystem, ideal for building RESTful APIs and web apps quickly.

📊 Comparison with Other Frameworks:

- **Performance**: Fastify > Koa > Express

- **Ease of Use**: Express > Fastify > Koa

- **Plugin Ecosystem**: Express > Fastify > Koa

- **Built-in Features**: Fastify (validation, logging) > Express > Koa (manual setup)

- **Custom Middleware Flexibility**: Koa > Express > Fastify

20. Edge Cases / Gotchas

Fastify:

- Plugin encapsulation may isolate logic unintentionally.

- Schema validation may conflict with custom validation logic.

Koa:

- No built-in routing, error handling, or validation.

- Misconfigured middleware order can break logic flow.

Express:

- Middleware-based error handling may require extra care.

- Callback hell in legacy projects if not modernized with async.

21. When to Use or Avoid

✅ Use Fastify when:

- Performance is top priority.

- You want built-in validation and structured plugin system.

- You're working with microservices or TypeScript.

❌ Avoid Fastify when:

- Your team is unfamiliar with plugin encapsulation.

- You rely on legacy Express middleware.

✅ Use Koa when:

- You want complete flexibility and modern async flow.

- You're building lightweight middleware-centric APIs.

❌ Avoid Koa when:

- You need lots of out-of-the-box features.

- You're new to custom error/middleware stacks.

✅ Use Express when:

- You want rapid development and community support.

- You work on legacy projects or MVPs.

❌ Avoid Express when:

- Performance and modularity are critical long-term goals.

- You prefer TypeScript-first architecture or stricter validation.
