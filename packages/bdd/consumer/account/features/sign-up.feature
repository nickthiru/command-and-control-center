@ImpactStoryMapId-1.3.1.1.
Feature: Consumer account sign up with username and password

    Rule: User must confirm their email before their account is created

      @Api @Web?
      Scenario: Sign up submission should lead to new account in "pending" state
        Given I have not signed up before

        When I sign up for an account

          # 1. AWS

          # 1.1. Cognito

          Create Cognito user pool and client for consumers
            Allow self sign in

          Create cognito authorizer. See Alex Horea course.

          Attach cognito authorizer to API Gateway and all routes

          # 1.2. API

          "POST /consumer/account/sign-up"

          # 1.3. Lambda

          Use @aws-sdk/client-cognito-identity-provider

          Cognito APIs:
            SignUpCommand
            ConfirmSignUpCommand


          # 2. Web

          Account sign up page/form

          Create unique hash for username (and let users sign in with email)




        Then a new account should be created in a 'pending' state
        And I should get an email notification to confirm my email address

      Scenario: Confirming the email address should put a pending account in an active state

      Scenario: Able to sign in to an active account


    Rule: Username must be unique

      @Web
      Scenario: Unsuccessful sign up with duplicate username
    
    
    Rule: Password must contain ...

      @Web
      Scenario: ...
    

    