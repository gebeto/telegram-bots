from telethon import events


def __init__(client, chats):
	new_action_event = events.ChatAction(chats=chats)
	return

	@client.on(new_action_event)
	async def handler_action(event):
		# print("ChatAction", event, event.as_dict())
		print("ChatAction", event)
		print("ACTION", dir(event))