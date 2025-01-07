# AutomationExercise-Testing

Automated testing suite for [AutomationExercise](http://automationexercise.com) using Playwright.

## Test Cases Implemented

1. **User Registration Test**
2. **Login Test (Valid Credentials)**
3. **Login Test (Invalid Credentials)**
4. **Logout Test**
5. **Register User with Existing Email**
6. **Contact Us Form Test**
7. **Test Cases Page Verification**
8. **Product Details Verification**
9. **Product Search Functionality**

## Setup

To get started with the project, follow these steps:

1. Install the necessary dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

## Running Tests

You can run the tests using the following commands:

1. **Run all tests:**

   ```bash
   npx playwright test
   ```

2. **Run a specific test:**

   ```bash
   npx playwright test tests/test-case1.spec.js
   ```

3. **View test reports:**

   ```bash
   npm run report
   ```

## Features

- Comprehensive end-to-end testing
- Cross-browser testing support
- HTML report generation
- Automatic screenshot capture on failure
- Video recording for failed tests
- Custom port (9323) for viewing reports

## Project Structure

The project follows this structure:

```
AutomationExercise-Testing/
├── tests/
│   ├── test-case1.spec.js
│   ├── test-case2.spec.js
│   ├── test-case3.spec.js
│   └── ...
├── playwright.config.mjs
├── package.json
├── README.md
└── ...
```

## Technologies Used

- **Playwright**: For end-to-end testing
- **Node.js**: Runtime environment
- **JavaScript**: Scripting language

## Report Viewing

To view the test report, run the following command:

```bash
npm run report
```

The report will be available at [http://localhost:9323](http://localhost:9323).

---

Happy Testing! 🚀

