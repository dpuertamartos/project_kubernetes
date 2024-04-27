# File: timestamp_service.py
import datetime
import time

if __name__ == '__main__':
    while True:
        with open("./files/storage.txt", "w") as f:
            f.write(datetime.datetime.now().isoformat())
        time.sleep(5)
