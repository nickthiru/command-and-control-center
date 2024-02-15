@ImpactStoryMapId:1.1.
Feature: Create thing

    Rule: 

      @Api @Web?
      Scenario: Successfully register thing in Things Registry
        Given ?

        When ?

          # 1. AWS

            # 1.1. IoT
            # @aws-sdk/client-iot

              CreateThingCommand

              CreateKeysAndCertificateCommand

              # CreatePolicyCommand
              
              AttachPolicyCommand
              
              AttachThingPrincipalCommand

              Get Amazon Root CA 1 certificate. Probably not something you can fetch; need to save it in the Lambda handler (send it via Lambda cdk construct?),
              

            # 1.2. API

              # "POST device-mgmt/register/thing"

              # Add request validation

              Return device cert, private key, Root CA cert

            # 1.3. Lambda

              # Use @aws-sdk/client-cognito-identity-provider

              # Cognito APIs:
              #   SignUpCommand
              #   ConfirmSignUpCommand


          # 2. Web

            # Account sign up page/form

            # Create unique hash for username (and let users sign in with email)


        Then ?

        And ?

      Scenario: ?

      Scenario: ?


    Rule: ?

      @Web
      Scenario: ?
    
    
    Rule: ?

      @Web
      Scenario: ...
    

    