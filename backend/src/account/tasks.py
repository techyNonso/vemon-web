from celery.decorators import task
from managerfront.email import send_email_to
from celery.utils.log import get_task_logger
from celery import shared_task

logger = get_task_logger(__name__)


@shared_task
def send_email_task(data):
    logger.info("Mail sent")
    return send_email_to(data["email_subject"], data["to_email"], data["email_body"])
