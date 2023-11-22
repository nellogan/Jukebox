echo install required python packages
python -m pip install requests django djangorestframework
echo initialize with makemigrations and migrate
python ./manage.py makemigrations
python ./manage.py migrate
echo ensure SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and JUKEBOX_REDIRECT_URI are active env vars
echo use django runserver to run backend
python ./manage.py runserver