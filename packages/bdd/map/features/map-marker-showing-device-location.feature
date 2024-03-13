@ImpactStoryMapId:1.1.
Feature: View map marker showing device location

    Rule: 

      @Api @Web?
      Scenario: Successfully create a map marker showing device location

        Bounded context: Map

        Trigger:
          - IoT device sends GPS data

        Primary input:
          Device payload:
            - Device ID
            - Longitude
            - Latitude

        Other input:
          -

        Output event (on success):
          - DeviceLocationsUpdated

        Output event (on error):
          -

        Side-effect:
          -


        Data:



        AWS:

          IoT TopicRule
            - DeviceGpsReceived
          
          SNS
            - DeviceLocationsUpdated


          API:

            WebSocket:

              SnsToSqs: toWebClientWebSocketRouteQueue
            
            HTTP:

              GET /map/devices

              Parameters:
                -

              Response:


        Web:

          PubSub:
            - DeviceLocationsUpdated
          
          Store:
          - Fetch DeviceLocations file


        Workflow:

          Backend:

            # device sends payload to MQTT topic "dt/map/<ThingName>"

            # check the Device Registry for the device to see if GPS coordinates exist.
            
            # if there are no coordinates (we can assume that the device is connecting for the first time), then:

            #   save them in Device Registry

            #   publish to output event topic

            if coordinates exist, then:

              compare them with the incoming coordinates value and send an alert if the coordinates are out of acceptable range.


          Frontend:

            receive and publish the event topic to PubSub

            event should trigger an alert (display) to refresh map

            when alert is clicked, then:

              fetch list of "static GPS enabled devices" type and their Ids, Longitude, and Latitude attributes

            for each device:

              display a marker on the map



          



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
