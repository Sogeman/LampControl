![desktop view](https://i.imgur.com/N6jFk0m.png)
![mobile view](https://i.imgur.com/niv5tly.png)
![departure view](https://i.imgur.com/uzU7rGS.png)

<a href="https://imgur.com/a/DoKlxT0">More pictures </a>


# LampControl
Third Semester Project, Home Control

v1.3 under releases

Mandler Rene

Web Application to control Philips Hue lights and show public transport data for specific stops<br>
I have it running on a Raspberry Pi to access it on a tablet near the door<br>
Note for future projects: do error handling

<h1>You can:</h1>

- create new user on Hue Bridge or recall user by nickname
- see and control all lights (color, brightness)
- add new lights and remove lights
- see and controll all groups (color, brightness)
- add new group or room and remove them (lights can only be in one room)
- add lights to groups and remove lights from groups
- choose a scene for a group, create own scenes, edit created scenes and delete those scenes
- view Wiener Linien departure times of stations (change station in source code)

works on tablets and phones (tested on Fire HD 2017, Axon 7 and Pixel 2XL with Firefox and Chrome)

<h1>Technologies used:</h1>
Java EE backend with Wildfly 12 deployment server, MySQL database, Angular 7 frontend<br>
Backend is used for own scene API instead of using HUE Scene API and for saving users

<h1>APIs</h1>
HUE API: https://developers.meethue.com/<br>
Wiener Linien Open Data API: https://www.wienerlinien.at/eportal3/ep/channelView.do/pageTypeId/66528/channelId/-48664<br>
<em>remove .dist from WienerLinienResource.java.dist and insert Wiener Linien Developer Key</em>


Todo: put all the multiple empty then methods into one, really no idea why I did it like that, cache scene api call
