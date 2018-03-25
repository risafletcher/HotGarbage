/*  
 *  Hotgarbage arduino app to determine optimal conditions for compost and 
 *  take necessary actions based on different thresholds
 */
#include "AdafruitIO_WiFi.h"
#include <ESP8266WiFi.h>
#include "DHT.h"
#include <Servo.h>
 
 // Ideally should be kept in zoo keeper
#define IO_USERNAME    "gkotecha" 
#define IO_KEY         "c59ebddfde3643bfafb3c4ed8bbe3f79" 
#define WIFI_SSID       "Puppet Guest"
#define WIFI_PASS       "argon4949"

//Pins
#define GAS_SENSOR A0  // Analog pin for gas sensor
#define DHTPIN 2       // Temp, Humidity sensor pin
#define DHTTYPE DHT22  // DHT type -> DHT 22  (AM2302)
int redLED = 0;
int greenLED = 16;
int servoPin = 15;

//Threshold values
int minHum = 60;
int maxTemp = 40;
int maxGas = 100; // ;)

int pos = 0;    // variable to store the servo position
// this int will hold the current count for our sketch
int count = 0;

//Library objects
DHT dht(DHTPIN, DHTTYPE);
Servo myservo;  // create servo object to control a servo
WiFiClient client;
AdafruitIO_WiFi aio(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);

// set up the all sensor feeds to talk to Adafruit IO cloud
AdafruitIO_Feed *temperature = aio.feed("temperature");
AdafruitIO_Feed *humidity = aio.feed("humidity");
AdafruitIO_Feed *gas_sensor = aio.feed("gas_sensor");

void setup() {

  myservo.attach(servoPin);  // attaches the servo on pin 9 to the servo object

  // start the serial connection
  Serial.begin(115200);

  // wait for serial monitor to open
  while(! Serial);

  Serial.print("Connecting to Adafruit IO");

  // connect to io.adafruit.com
  aio.connect();

  // wait for a connection
  while(aio.status() < AIO_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  // we are connected
  Serial.println();
  Serial.println(aio.statusText());

  pinMode(redLED, OUTPUT); //pin0 = RED LED
  pinMode(greenLED, OUTPUT); //pin16 = GREEN LED

}


void loop() {

  // aio.run(); is required for all sketches.
  // it should always be present at the top of your loop
  // function. it keeps the client connected to
  // io.adafruit.com, and processes any incoming data.
  aio.run();

  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  float h = dht.readHumidity();
  
  // Read temperature as Celsius
  float t = dht.readTemperature();

 // Check if any reads failed and exit early (to try again).
   if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
   }

   int reading = analogRead(A0);
   Serial.print("Gas sensor: ");
   Serial.println(reading);
   Serial.print("Humidity: ");
   Serial.print(h);
   Serial.print(" %\t");
   Serial.print("Temperature: ");
   Serial.print(t);
   Serial.println(" *C ");

  // light up the status LEDs
  if (reading>=maxGas || t>=maxTemp) {
      digitalWrite(redLED, HIGH);
      digitalWrite(greenLED, LOW);

      for (pos = 0; pos <= 180; pos += 1) {       // goes from 0 degrees to 180 degrees in steps of 1 degree
          myservo.write(pos);                     // tell servo to go to position in variable 'pos'
          delay(15);                              // waits 15ms for the servo to reach the position
      }

      for (pos = 180; pos >= 0; pos -= 1) {      // goes from 180 degrees to 0 degrees
          myservo.write(pos);                    // tell servo to go to position in variable 'pos'
          delay(15);                             // waits 15ms for the servo to reach the position
      }

      delay(500);
  }

  if (reading<maxGas && t<maxTemp) {
      digitalWrite(greenLED, HIGH);
      digitalWrite(redLED, LOW);
      delay(500);
  }

  //Save the data on the cloud
  temperature->save(t);
  humidity->save(h);
  gas_sensor->save(reading);
     
  // wait one second (1000 milliseconds == 1 second)
  delay(6000);
}