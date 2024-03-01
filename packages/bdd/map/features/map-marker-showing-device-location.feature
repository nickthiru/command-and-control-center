@ImpactStoryMapId:1.1.
Feature: View map marker showing device location

    Rule: 

      @Api @Web?
      Scenario: Successfully create a map marker showing device location

        Bounded context: Map

        Trigger:
          - IoT device sends GPS data

        Primary input:
          - GPS data from a device

        Other input:
          -

        Output events (on success):
          -

        Output events (on error):
          -

        Side-effects:
          -


        Data:



        AWS:

          IoT TopicRule
            - DeviceGpsReceived


          API:

            # "POST /domain/action"

            #   Request validation:

            #   Return:

            WebSocket:

              Route:


        Web:

          PubSub: 




        Workflow:

          Receive device GPS data from IoT Device on IoT Core message broker

            Device sends payload to topic "dt/map/<ThingName>"
          
            Check the Device Registry for the device to see if GPS coordinates exist.
            
            If there are no coordinates (we can assume that the device is connecting for the first time), then save them, and send a message to the frontend to save it in indexedDb and display on the map (i.e. map refresh alert).
              
            If coordinates exist, then compare the values and send an alert if the coordinates are out of acceptable range.

          
          
          Send GPS data to frontend



          



          # AWS

            # IoT
            
              # @aws-sdk/client-iot

              # Command

              # Input:
              #   - 
              
              # Output:
              #   - 


             
            # API

              

            # Lambda



          # Web

            # Fetch device details from the Device Registry

            # Load the map with device markers

              # Load device details from indexedDb

            # When a new device connects, save device details in indexedDb, and show alert to refresh the map

            # 




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
