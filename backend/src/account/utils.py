from django.core.mail import EmailMessage
from django.core.mail import send_mail
import threading
import smtplib
from .tasks import send_email_task

class EmailThread(threading.Thread):

    def __init__(self,data ):
       self.email = data
       threading.Thread.__init__(self)
    def run(self):
        self.email.send(fail_silently=False)
    


class Util:
    @staticmethod
    def send_email(data):
        """
        email=EmailMessage(data['email_subject'],data['email_body'],to=[data['to_email']])
        email.send()
        """

        #send mail
        try :
            """
            send_mail(
                data['email_subject'],
                data['email_body'],
                'williamikeji@gmail.com',
                [data['to_email']],
                fail_silently=False
            )
            """
            send_email_task.delay(data)
            return True
        except smtplib.SMTPException as error:
            return False

        