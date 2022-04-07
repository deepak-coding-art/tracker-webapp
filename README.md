# Position and Speed Tracking Module

## Team

1. Deepak Meena
2. Ravi Ranjan Kumar Thakur
3. Ritvik Haldia
4. Devendra Kumar Verma

## Objective

This project aims to develop a module which will track the real time position of an object along with its speed and direction of its motion. The module will be beneficial to track motion of vehicle and person and can be used as an anti-theft and a safety device. The module will continuously track the position of the object and feed the data on its server. These data can be easily accessed through any smartphone or Computer.

## Technical Details

The working of the module is based upon GPS (Global Positioning System). As GPS is a globally used and an open source positioning system that’s why it is perfect to fetch the position details of any object. The working of this module can be understood by the block diagram below.

The GPS modules receives signal from the satellite and calculates longitude, latitude and altitude of the object. After calculating the data it forwards it to the ESP32 microcontroller. The GPS module is connected with the microcontroller in serial communication. The ESP32 microcontroller converts the received data in a particular format and sends it to the http Server. To send data to the server the microcontroller uses either GPRS or Wi-Fi . Both GPRS and Wi-Fi are used to connect the module to the internet. GPRS allows the facility of installing SIM card that’s why it reliability is high on the other hand Wi-Fi is not available everywhere hence it is less reliable.
The http server stores the data received from the microcontroller and makes it available for the user every time. The user can access these data through API. API stands for Application Program Interface. It helps user to access the information stored on the server. To access this information the user and their device should be registered over the website. The user’s registration data is stored in database and is verified at the time of login.

## Usefulness

In India on an average around 13000 vehicles gets stolen each year. They don’t get caught because they change the appearance of the vehicle in such a way that even its owners can’t identify their own Vehicle. This module can solve this intense problem. The owner can not only obtain the real time location information of their vehicles but also they can find out at what speed and in which direction their vehicle is moving. So the benefits of this module are :-

1. Real-time position data
2. Speed of the Object
3. Direction of movement
4. History of movement

## Current Status of Development

Design, Prototype and Testing is under development.

## Market Potential

Since the problem which this module is solving is very genuine, this is likely to be a very useful and must-have device for everyone. Although it is in initial stage now but very soon it will become very efficient and cost effective. Future for this device seems to be very bright as it is going to be very compact and costeffective.
