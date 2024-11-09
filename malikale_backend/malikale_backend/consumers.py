import json
from channels.generic.websocket import AsyncWebsocketConsumer

class PaymentStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.checkout_request_id = self.scope['url_route']['kwargs']['checkout_request_id']
        self.room_group_name = f'payment_{self.checkout_request_id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def payment_status_update(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))