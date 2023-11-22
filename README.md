# About
Jukebox is a fullstack application that enables users to host rooms with a Jukebox that plays music and to 
democratically control which song is played. The room is linked to the host's spotify account and therefore playing 
device. Perfect for social gatherings both private and public such as parties, barbeques, road trips, restaurants, bars, 
and other venues.

Upon room creation, host selects whether guests can freely pause/play/skip current song and sets the number of votes 
required to skip current song. The host can share the unique 6 character length room code to allow friends or patrons to 
join. Host may change settings of current room at anytime. When host leaves the room, the room is deleted.

With a few adjustments data such as votes per song played and number of users/rooms can be saved to parse preferences 
and user engagement.

### Room data displayed:
* Song title
* Artist name
* Time remaining and total length
* Album cover art
* Total votes required to skip
* Current votes to skip

(NOTE: if host does not have a Spotify premium account: pause and skip functions are disabled. This is due to Spotify's
access_token restrictions.)

### Frontend
Language: Javascript
Libraries: React and Material UI
Compiler: Babel
Module Bundler: Webpack

### Backend
Language: Python
Framework: Django
Database: Sqlite3 (May upgrade to PostgreSQL)

### Instructions
1. Clone the repository: git clone https://github.com/nellogan/Jukebox.git
2. Ensure both node package manager (npm) and python are installed
3. Ensure environment variables SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, JUKEBOX_REDIRECT_URI
   (e.g. "http://yourhostdomain.com/spotify/redirect") are properly set.
4. In terminal enter: bash ./fullstack_run_script.sh - will install all node packages and compile frontend as well as
   install django and djangorestframework. Then python ./manage.py (makemigrations, migrations, and runserver) are 
   called. The server is running and ready to go! Note: change .sh file extensions to .bat and bash ... to call ... 
   for Windows.
