Feature: Publish Project Workflow
  As a registered user
  I want to create and publish a project
  So that I can share my project with other users and receive talent inquiries

  Background:
    Given the Auth and User Services are reachable
    And featured image fixture is available for project publishing

  Scenario Outline: Sign in with valid email and password and Complete publish project workflow to submission
    Given I am on the sign-in page
    When I enter email as "<email>"
    And I enter password as "<password>"
    And I click the sign-in button
    Then I should see either success or error message for "<scenario>"
  
    When I navigate to the "Publish Project" page
    Then I should see the "Project Info" heading
    
    # Step 1: Project Info
    When I fill the project title as "Playwright test project title"
    And I select project categories:
      | Web Development |
      | UI/UX Design    |
      | Data Science    |
    And I add project sub-categories:
      | Frontend         |
      | Wireframing      |
      | Machine Learning |
    And I fill the project short description
    And I fill the project full description
    And I add project tags:
      | industries | Technology |
      | tags       | automation |
      | skills     | Playwright |
    When I click the "Next" button on publish form
    Then I should see the "Media" heading
    
    # Step 2: Media Upload
    When I upload the featured image file
    And I click the "Next" button on publish form
    Then I should see the "Project Scope" heading
    
    # Step 3: Project Scope
    When I click Edit Phase Name
    And I enter phase name as "Discovery"
    And I click Done in the phase dialog
    And I click Add task for the phase created .
    And I add a project task with name "Requirements Gathering" 
    And I select role as "Data Scientist" for the task
    And I select location as "United States" for the task
    And I select experience level as "Senior" for the task
    And I select duration as "5" "days" for the task
    And I click the "Done" button on publish form
    When I click the "Submit Project" button on publish form
    Then I should see the success message "Your Project Has Been Submitted for a Review!"
    And I should see the message "review your project over the next few days"

  Examples:
      | scenario            | email                 | password |
      | Valid credentials   | rekaclient2@test.com  | Reka@26  |