from django.urls import re_path

import chat.consumers
import staff.consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', chat.consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/staff/(?P<room_name>\w+)/$', staff.consumers.StaffConsumer.as_asgi()),
]
