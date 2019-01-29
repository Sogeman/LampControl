# LampControl
Third Semester Project, Home Control

Mandler Rene

Web Application to control Philips Hue lights Uand show public transport data in the future)

You can:

- create new user on Hue Bridge or recall user by nickname
- see and control all lights (color, brightness)
- add new lights and remove lights
- see and controll all groups (color, brightness)
- add new group and remove group
- add lights to groups and remove lights from groups
- choose a scene for a group, create own scenes, edit created scenes and delete those scenes

Technologies used: Java EE backend with Wildfly 12 deployment server, MySQL database, Angular frontend, Hue API.
Backend is used for own scene API instead of using HUE Scene API, also saving users

TODO: check inputs are not empty before saving, loading animation of 1s at the start to mask the time it takes to check the username, expand app to include departure times for bus in front of my appartment, set lightstate in group independently
