import os
from pathlib import Path
import environ
from django.core.exceptions import ImproperlyConfigured
import dj_database_url

# Initialize environment variables
env = environ.Env(
    # set casting, default value
    DJANGO_DEBUG=(bool, False)
)
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

# --- SECURITY ---
DEBUG = env("DJANGO_DEBUG")

SECRET_KEY = env("DJANGO_SECRET_KEY")

# Railway provides the public domain in this env var
RAILWAY_PUBLIC_DOMAIN = env("RAILWAY_PUBLIC_DOMAIN", default=None)
ALLOWED_HOSTS = []
if RAILWAY_PUBLIC_DOMAIN:
    ALLOWED_HOSTS.append(RAILWAY_PUBLIC_DOMAIN)

# Add other allowed hosts from an env var, falling back to localhost for development
ALLOWED_HOSTS.extend(env.list("DJANGO_ALLOWED_HOSTS", default=["localhost", "127.0.0.1"]))


ADMIN_URL = env("DJANGO_ADMIN_URL", default="secret-admin/")

# --- APPS & MIDDLEWARE ---
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "whitenoise.runserver_nostatic",  # Important for serving static files in dev
    "django.contrib.staticfiles",
    "django.contrib.postgres",
    "corsheaders",
    "portfolio.apps.PortfolioConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "pro_portfolio.urls"
WSGI_APPLICATION = "pro_portfolio.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "templates",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# --- DATABASE ---
# Uses dj-database-url to parse the DATABASE_URL from Railway
# Check if DATABASE_URL or POSTGRES_URL is available
DATABASE_URL = env("DATABASE_URL", default=None) or env("POSTGRES_URL", default=None)

if DATABASE_URL:
    # Production: Use Railway's provided database URL
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=True
        )
    }
else:
    # Development: Use individual environment variables
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env("PGDATABASE", default=env("DB_NAME", default="railway")),
            "USER": env("PGUSER", default=env("DB_USER", default="postgres")),
            "PASSWORD": env("PGPASSWORD", default=env("DB_PASSWORD", default="")),
            "HOST": env("PGHOST", default=env("DB_HOST", default="localhost")),
            "PORT": env("PGPORT", default=env("DB_PORT", default="5432")),
        }
    }


# --- STATIC & MEDIA SETTINGS ---
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_DIRS = [
    BASE_DIR / "static/react",
]

# --- WHITENOISE CONFIGURATION ---
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# --- CORS & CSRF ---
CORS_ALLOWED_ORIGINS = []
CSRF_TRUSTED_ORIGINS = []

if RAILWAY_PUBLIC_DOMAIN:
    CORS_ALLOWED_ORIGINS.append(f"https://{RAILWAY_PUBLIC_DOMAIN}")
    CSRF_TRUSTED_ORIGINS.append(f"https://{RAILWAY_PUBLIC_DOMAIN}")

# Add any additional origins from environment variables
CORS_ALLOWED_ORIGINS.extend(env.list("DJANGO_CORS_ALLOWED_ORIGINS", default=[]))
CSRF_TRUSTED_ORIGINS.extend(env.list("DJANGO_CSRF_TRUSTED_ORIGINS", default=[]))

CORS_ALLOW_CREDENTIALS = True


# --- CACHE ---
REDIS_URL = env("REDIS_URL", default=None)
if REDIS_URL:
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": REDIS_URL,
            "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
        }
    }
else:
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "portfolio-cache",
        }
    }

# --- PRODUCTION SECURITY SETTINGS ---
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
X_FRAME_OPTIONS = "DENY"
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"

if not DEBUG:
    SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

# --- LOGGING ---
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {"format": "%(asctime)s %(levelname)s %(name)s %(message)s"},
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "standard"},
    },
    "root": {"handlers": ["console"], "level": env("DJANGO_LOG_LEVEL", default="INFO")},
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True