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
          -

        Output event (on error):
          -

        Side-effect:
          -


        Data:



        AWS:

          IoT TopicRule
            - DeviceGpsReceived
          
          SNS
            - DeviceGpsReceived


          API:

            WebSocket:

              SnsToSqs: toWebClientWebSocketRouteQueue


        Web:

          PubSub:
            - DeviceGpsReceived
          
          Store:
          - GeoJSON file


        Workflow:

          Backend:

            device sends payload to MQTT topic "dt/map/<ThingName>"
          
            Fn: SaveDeviceGpsIfFirstTimeConnecting
              Input:
                - Device payload
              Output event:
                - DeviceGpsReceived

              check the Device Registry for the device to see if GPS coordinates exist.
              
              if there are no coordinates (we can assume that the device is connecting for the first time), then:

                save them in Device Registry
                
                if coordinates exist, then compare the values and send an alert if the coordinates are out of acceptable range.

                    TODO
                          
                publish GPS data to SNS
          
          Frontend:

            receive and publish the device payload to PubSub

            save Device ID, Longitude, and Latitude in indexedDb

            update GeoJSON file containing device GPS coordinates
            
            # display alert to refresh map

            # when alert is clicked, then
            #   read GeoJSON file and set/update svelte store holding the same

            #   it should disply a new marker



          



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
