from app import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = "review"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    rating = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text, nullable=False)

    reviewer = db.Column(
        db.String(80),
        db.ForeignKey("user.username"),
        nullable=False
    )

    item_id = db.Column(
        db.Integer,
        db.ForeignKey("item.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )