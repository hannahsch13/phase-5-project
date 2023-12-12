#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from werkzeug.security import generate_password_hash

# Local imports
from app import app
from models import db, User, BookClub, Book, ClubBook, Post

fake = Faker()

def seed_users(num_users=10):
    for _ in range(num_users):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            _password_hash=generate_password_hash(fake.password()),  # Use a proper password hashing function
            role=fake.random_element(elements=('admin', 'member')),
            bookclub_id= 1
        )
        db.session.add(user)
    db.session.commit()

def seed_bookclubs(num_bookclubs=3):
    for _ in range(num_bookclubs):
        bookclub = BookClub(
            club_name=fake.company(),
            picture=fake.image_url()
        )
        db.session.add(bookclub)
    db.session.commit()

def seed_books(num_books=20):
    for _ in range(num_books):
        book = Book(
            title=fake.catch_phrase(),
            author=fake.name(),
            cover=fake.image_url()
        )
        db.session.add(book)
    db.session.commit()

def seed_club_books():
    books = Book.query.all()
    bookclubs = BookClub.query.all()

    for book in books:
        club_books = [ClubBook(club_id=fake.random_element(elements=bookclubs).id, book_id=book.id) for _ in range(fake.random_int(min=1, max=3))]
        db.session.add_all(club_books)
    db.session.commit()

def seed_posts(num_posts=50):
    users = User.query.all()
    books = Book.query.all()

    for _ in range(num_posts):
        post = Post(
            title=fake.sentence(),
            body=fake.paragraph(),
            type=fake.random_element(elements=('review', 'discussion')),
            user_id=fake.random_element(elements=users).id,
            book_id=fake.random_element(elements=books).id
        )
        db.session.add(post)
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        seed_users()
        seed_bookclubs()
        seed_books()
        seed_club_books()
        seed_posts()