"""Routes package for API endpoints."""

from app.routes.user import user_ns
from app.routes.item import item_ns
from app.routes.review import review_ns

__all__ = ['user_ns', 'item_ns', 'review_ns']
