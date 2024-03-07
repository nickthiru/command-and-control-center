@ImpactStoryMapId:1.1.
Feature: Create Thing Type

    Rule: 

      @Api @Web?
      Scenario: Successfully create a Thing Type

        Bounded context: Device management

        Trigger:
          - Request from user/frontend

        Primary input:
          -

        Other input:
          -

        Output event (on success):
          - 

        Output event (on error):
          -

        Side-effect:
          -


        Data:

          ? There should be an option to select whether ThingType has static GPS (to display on map). If so, then:
            add ThingType attributes:
              - staticGpsEnabled: boolean, set to true
              - longitude: number
              - latitude: number



        AWS:

          IoT TopicRule
            - 
          
          SNS
            - 


          API:
            
            HTTP:

              POST /thing-types/

              Parameters:
                -

              Response:


              # "POST /device-mgmt/thing-type"

              # Add request validation


        Web:

          PubSub:
            - 
          
          Store:
          - 


        Workflow:

          Backend:

            


          Frontend:

            Create Thing Type form









        Given ?

        When ?

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
    

    