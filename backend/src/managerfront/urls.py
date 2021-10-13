from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

schema_view = get_schema_view(
    openapi.Info(
        title="managerfront app api",
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.ourapp.com/policies/terms/",
        contact=openapi.Contact(email="contact@managerfront.local"),
        license=openapi.License(name="Test License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path("chat/", include("chat.urls")),
    path("admin/", admin.site.urls),
    path("", include("attendance.urls")),
    path("", include("debts.urls")),
    path("", include("expenses.urls")),
    path("", include("sales.urls")),
    path("", include("staff.urls")),
    path("", include("stock.urls")),
    path("", include("stockActivities.urls")),
    path("", include("companies.urls")),
    path("", include("branches.urls")),
    path("", include("debtclearance.urls")),
    path("", include("account.urls")),
    path("", include("invoices.urls")),
    path("", include("pricing.urls")),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
