from flask_restx import Namespace, Resource, fields
from flask import request
from app import db
from app.models.item import Item
from app.models.user import User
from app.models.review import Review
from datetime import datetime

review_ns = Namespace("reviews", description="Review operations")

review_model = review_ns.model("Review", {

    "item_id": fields.Integer(required=True,example=1),
    "reviewer": fields.String(required=True,example="test1234"),
    "rating": fields.String(required=True,enum=["excellent","good","fair","poor"]),
    "description": fields.String(required=True,example="excellent,good,fair,poor -> raiting options")
})

@review_ns.route("/")
class ReviewList(Resource):

    @review_ns.expect(review_model)
    @review_ns.response(201, "Review created successfully")
    @review_ns.response(400, "Validation error")
    @review_ns.response(404, "Item not found")
    def post(self):

        data = review_ns.payload

        item_id = data.get("item_id")
        reviewer = (data.get("reviewer") or "").strip()
        rating = (data.get("rating") or "").strip().lower()
        description = (data.get("description") or "").strip()

        if not reviewer or not description:
            review_ns.abort(400, "All fields are required")

        if rating not in ["excellent", "good", "fair", "poor"]:
            review_ns.abort(400, "Invalid rating value")

        # Check if the reviewer exists
        if not User.query.filter_by(username=reviewer).first():
            review_ns.abort(400, "Reviewer does not exist")

        # Check if the item exists
        item = Item.query.get(item_id)
        if not item:
            review_ns.abort(404, "Item not found")
        
        # Check if the reviewer is the owner of the item
        if item.owner == reviewer:
            review_ns.abort(400, "No self reviews allowed")

        # Check if the reviewer has already reviewed this item, since the reviewer can only review an item once.
        existing = Review.query.filter_by(
            reviewer=reviewer,
            item_id=item_id
        ).first()

        if existing:
            review_ns.abort(400, "You have already reviewed this item")

        # Enforce the requierement for a daily limit of 2 reviews per user
        today = datetime.utcnow().date()

        count = Review.query.filter(
            Review.reviewer == reviewer,
            db.func.date(Review.created_at) == today
        ).count()

        if count >= 2:
            review_ns.abort(400, "Users may only submit up to two reviews per day.")

        # Create and save the new review
        review = Review(
            item_id=item_id,
            reviewer=reviewer,
            rating=rating,
            description=description
        )

        db.session.add(review)
        db.session.commit()

        return {
            "message": "Review submitted successfully",
            "review_id": review.id
        }, 201