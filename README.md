# LED Mapper

A browser application which uses the webcam of your device to map LED positions.

The Browser expects to be able to send commands through a websocket to turn on a series of LEDs one at a time. It takes a photo before and after turning the light on using a webcam and compares the two frames to calculate the x & y position within the camera frame.

![LED Rhino being mapped](https://s3-eu-west-1.amazonaws.com/informatics-webimages/projects/rhino/rhino-mapping.gif)

## Installation

Clone the repo

```
git clone https://github.com/met-office-lab/led-mapper.git
```

## Usage

Run a web server and view the `index.html` page in a browser.

Dim the lights and point your webcam at the LED matrix you wish to map.

Watch the console output for a json object to be printed on completion.

_Pro Tip: To run a simple web server in your current directory run `python -m SimpleHTTPServer 8000` and visit `http://localhost:8000` in your browser._

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[GNU General Public License (GPL) v3](https://www.gnu.org/licenses/gpl-3.0.en.html)
