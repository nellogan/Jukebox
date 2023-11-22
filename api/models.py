import random
import string
from django.db import models


def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    return code


class Room(models.Model):
    code = models.CharField(max_length=6, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)

    current_votes_to_skip = models.IntegerField(null=False, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    # current_song takes song_id (alphanumeric string identifier from spotify)
    # rather than the actual song title hence max length=50.
    # null=True because rooms have no current song upon creation
    current_song = models.CharField(max_length=50, null=True)

    # TODO add fields to store all played songs and their associated votes to skip to gather users/customers preferences
