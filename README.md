# Sector.io

**Warning: In Progress**

A seeded, random stars without number sector generator based completely in the web.

## Alpha Roadmap
* [x] Generate a hexagonal playing grid
* [x] Create way to configure seed/grid size
* [ ] Generate a sector based on seed and a grid size
  * [x] Generate a random sector name
  * [x] Generate random star names
  * [x] Generate a random number of planets (weighted)
  * [ ] Generate planet tags
* [x] Draw sector on hexagonal playing grid
  * [x] Center grid within view
  * [x] Scale view based on size of screen
  * [x] Draw dots in hexes that contain stars
  * [x] Add hexagonal hover state
  * [x] Draw grid coordinates (scale based on size and remove when too small)
* [ ] Render system information
  * [x] Create information sidebar (scale hex grid area based on open/close)
  * [ ] Render star information
  * [ ] Render planet information
  * [x] Render sector hover tooltip with basic system information
* [x] Generate share link

## Possible Features
* Create login/signup workflow to save multiple sectors
* Create process to wire up sector manually (if the user wants to roll their own)
* Full customization (stars, planets, tags, etc.)
* Sector, planet, city, etc. notes
* Add asteroid fields to hex map
* More random generation
  * Moons (will dictate tides and habitability)
  * Cities (based on tech level and population)
  * Languages (create planet/city names based on language)
  * Exact Star/Planet Size
  * Planet Distance from Star (will dictate temperature/habitability of planet)
  * Planet Temperature
  * Planet/Star Rotation Period
* Sector travel tool
* Use WebGL to render a random 3D image of planet or moon
  * Add locations of major cities
  * Add secret location
  * Add way for user to add new locations to 3d view


## Development

To run the project see [create-react-app](https://github.com/facebookincubator/create-react-app).