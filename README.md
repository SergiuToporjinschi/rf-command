[![npm version](https://img.shields.io/npm/v/node-red-contrib-rf-command.svg?style=flat-square)](https://www.npmjs.com/package/node-red-contrib-rf-command)
[![npm](https://img.shields.io/npm/dt/node-red-contrib-rf-command.svg)](https://www.npmjs.com/package/node-red-contrib-rf-command)
[![npm downloads](https://img.shields.io/npm/dm/node-red-contrib-rf-command.svg?style=flat-square)](https://www.npmjs.com/package/node-red-contrib-rf-command)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/badges/shields.svg)](https://github.com/SergiuToporjinschi/rf-command)
[![GitHub last commit](https://img.shields.io/github/last-commit/SergiuToporjinschi/rf-command.svg)](https://github.com/SergiuToporjinschi/rf-command)
[![GitHub stars](https://img.shields.io/github/stars/SergiuToporjinschi/rf-command.svg)](https://github.com/SergiuToporjinschi/rf-command/watchers)
[![GitHub watchers](https://img.shields.io/github/watchers/SergiuToporjinschi/rf-command.svg)](https://github.com/SergiuToporjinschi/rf-command/stargazers)
[![GitHub license](https://img.shields.io/github/license/SergiuToporjinschi/rf-command.svg)](https://github.com/SergiuToporjinschi/rf-command/blob/master/LICENSE)

# rf-command

Offers possibility to send a binary code via radio waves. I'm personally using this for controlling different IOT devices by radio. 

Code is tested with [this device](http://www.electrodragon.com/product/433m-rf-wireless-transmitter-module/) on Node red installed on a PaspberryPi II.

The node contains a python script for sending the payload; 

## How RF comminication works 
  On RF, the bits are identify by how much time the signal is high and how much time nothing is emitted on that frequency.
  
  For example: if in 1024 &#181;s we have 66% of the time, signal emitted and 33% of is silance, then is one. If we have 33% of the time signal and then 66% of the time silance then is zero. 

## Settings
- **GPIO Type**: sets the type of pin specification; Can be BCM or BOARD more details [here](https://sourceforge.net/p/raspberry-gpio-python/wiki/BasicUsage/#pin-numbering);
- **GPIO**: pin number to which the RF emitter is connected;
- **Repeat**: Indicates how many times the payload will be sent. Sometime is not enough to send the command just one time and the commands need to be send multiple times. For example can be an interference on the same frequency in exactly the same moment. For avoiding this scenario you cand set it to send same command multiple times just to be sure;
- **Pause (&#181;s)**: if repeat is set more than one then we need to have a pause between each command;
- **Init sequence**: Many devices have an init sequence that needs to be sent before sending the binary command. This allows you to configure an initialization signal.
  - **Length**: If you have multiple commands to be send you can concatenate all of them in a string and set here how long is a command. The node will split the command and inject initialisation code before each command. This shuld be the number of bits
  - **Time high (&#181;s)**: How long the signal will be high for initialization; in microseconds;
  - **Time low (&#181;s)**: How long the signal will be low for initialization; in microseconds;
- **Bit timing**: configures how the time is split for a single bit;
  - **Long time (&#181;s)**: How much time is consider a long part of a bit for example can be 66% from 1024 (or how much a bit takes for your device)
  - **Short time (&#181;s)**: How much time is consider a short part of a bit for example can be 33% from 1024
