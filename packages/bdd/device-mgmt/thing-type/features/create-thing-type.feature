@ImpactStoryMapId:1.1.
Feature: Create Thing Type

    Rule: 

      @Api @Web?
      Scenario: Successfully create a Thing Type

        Bounded context: Device management

        Infra:

          CDK:

            IoT:

              IotClient
            
            Lambda (API Proxy)

            API:
              
              HTTP:

                POST /thing-type/

                Body Parameter:

                  ThingTypeName: string

                  If option of whether Things of this Type should be displayed on the map is selected, then:
                  add ThingType attributes:

                    StaticGpsEnabled: boolean, set to true
                    Longitude: number
                    Latitude: number
                  

                Response:


                # Add request validation


          Web:
            
            Store:
              - 



        Workflow:

          AWS:

            


          Web:

            Create Thing Type form

              Data:

                ThingTypeName: string, required

                Description: string, optional

                If option of whether Things of this Type should be displayed on the map is selected, then:
                  add ThingType attributes:
                    - staticGpsEnabled: boolean, set to true
                    - longitude: number
                    - latitude: number
            
            Send HTTP request 









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
    

    