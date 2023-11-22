"""
=@=!WARNING!=@=
Use environment variables
before deploying to production
=@=!WARNING!=@=
"""
import os

SPOTIFY_CLIENT_ID = os.environ.get('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.environ.get('SPOTIFY_CLIENT_SECRET')
JUKEBOX_REDIRECT_URI = os.environ.get('JUKEBOX_REDIRECT_URI')