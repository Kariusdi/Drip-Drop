#include <WiFi.h>
#include <FirebaseESP32.h>
#include <HardwareSerial.h>
#include <ESP32Servo.h>

// Firebase Project Credentials
#define FIREBASE_HOST "bondrobackoffice-default-rtdb.asia-southeast1.firebasedatabase.app"  // Firebase Database URL (without "https://")
#define FIREBASE_AUTH "AIzaSyDjaZDuxWCxkt7s4GakP6LkXcUISZkrlyY"  // Your Web API key or database secret

// WiFi Credentials
#define WIFI_SSID "CDTI_Computer Engineering"
#define WIFI_PASSWORD "23059788"

#define TX 1
#define RX 3

// Firebase objects
FirebaseData fbdo;        // Firebase Data object
FirebaseAuth auth;        // Authentication object
FirebaseConfig config;    // Firebase configuration object

String startState = "/startState/start";  // Your Firebase Realtime Database path
// String value;  
int state; // Value to hold the fetched data
int decisionState = 1;

// GPIO Pins
int drive1 = 4;
int drive2 = 16;
int drive3 = 17;
int drive4 = 5;

int servoPin1 = 2;
int servoPin2 = 15;
Servo servo1;
Servo servo2;

void forward() {
  digitalWrite(drive1, HIGH);
  digitalWrite(drive2, LOW);
  digitalWrite(drive3, LOW);
  digitalWrite(drive4, HIGH);
}

void backward() {
  digitalWrite(drive1, LOW);
  digitalWrite(drive2, HIGH);
  digitalWrite(drive3, HIGH);
  digitalWrite(drive4, LOW);
}

void stop() {
  digitalWrite(drive1, LOW);
  digitalWrite(drive2, LOW);
  digitalWrite(drive3, LOW);
  digitalWrite(drive4, LOW);
}

void servo_home() {
  servo1.write(0);
  servo2.write(180);
}

void servo_bottle() {
  servo1.write(0);
  delay(1000);
  servo1.write(135);
  delay(1000);
  servo1.write(0);
}

void servo_glass() {
  servo2.write(180);
  delay(1000);
  servo2.write(70);
  delay(1000);
  servo2.write(180);
}

void setup() {
  Serial.begin(9600);

  pinMode(drive1, OUTPUT);
  pinMode(drive2, OUTPUT);
  pinMode(drive3, OUTPUT);
  pinMode(drive4, OUTPUT);
  servo1.attach(servoPin1);
  servo2.attach(servoPin2);

  servo_home();

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected to WiFi: ");
  Serial.println(WiFi.localIP());

  Serial.println("Next run: Firebase1");

  // Firebase configuration
  config.database_url = FIREBASE_HOST;  // Firebase Database URL (without "https://")
  config.api_key = FIREBASE_AUTH;  // Your Web API key

  Serial.println("Next run: Firebase2");
  // Reconnect WiFi automatically if connection is lost
  Firebase.reconnectWiFi(true);

  Serial.println("Next run: Firebase Sign-up");
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  // Initialize Firebase with the config and auth objects
  Firebase.begin(&config, &auth);

  // Ensure Firebase starts successfully
  if (!Firebase.ready()) {
    Serial.println("Firebase is not ready!");
    return;
  } else {
    Serial.println("Firebase is ready!");
  }

  // Optionally, set up connection and stream timeouts
  config.timeout.serverResponse = 10 * 1000;  // 10 seconds
}

void loop() {
  // Read data from Firebase
  if (Firebase.getInt(fbdo, startState)) {
    if (fbdo.dataType() == "int") {
      state = fbdo.intData();
      if (state == 1) {
        Serial.println(state);
        forward();
      } else {
        Serial.println(state);
        stop();
        // Serial.println("Current state is 0, No operations");
      }
    }
    if (Serial.available() > 0) { //checking data availability
      String data = Serial.readStringUntil('\n'); //reading line
      // Serial2.print("You sent me: "); //retransmitting
      Serial.println(data); //retransmitting
      if (data == "True") {
        servo_bottle();
        if (Firebase.getInt(fbdo, "/Counter/bottles")) {
          // Check if the value is retrieved successfully
          if (fbdo.dataType() == "int") {
              int currentValue_bottles = fbdo.intData();
              // Increment by 1
              Firebase.setInt(fbdo, "/Counter/bottles", currentValue_bottles + 1);
          } else {
            // If failed to get data, handle the error
            Serial.println("Failed to get data");
            Serial.println(fbdo.errorReason());
          }
        }
      } else if (data == "False") {
        servo_glass();
        if (Firebase.getInt(fbdo, "/Counter/glasses")) {
          // Check if the value is retrieved successfully
          if (fbdo.dataType() == "int") {
              int currentValue_glasses = fbdo.intData();
              // Increment by 1
              Firebase.setInt(fbdo, "/Counter/glasses", currentValue_glasses + 1);
          }
          else {
            // If failed to get data, handle the error
            Serial.println("Failed to get data");
            Serial.println(fbdo.errorReason());
          }
        }
      }
    }
  } else {
    Serial.print("Failed to get data, reason: ");
    Serial.println(fbdo.errorReason());
  }
  delay(2500); 
}

