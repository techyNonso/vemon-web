from django.core.mail import EmailMessage
from django.core.mail import send_mail

class Util:
    @staticmethod
    def send_email(data):
        """
        email=EmailMessage(data['email_subject'],data['email_body'],to=[data['to_email']])
        email.send()
        """

        #send mail
        try :
            send_mail(
                data['email_subject'],
                data['email_body'],
                'williamikeji@gmail.com',
                [data['to_email']],
                fail_silently=False
            )
            return True
        except smtplib.SMTPException as error:
            return False

        