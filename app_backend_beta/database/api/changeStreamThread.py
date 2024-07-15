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
        """
        This function is contiuously executed while the thread is running
        """

        # Watched for incremental changes in the database
        # Makes it so the backend doesn't have to parse through changes it doesn't need to know abou
        pipeline = pipeline = [{'$match': {'operationType': 'update'}}]
        
        # Open a change stream on the collection with the .watch() method
        with self.collection.watch(pipeline) as self.change_stream:

            # Make sure that this change stream has not been closed
            while self.change_stream.alive:
                # Check if there has actually been a change to the database
                # This makes it so that the function can continue to run without getting hung waiting for a change
                change = self.change_stream.try_next()
                if change is not None:
                    equalsID = (change['documentKey']['_id'] == self.userID)
                    stamps = change['updateDescription']['updatedFields']['stamps']

                    # If there was a change to the thread's user's stamps, emit that change 
                    if equalsID: self.socket_instance.emit("stamp", {"userStamps": stamps}, to=self.socket_sid)
                    continue
                
                time.sleep(5)
        
        print("Thread ended")

    def stop(self):
        """
        Stops the thread's change stream if it exists
        """
        if self.change_stream != None:
            self.change_stream.close()



    
