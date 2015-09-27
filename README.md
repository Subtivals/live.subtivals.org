# Description

[Subtivals](http://subtivals.org/) 1.8 comes with a new feature called *Web live*. When enabled, Subtivals synchronously shows the subtitles on a Web page, allowing spectators to read subtitles on their mobile, tablet or extra big screens.

![Web live screenshot](https://cloud.githubusercontent.com/assets/546692/9920151/fd12904a-5cd1-11e5-9da8-ca78f8b952c8.png)

This can be very useful when the venue is very big for example (like amphitheaters).

For more details, [read the blog article](http://blog.mathieu-leplatre.info/subtivals-remote-display.html)...

# Edit the configuration file

> Web live projection is considered *experimental*, and is not enabled by default in Subtivals.

The location of the configuration file depends on the operating system.

* On **Windows**, it should be located in this folder ``C:\Users\<Name>\AppData\Roaming\Subtivals\Subtivals.ini`` or ``C:\Documents and Settings\<Name>\Application Data\Subtivals\Subtivals.ini`` depending on the Windows version.
* On **Mac OS**, in ``/Users/<Name>/.config/Subtivals/Subtivals.ini``
* On **Linux**, in ``/home/<Name>/.config/Subtivals/Subtivals.ini``

Close Subtivals if it is running, and edit the configuration file with a text editor.

# Configure the server

In order to enable *Web live* subtitles, a server is required. 

We provide a demo server for free at `live.subtivals.org`, but **without any garantee**.

You can use it as much as you want, but we can't promise it will always be operational or work as expected.
Add those lines to the configuration file:

```
[Weblive]
secret=festival-Z-room-X
server=ws://live.subtivals.org
url=http://live.subtivals.org
```

The `secret` should be set to the value of your choice. It should be considered as a *projection id*, and determine which subtitles are shown on the Web page.

Start subtivals, and the *Web live* checkbox in preferences should now be enabled!

When checked, Subtivals connects to the server, and shows the full display URL. Clic on the link to test, or give the URL to your spectators!

> Since it is very long (eg. http://live.subtivals.org/#d3M6Ly9saXZlLnN1YnRpdmFscy5vcmc6MzE0MXxvdG90bw==), you can use an URL shorterner like http://goo.gl or http://bit.ly


# Run your own server

If you start this feature seriously, it is highly recommended to run your own server. 

## Install Node.js
It requires [Node.js](https://nodejs.org), which is available for Windows/Linux/Mac. Make sure you have *node* installed on your system by running this commands in a console:

```bash
> node --version
v0.10.37

> npm --version
1.4.28
```

If one these two commands shows an error, go back to Node installation documentation for your operating system.

## Install the Subtivals server

[Download the source files](https://github.com/Subtivals/live.subtivals.org/archive/master.zip), and extract them on your server.

Then run the following installation command (it does not require admin privileges):

```
> cd server
> npm install

...
websocket@1.0.21 node_modules/websocket
├── yaeti@0.0.4
├── nan@1.8.4
├── debug@2.2.0 (ms@0.7.1)
└── typedarray-to-buffer@3.0.4 (is-typedarray@1.0.0)
```

## Run the server

Once installation done, you can start the service with:

```
> nodejs server.js

...
Running on port 3141...
```

Your server is now running on port ``3141``. You can now specify the location of your `server` in the configuration file.


# Run your own display webpage

The Webpage provided on `http://live.subtivals.org` can handle subtitles coming from your custom server. However if you want to run it your own domain or customize the way subtitles are displayed, it is very easy.

You just have to take the content of the `client` folder and put it in your Web hosting (usually using FTP).

If you are a Web developper, have a look at the source files, the code is very small and straightforward!


# Problems ?

If you had trouble using this feature or installing your own server/webpage, do not hesitate to ask for help on http://community.subtivals.org. We will happy to help and improve this documentation! 
