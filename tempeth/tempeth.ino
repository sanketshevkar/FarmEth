#include <DallasTemperature.h>
#include <OneWire.h>
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include <String.h>

#define ONE_WIRE_BUS 12
#define FIREBASE_HOST "tempeth.firebaseio.com"
#define FIREBASE_AUTH ""
#define WIFI_SSID "Sanjay Shevkar"
#define WIFI_PASSWORD "san121970"//D2 pin of nodemcu

const long utcOffsetInSeconds = 3600;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);
char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

OneWire oneWire(ONE_WIRE_BUS);
 
DallasTemperature sensors(&oneWire);            // Pass the oneWire reference to Dallas Temperature.

void setup(void)
{
  Serial.begin(9600); 
  sensors.begin();
    // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  timeClient.begin();
}

void loop(void)
{ 
  timeClient.update();
  sensors.requestTemperatures();                // Send the command to get temperatures 
  //Serial.println(sensors.getTempCByIndex(0));   // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
  int t= sensors.getTempCByIndex(0);
  String temp = String(t); 
  String timeNTP=timeClient.getFormattedTime();
  String day=daysOfTheWeek[timeClient.getDay()];
  //Firebase.setFloat("number", sensors.getTempCByIndex(0));
  // handle error
  StaticJsonBuffer<500> jsonBuffer;
  // append a new value to /logs
  JsonObject& root = jsonBuffer.createObject();
 
  root["temp"] = temp; //Put Sensor value
  root["time"] = timeNTP; //Reads Flash Button Status
  root["day"] = day; //Reads Flash Button Status
  String name = Firebase.push("logs", root);
  // handle error
  if (Firebase.failed()) {
      Serial.print("pushing /logs failed:");
      Serial.println(Firebase.error());  
      return;
  }
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }
  delay(1000000);
}
