# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import staff_updates

class StaffConsumer(WebsocketConsumer):
    def fetch_messages(self,data):
        
        company = data.get('companyId')
        branch = data.get('branchId')
        updates = staff_updates.objects.filter(companyId=company,branchId=branch)
        content = {
            'messages': self.messages_to_json(updates)
        }
        self.send_message(content)

    def new_message(self, data):
        
        update,create = staff_updates.objects.update_or_create(
            companyId=data['companyId'],
            branchId=data['branchId'],
            staffId = data['staffId'],
            defaults={
            'staffId' : data['staffId'],
            'companyId' : data['companyId'],
            'branchId' : data['branchId'],
            'permission' : data['permission']
            }
        )
        
        controll = {
            'staffId' : data['staffId'],
            'companyId' : data['companyId'],
            'branchId' : data['branchId'],
            'permission' : data['permission']
         }
       

        content = {
            'command': 'new_message',
            'message': self.message_to_json(controll)
        }
        return self.send_chat_message(content)

    def messages_to_json(self, updates):
        result = []
        for update in updates:
            result.append(self.message_list_to_json(update))
        return result

    def message_list_to_json(self, update):
        return {
            'staffId' : update.staffId,
            'company': update.companyId,
            'branch': update.branchId,
            'permission': update.permission,
            
        }

    def message_to_json(self, update):
        return {
            'staffId' : update['staffId'],
            'company': update['companyId'],
            'branch': update['branchId'],
            'permission': update['permission'],
            
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        
        self.room_group_name = 'staff_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)


    def send_chat_message(self,message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
    
    def send_message(self,message):
        messageList = {
            'list': message['messages'],
            'command': 'fetch_messages',
            'section': 'staff_update'
        }
        main = json.dumps(messageList)
        self.send(text_data=main)

    # Receive message from room group
    def chat_message(self, event):
        
        message = event['message']
        message['message']['command'] = message['command']
        message['message']['section'] = 'staff_update'
        main = json.dumps(message['message'])
        self.send(text_data=main)