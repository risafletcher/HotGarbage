
#include "AdafruitIO_WiFi.h"
#include <ESP8266WiFi.h>
#include "DHT.h"

/*
 *  Simple HTTP get webclient test
 */
 
#define IO_USERNAME    "gkotecha"
#define IO_KEY         "c59ebddfde3643bfafb3c4ed8bbe3f79"
#define WIFI_SSID       "Puppet Guest"
#define WIFI_PASS       "argon4949"

WiFiClient client;

// this int will hold the current count for our sketch
int count = 0;

AdafruitIO_WiFi aio(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);
// set up the 'counter' feed
AdafruitIO_Feed *counter = aio.feed("counter");
AdafruitIO_Feed *temperature = aio.feed("temperature");
AdafruitIO_Feed *humidity = aio.feed("humidity");

//Adafruit_IO_Feed lightFeed = aio.getFeed("light");

#define ADAFRUIT_IO_KEY    "c59ebddfde3643bfafb3c4ed8bbe3f79"

#define GAS_SENSOR A0
#define DHTPIN 2     // what pin we're connected to
#define DHTTYPE DHT22   // DHT 22  (AM2302)

int maxHum = 60;
int maxTemp = 40;

DHT dht(DHTPIN, DHTTYPE);

void setup() {

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

}


  void loop() {

  // io.run(); is required for all sketches.
  // it should always be present at the top of your loop
  // function. it keeps the client connected to
  // io.adafruit.com, and processes any incoming data.
  aio.run();

  
  // save count to the 'counter' feed on Adafruit IO
  Serial.print("sending -> ");
  Serial.println(count);
  //counter->save(count);

  // increment the count by 1
  //count++;

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
   Serial.println(reading);
  
   Serial.print("Humidity: ");
   Serial.print(h);
   Serial.print(" %\t");
   Serial.print("Temperature: ");
   Serial.print(t);
   Serial.println(" *C ");

   temperature->save(t);
   humidity->save(h);
   
  // wait one second (1000 milliseconds == 1 second)
  delay(3000);

}


/*
 
const char* ssid     = "Puppet Guest";
const char* password = "argon4949";
const char* host = "wifitest.adafruit.com";

byte ledPin = 0;
void setup() {

  pinMode(ledPin, OUTPUT);
  
  Serial.begin(115200);
  delay(100);
 
  // We start by connecting to a WiFi network
 
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  aio.begin();
  
}
int value = 0;

void loop() {
  //--- READ LIGHT FEED STATE ---
  FeedData feedData = lightFeed.receive();
  if (feedData.isValid()) {
    Serial.print(F("Received value from feed: ")); Serial.println(feedData);
    digitalWrite(ledPin, !strcmp(feedData,"ON"));
  }
  else {
    Serial.print(F("Failed to receive the latest feed value!"));
  }

  // Don't be a jerk and abuse AdaFruit.io.  Wait a second in-between data requests.
  delay(1000);
}
*/

/*
void loop() {
  delay(5000);
  ++value;
 
  Serial.print("connecting to ");
  Serial.println(host);
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  // We now create a URI for the request
  String url = "/testwifi/index.html";
  Serial.print("Requesting URL: ");
  Serial.println(url);
  
  // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
  delay(500);

  
  // Read all the lines of the reply from server and print them to Serial
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }

  Serial.println();
  Serial.println("closing connection");
}
*/



/*
void loop() {
  digitalWrite(0, HIGH);
  delay(500);
  digitalWrite(0, LOW);
  delay(500);
}
*/
/*
void loop() {
  delay(5000);
  ++value;
 
  Serial.print("connecting to ");
  Serial.println(host);
  
  // Use WiFiClient class to create TCP connections
  WiFiClient client;
  const int httpPort = 80;
  if (!client.connect(host, httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  // We now create a URI for the request
  String url = "/testwifi/index.html";
  Serial.print("Requesting URL: ");
  Serial.println(url);
  
  // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" + 
               "Connection: close\r\n\r\n");
  delay(500);

  
  // Read all the lines of the reply from server and print them to Serial
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }

  Serial.println();
  Serial.println("closing connection");
}*/
