import threading
import time

class changeStreamThread(threading.Thread):
    def __init__(self, userID, socket_sid, socket_instance, collection):
        threading.Thread.__init__(self)

        # The mongo DB _id of the user 
        self.userID = userID

        # The SID of the user (associated with the socket)
        self.socket_sid = socket_sid

        # The instance of the current running socket
        self.socket_instance = socket_instance

        # The Mongo db collecttion to be watched
        self.collection = collection 

        self.change_stream = None
    
    def run(self):
        pipeline = pipeline = [{'$match': {'operationType': 'update'}}]
        
        with self.collection.watch(pipeline) as self.change_stream:
            while self.change_stream.alive:
                change = self.change_stream.try_next()
                if change is not None:
                    equalsID = (change['documentKey']['_id'] == self.userID)
                    stamps = change['updateDescription']['updatedFields']['stamps']

                    if equalsID: self.socket_instance.emit("stamp", {"stamps": stamps})
                    continue
                
                time.sleep(5)
        
        print("Thread ended")

    def stop(self):
        if self.change_stream != None:
            self.change_stream.close()



    
