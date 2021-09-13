from django.core.mail import EmailMessage
from django.core.mail import send_mail
import threading
import smtplib
from account.tasks import send_email_task
from datetime import date,datetime

class EmailThread(threading.Thread):

    def __init__(self,data ):
       self.email = data
       threading.Thread.__init__(self)
    def run(self):
        self.email.send(fail_silently=False)
    


class Util:
    @staticmethod
    def send_email(data):
        

        #send mail
        try :
            send_email_task.delay(data)
            return True
        except smtplib.SMTPException as error:
            return False

    @staticmethod
    def checkExpiration(value):
        today = datetime.today()
        old = date(value.year,value.month,value.day)
        current = date(today.year,today.month,today.day)
        diff = old - current
        days = diff.days
        
        if days > 0:
            return True
        else:
            return False