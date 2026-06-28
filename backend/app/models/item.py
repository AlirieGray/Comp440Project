from app import db
from datetime import datetime

class Item(db.Model):
    __tablename__ = "item"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False) 
    #price is a float, since it can have decimal values, and it is required (nullable=False). We will also need to validate that the price is non-negative when creating or updating an item.
    #Price cant be letters either, since it is a float.
    owner = db.Column(
        db.String(80),
        db.ForeignKey("user.username"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )