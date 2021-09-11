from django.template import context
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings



def send_email_to(subject,email,content):
    context = {
        'subject': subject,
        'email': email,
        'content':content
    }

    email_subject = subject
    email_body = content

    email = EmailMessage(
        email_subject,email_body,
        settings.DEFAULT_FROM_EMAIL,email
    )

    return email.send(fail_silently=False)