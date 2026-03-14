Feature: Sign-In Data-Driven Validation Tests
  As a user
  I want to sign in with various email and password combinations
  So that I can verify validation behavior for different inputs

  Background:
    Given the Auth and User Services are reachable
    And I am on the sign-in page

  Scenario: Sign in with valid email and password
    When I enter email as "user@test.com"
    And I enter password as "Password123@"
    And I click the sign-in button
    Then I should be redirected to the dashboard

  Scenario Outline: Sign in - <scenario>
    When I enter email as "<email>"
    And I enter password as "<password>"
    And I click the sign-in button
    Then I should see an error message for "<expected>"

    Examples:
      | scenario                        | email                  | password                         | expected                             |
      | Incorrect password              | reka15@gmail.com       | WrongPassword123                 | Invalid credentials                  |
      | Both email and password wrong   | wrong@example.com      | WrongPass@123                    | Invalid credentials                  |
      | Incorrect email domain          | reka15@wrongdomain.com | Reka@15NV                        | Please enter a valid email           |
      | Email without @ symbol          | reka15gmail.com        | Reka@15NV                        | Please enter a valid email           |
      | Email with invalid format       | reka15@.com            | Reka@15NV                        | Please enter a valid email           |
      | Password without special char   | reka15@gmail.com       | Reka15NV                         | Please enter a valid password        |
      | Password less than 8 chars      | reka15@gmail.com       | Reka@1                           | Please enter a valid password        |
      | Password more than 30 chars     | reka15@gmail.com       | Reka@15NVReka@15NVReka@15NVExtra | Please enter a valid password        |
      | Empty email                     | EMPTY                  | Reka@15NV                        | Please enter at least 1 character(s) |
      | Empty password                  | reka15@gmail.com       | EMPTY                            | Please enter at least 1 character(s) |
      | Only numbers password           | reka15@gmail.com       | 12345678                         | Invalid credentials                  |
