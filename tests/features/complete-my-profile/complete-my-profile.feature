@requiresUser @requiresAuth
Feature: Complete Onboarding Steps
  As a user
  I want to be guided step-by-step to complete all important sections of my profile,
  So that I don’t miss any critical information and increase my chances of getting hired.

  Background:
    Given I am on my profile page

  Scenario: Add a new bio successfully
    Given I click on About Me - Finish This Step
    When I enter a valid bio
    And I save the new bio
    Then The first step is displayed as Done

  Scenario: Add a new skill successfully
    Given I click on Skills - Finish This Step
    When I add the skill "Playwright"
    And I save the new skill
    Then The third step is displayed as Done

  Scenario: Add a new skill successfully
    Given I click on Skills - Finish This Step
    When I add the skill "Max"
    And I save the new skill
    Then The third step is displayed as Done

  Scenario: Add a new work experience successfully
    Given I click on Work Experience - Finish This Step
    When I click on add a work experience
    And I fill in the work experience form
    Then The fourth step is displayed as Done

  Scenario: Add a new education successfully
    Given I click on Education - Finish This Step
    When I click on add education
    And I fill in the education form
    Then The fifth step is displayed as Done

  Scenario: Add a new portfolio successfully
    Given I click on Portfolio - Finish This Step
    When I enter a valid portfolio
    And I save the new portfolio
    Then The second step is displayed as Done

  Scenario: Add a new job title and rate successfully
    Given I click on Job Title & Rate - Finish This Step
    When I click on add job title
    And I fill in the job title form
    Then The sixth step is displayed as Done
