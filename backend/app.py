from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash

from datetime import datetime
import os


# ============================================================
# APP CONFIGURATION
# ============================================================

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///" + os.path.join(BASE_DIR, "smart_campus.db")
)

# Render/Supabase sometimes provides postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql://",
        1
    )

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY",
    "smart-campus-secret-key-change-this"
)

app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024


# ============================================================
# EXTENSIONS
# ============================================================

db = SQLAlchemy(app)
jwt = JWTManager(app)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)


# ============================================================
# DATABASE MODELS
# ============================================================

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(120),
        nullable=False
    )

    email = db.Column(
        db.String(150),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(20),
        nullable=False,
        default="student"
    )

    status = db.Column(
        db.String(20),
        nullable=False,
        default="Active"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


class Issue(db.Model):

    __tablename__ = "issues"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    category = db.Column(
        db.String(100),
        nullable=False
    )

    priority = db.Column(
        db.String(30),
        nullable=False,
        default="Medium"
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="Pending"
    )

    location = db.Column(
        db.String(200),
        nullable=True
    )

    image = db.Column(
        db.String(500),
        nullable=True
    )

    admin_remark = db.Column(
        db.Text,
        nullable=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user = db.relationship(
        "User",
        backref="issues"
    )


class Feedback(db.Model):

    __tablename__ = "feedback"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    issue_id = db.Column(
        db.Integer,
        db.ForeignKey("issues.id"),
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    rating = db.Column(
        db.Integer,
        nullable=False
    )

    comment = db.Column(
        db.Text,
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def user_to_dict(user):

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "status": user.status
    }


def issue_to_dict(issue):

    return {
        "id": issue.id,
        "title": issue.title,
        "description": issue.description,
        "category": issue.category,
        "priority": issue.priority,
        "status": issue.status,
        "location": issue.location,
        "image": issue.image,
        "adminRemark": issue.admin_remark,
        "userId": issue.user_id,
        "userName": issue.user.name if issue.user else None,
        "createdAt": (
            issue.created_at.isoformat()
            if issue.created_at
            else None
        )
    }


def get_current_user():

    user_id = get_jwt_identity()

    return db.session.get(
        User,
        int(user_id)
    )


def admin_required():

    user = get_current_user()

    if not user:
        return None, (
            jsonify({
                "error": "User not found"
            }),
            404
        )

    if user.role != "admin":

        return None, (
            jsonify({
                "error": "Admin access required"
            }),
            403
        )

    return user, None


# ============================================================
# HOME / HEALTH
# ============================================================

@app.route("/")
def home():

    return jsonify({
        "message": "Smart Campus Issue Reporting API is running!"
    })


@app.route("/api/health")
def health():

    return jsonify({
        "success": True,
        "message": "Backend and database are connected"
    })


# ============================================================
# AUTHENTICATION
# ============================================================

@app.route(
    "/api/auth/register",
    methods=["POST"]
)
@app.route(
    "/api/register",
    methods=["POST"]
)
def register():

    data = request.get_json(silent=True) or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:

        return jsonify({
            "success": False,
            "error": "Name, email and password are required"
        }), 400

    if len(password) < 6:

        return jsonify({
            "success": False,
            "error": "Password must contain at least 6 characters"
        }), 400

    existing_user = User.query.filter_by(
        email=email
    ).first()

    if existing_user:

        return jsonify({
            "success": False,
            "error": "Email already registered"
        }), 409

    user = User(
        name=name,
        email=email,
        password=generate_password_hash(password),
        role="student",
        status="Active"
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Registration Successful",
        "user": user_to_dict(user)
    }), 201


@app.route(
    "/api/auth/login",
    methods=["POST"]
)
@app.route(
    "/api/login",
    methods=["POST"]
)
def login():

    data = request.get_json(silent=True) or {}

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    requested_role = data.get("role")

    if not email or not password:

        return jsonify({
            "success": False,
            "error": "Email and password are required"
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:

        return jsonify({
            "success": False,
            "error": "Invalid Email or Password"
        }), 401

    if user.status != "Active":

        return jsonify({
            "success": False,
            "error": "Your account is blocked"
        }), 403

    if not check_password_hash(
        user.password,
        password
    ):

        return jsonify({
            "success": False,
            "error": "Invalid Email or Password"
        }), 401

    if requested_role and requested_role != user.role:

        return jsonify({
            "success": False,
            "error": "Selected role does not match your account"
        }), 403

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "success": True,
        "message": "Login Successful",
        "token": token,
        "user": user_to_dict(user)
    })


@app.route(
    "/api/auth/me",
    methods=["GET"]
)
@jwt_required()
def current_user():

    user = get_current_user()

    if not user:

        return jsonify({
            "error": "User not found"
        }), 404

    return jsonify({
        "success": True,
        "user": user_to_dict(user)
    })


# ============================================================
# ISSUES
# ============================================================

@app.route(
    "/api/issues",
    methods=["GET"]
)
@jwt_required()
def get_issues():

    user = get_current_user()

    if user.role == "admin":

        issues = Issue.query.order_by(
            Issue.created_at.desc()
        ).all()

    else:

        issues = Issue.query.filter_by(
            user_id=user.id
        ).order_by(
            Issue.created_at.desc()
        ).all()

    return jsonify({
        "success": True,
        "issues": [
            issue_to_dict(issue)
            for issue in issues
        ]
    })


@app.route(
    "/api/issues/<int:issue_id>",
    methods=["GET"]
)
@jwt_required()
def get_issue(issue_id):

    user = get_current_user()

    issue = db.session.get(
        Issue,
        issue_id
    )

    if not issue:

        return jsonify({
            "error": "Issue not found"
        }), 404

    if user.role != "admin" and issue.user_id != user.id:

        return jsonify({
            "error": "Access denied"
        }), 403

    return jsonify({
        "success": True,
        "issue": issue_to_dict(issue)
    })


@app.route(
    "/api/issues",
    methods=["POST"]
)
@jwt_required()
def create_issue():

    user = get_current_user()

    data = request.get_json(silent=True) or {}

    title = data.get("title", "").strip()
    description = data.get(
        "description",
        ""
    ).strip()

    category = data.get(
        "category",
        "Other"
    )

    priority = data.get(
        "priority",
        "Medium"
    )

    location = data.get(
        "location",
        ""
    )

    image = data.get(
        "image"
    )

    if not title or not description:

        return jsonify({
            "success": False,
            "error": "Title and description are required"
        }), 400

    issue = Issue(
        title=title,
        description=description,
        category=category,
        priority=priority,
        location=location,
        image=image,
        status="Pending",
        user_id=user.id
    )

    db.session.add(issue)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Issue Submitted Successfully",
        "issue": issue_to_dict(issue)
    }), 201


# ============================================================
# UPDATE ISSUE STATUS
# ============================================================

@app.route(
    "/api/issues/<int:issue_id>/status",
    methods=["PUT"]
)
@app.route(
    "/api/issues/<int:issue_id>",
    methods=["PUT"]
)
@jwt_required()
def update_issue(issue_id):

    user, error = admin_required()

    if error:
        return error

    issue = db.session.get(
        Issue,
        issue_id
    )

    if not issue:

        return jsonify({
            "error": "Issue not found"
        }), 404

    data = request.get_json(silent=True) or {}

    status = data.get("status")

    remark = data.get(
        "adminRemark",
        data.get("remark")
    )

    if status:

        allowed_statuses = [
            "Pending",
            "In Progress",
            "Resolved",
            "Rejected"
        ]

        if status not in allowed_statuses:

            return jsonify({
                "error": "Invalid status"
            }), 400

        issue.status = status

    if remark is not None:

        issue.admin_remark = remark

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Status Updated",
        "issue": issue_to_dict(issue)
    })


# ============================================================
# ADMIN USERS
# ============================================================

@app.route(
    "/api/users",
    methods=["GET"]
)
@jwt_required()
def get_users():

    user, error = admin_required()

    if error:
        return error

    users = User.query.order_by(
        User.id.asc()
    ).all()

    return jsonify({
        "success": True,
        "users": [
            user_to_dict(user)
            for user in users
        ]
    })


@app.route(
    "/api/users/<int:user_id>/status",
    methods=["PUT"]
)
@jwt_required()
def update_user_status(user_id):

    admin, error = admin_required()

    if error:
        return error

    user = db.session.get(
        User,
        user_id
    )

    if not user:

        return jsonify({
            "error": "User not found"
        }), 404

    data = request.get_json(silent=True) or {}

    status = data.get("status")

    if status not in [
        "Active",
        "Blocked"
    ]:

        return jsonify({
            "error": "Invalid user status"
        }), 400

    user.status = status

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "User Status Updated",
        "user": user_to_dict(user)
    })


# ============================================================
# FEEDBACK
# ============================================================

@app.route(
    "/api/issues/<int:issue_id>/feedback",
    methods=["POST"]
)
@jwt_required()
def add_feedback(issue_id):

    user = get_current_user()

    issue = db.session.get(
        Issue,
        issue_id
    )

    if not issue:

        return jsonify({
            "error": "Issue not found"
        }), 404

    if issue.user_id != user.id:

        return jsonify({
            "error": "You can only provide feedback for your own issue"
        }), 403

    data = request.get_json(silent=True) or {}

    rating = data.get("rating")
    comment = data.get(
        "comment",
        ""
    )

    try:
        rating = int(rating)
    except (TypeError, ValueError):

        return jsonify({
            "error": "Rating must be a number"
        }), 400

    if rating < 1 or rating > 5:

        return jsonify({
            "error": "Rating must be between 1 and 5"
        }), 400

    feedback = Feedback(
        issue_id=issue_id,
        user_id=user.id,
        rating=rating,
        comment=comment
    )

    db.session.add(feedback)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Feedback submitted successfully"
    }), 201


# ============================================================
# DATABASE INITIALIZATION
# ============================================================

def initialize_database():

    db.create_all()

    # Create default admin if one does not exist

    admin_email = "admin@smartcampus.com"

    admin = User.query.filter_by(
        email=admin_email
    ).first()

    if not admin:

        admin = User(
            name="Smart Campus Admin",
            email=admin_email,
            password=generate_password_hash(
                "admin123"
            ),
            role="admin",
            status="Active"
        )

        db.session.add(admin)
        db.session.commit()

        print(
            "Default admin created:"
        )
        print(
            "Email: admin@smartcampus.com"
        )
        print(
            "Password: admin123"
        )


with app.app_context():
    initialize_database()


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5050,
        debug=True
    )