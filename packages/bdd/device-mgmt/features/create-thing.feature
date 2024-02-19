@ImpactStoryMapId:1.1.
Feature: Create thing

    Rule: 

      @Api @Web?
      Scenario: Successfully register thing in Things Registry
        Given ?

        When ?

          # AWS

            # IoT Policy

              # CfnPolicy

            # Lambda
            
              # @aws-sdk/client-iot

                # Create a thing

                  # Use CreateThingCommand

                  # Input:
                    # - thingName (string)
                  
                  # Output:
                    # - 

                # CreateKeysAndCertificateCommand
                
                # AttachPolicyCommand
                
                # AttachThingPrincipalCommand

                # Get Amazon Root CA 1 certificate. Probably not something you can fetch; need to save it in the Lambda handler (send it via Lambda cdk construct?)
              

            # API

              # "POST /device-mgmt/thing"

              # Add request validation

              # Return device cert, private key, Root CA cert


          # Web

            # Register thing form





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
    

    