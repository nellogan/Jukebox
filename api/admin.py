from django.contrib import admin
from .models import Room


class RoomAdmin(admin.ModelAdmin):
    readonly_field = 'created_at'


admin.site.register(Room, RoomAdmin)
