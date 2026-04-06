# "BGS Security" – Monitoring Ecosystem

The project is a real-time monitoring and dispatch system designed to easily manage emergency alerts from various fixed locations, such as commercial spaces or corporate offices.
The core of this project is an ESP32 board programmed in Arduino (C++) and linked to a web application. From the dashboard, operators can monitor and respond to any alert triggered by a physical button on the device.

### Hardware 
* ESP32-DevKitC development board 
* Mini PCB Push Button 
* 2 x 220 Ω Resistors
* 1 x 5mm RED LED
* 1 x 5mm GREEN LED

### Software
* **Frontend:**
  * React.js
  * TailwindCSS
  * SweetAlert2
  * React Cliploaders
* **Backend:**
  * Node.js
  * Express.js
  * Arduino (C++)

### How it works
* The ESP32 board must be connected to a power source and a stable internet connection.
* The physical button is pressed for a few seconds until the Red LED starts blinking.
* The operator receives an alert in the web app within 2 seconds, showing the location, coordinates, and the exact time the button was pressed.
* An interactive button is available to open a map for the precise location.
* Once the operator acknowledges the alert, the Green LED on the board lights up for 5 seconds to confirm the response.

### Extra features
* Operators can access logs and statistics, including total alerts, confirmed alerts, and the timestamp of the last alert.
* If a board disconnects while an alert is still unconfirmed, the alert remains visible to operators with all its data. However, confirmation is only possible once the board reconnects.
* The web interface is mobile-friendly, allowing operators to manage alerts on the go.

### Info
This repository contains only the JavaScript code for the web platform (Frontend & Backend). The ESP32 C++ firmware is not included here.

### Screenshots
<img width="735" height="430" alt="image" src="https://github.com/user-attachments/assets/ece1b498-ef44-4d62-9065-edc600ad34f4" />
<img width="876" height="547" alt="image" src="https://github.com/user-attachments/assets/9ef639c2-6eb9-45eb-9409-9261f3e09bf9" />
<img width="872" height="548" alt="image" src="https://github.com/user-attachments/assets/64e30cce-7fd1-4693-b643-01b2afe4c23e" />
<img width="872" height="548" alt="image" src="https://github.com/user-attachments/assets/6f958eb8-e1ed-4196-ba71-3e4dfb3cae2e" />
<img width="876" height="548" alt="image" src="https://github.com/user-attachments/assets/70e2d782-abfc-4f37-b211-996e0a21b35b" />
<img width="895" height="595" alt="image" src="https://github.com/user-attachments/assets/ef722763-c9d2-43c5-ba0d-f30f9a9c6886" />





