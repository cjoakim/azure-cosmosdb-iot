import sys
import logging
import datetime
import time
import os

from azure.eventhub import EventHubClient, Sender, EventData

# Address can be in either of these formats:
# "amqps://<URL-encoded-SAS-policy>:<URL-encoded-SAS-key>@<mynamespace>.servicebus.windows.net/myeventhub"
# "amqps://<mynamespace>.servicebus.windows.net/myeventhub"
namespace = os.environ.get('AZURE_EVENTHUB_NAMESPACE')
hubname   = os.environ.get('AZURE_EVENTHUB_HUBNAME')
address   = 'amqps://{}.servicebus.windows.net/{}'.format(namespace, hubname)

# SAS policy and key are not required if they are encoded in the URL
user = os.environ.get('AZURE_EVENTHUB_POLICY')
key  = os.environ.get('AZURE_EVENTHUB_KEY')

print('namespace: {}'.format(namespace))
print('hubname:   {}'.format(hubname))
print('address:   {}'.format(address))
print('user:      {}'.format(user))
print('key:       {}'.format(key))

try:
    client = EventHubClient(address, debug=False, username=user, password=key)
    sender = client.add_sender(partition="0")
    client.run()
    try:
        start_time = time.time()
        for i in range(10):
            print("Sending message: {}".format(i))
            sender.send(EventData(str(i)))
    except:
        raise
    finally:
        end_time = time.time()
        client.stop()
        run_time = end_time - start_time
        print.info("Runtime: {} seconds".format(run_time))

except KeyboardInterrupt:
    pass
