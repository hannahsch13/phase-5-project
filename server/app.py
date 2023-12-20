#!/usr/bin/env python3

# Standard library imports

# Remote library imports
import logging
from flask import request, make_response, session, jsonify
from flask_restful import Resource
from datetime import datetime
# Local imports
from config import db, api, app
# Add your model imports
from models import User
from models import BookClub
from models import Book
from models import ClubBook
from models import Post

# Views go here!


class Users(Resource):
    def get(self):
        user_list= [user.to_dict() for user in User.query.all()]
        return make_response(user_list, 200)
    

    def post(self):
        data = request.get_json()
        user = User(name= data['name'], username=data['username'], email=data['email'], password_hash=data['password'], created_at=datetime.utcnow(), updated_at=datetime.utcnow())
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response({'user': user.to_dict()}, 201 )




api.add_resource(Users, '/users')  




@app.route('/authorized')
def authorized():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        return make_response(user.to_dict(), 200)
    except:
        return make_response({ "error": "User not found"}, 404)

@app.route('/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None 
    return make_response('', 204)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        # import ipdb; ipdb.set_trace()
        if user.authenticate(data['password']):
            session['user_id'] = user.id
            return make_response({'user': user.to_dict()}, 200)
        else:
            return make_response({'error': 'incorrect password'}, 401)
    except:
        return make_response({'error': 'username incorrect'}, 401)



class BookClubs(Resource):
    def get(self):
        club_list= [club.to_dict() for club in BookClub.query.all()]
        return make_response(club_list, 200)
        
    def post(self):
        data = request.get_json()
        club = BookClub(club_name=data['club_name'], picture=data['picture'], books = data['books'])
        db.session.add(club)
        db.session.commit()
        # session['user_id'] = user.id
        return make_response(club.to_dict(), 201 )

api.add_resource(BookClubs, '/clubs')  

# rules = ('-users.bookclub', '-club_books.bookclub')


class UserBookClub(Resource):
    def get(self, user_id):
        try:
            user= User.query.get(user_id)
            if user:
                if user.bookclub:
                    bookclub_data = {
                        'id': user.bookclub.id,
                        'club_name': user.bookclub.club_name,
                        'picture': user.bookclub.picture,
                        'members': [{'id': member.id, 'name': member.name, 'username': member.username} for member in user.bookclub.users],
                        'books': [{'id': book.id, 'title': book.title, 'author': book.author, 'cover': book.cover} for book in user.bookclub.books]
                    }
                    return make_response(jsonify(bookclub_data), 200)
                else:
                    return make_response({'message': 'User is not part of a book club.'})
            else: 
                return make_response({'message': 'User not found'}, 404)
        except Exception as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(UserBookClub, '/user/bookclub/<int:user_id>')

class JoinBookClub(Resource):
    def post(self, bookclub_id):
        try:
            # Ensure the user is authenticated
            if 'user_id' not in session:
                return make_response({'error': 'User not authenticated'}, 401)

            user_id = session['user_id']
            user = User.query.get(user_id)

            if not user:
                return make_response({'error': 'User not found'}, 404)

            bookclub = BookClub.query.get(bookclub_id)

            if not bookclub:
                return make_response({'error': 'Book Club not found'}, 404)

            # Associate the book club with the user
            user.bookclub = bookclub
            db.session.commit()

            return make_response({'message': 'User joined the book club successfully'}, 200)

        except Exception as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(JoinBookClub, '/join/bookclub/<int:bookclub_id>')


class Books(Resource):
    def get(self):
        book_list= [book.to_dict() for book in Book.query.all()]
        return make_response(book_list, 200)

    def post(self):
        data = request.get_json()
        book = Book(title= data['title'], author=data['author'], cover=data['cover'])
        db.session.add(book)
        db.session.commit()

        return make_response(book.to_dict(), 201)


api.add_resource(Books, '/books')  


class Posts(Resource):
    def get(self):
        post_list= [post.to_dict() for post in Post.query.all()]
        return make_response(post_list, 200)
    
    def post(self):
        data= request.get_json()

        body= data.get('body')
        user_id = data.get('user_id')
        book_id = data.get('book_id')

        post = Post(body = body, user_id = user_id, book_id = book_id)
        db.session.add(post)
        db.session.commit()
        
        return make_response(post.to_dict(), 201)

api.add_resource(Posts, '/posts')

class PostsByBookId(Resource):
    def get(self, book_id): 
        try:
            posts = Post.query.filter_by(book_id=book_id).all()

            posts_data = [
                {'id': post.id, 'body': post.body, 'user_id': post.user_id, 'book_id': post.book_id}
                for post in posts
            ]
            return {'posts': posts_data}
        except Exception as e:
            print(f"Error fetching posts by book ID: {e}")
            return {'error': 'Internal Server Error'}, 500

api.add_resource(PostsByBookId, '/posts/<int:book_id>')


class PostById(Resource):
        
    def delete(self, id):
        post = Post.query.get(id)
        if not post: return make_response({'error': "Post not found"}, 404)
        db.session.delete(post)
        db.session.commit()
        return make_response('', 204)

    def patch(self, id):
        post = Post.query.get(id)
        params= request.json
        if not post:
            return make_response({'error' : "Post not found"}, 404)
        for attr in params:
            try:
                setattr(post, attr, params[attr])
            except ValueError as validation_error:
                return make_response({'error' : str(validation_error)}, 422)
        db.session.commit()
        return make_response(post.to_dict(), 200)

api.add_resource(PostById, '/posts/<int:id>')


@app.route('/add_book_to_club/<int:user_id>/<int:club_id>', methods=['POST'])
# def add_book_to_club(user_id, book_id):
def add_book_to_club(user_id, club_id):
    try:
        user = User.query.get_or_404(user_id)
        club = BookClub.query.get_or_404(club_id)

        # Extract book information from the request
        book_data = request.get_json()

        # Create a new book instance and add it to the club
        new_book = Book(title=book_data['title'], author=book_data['author'], cover=book_data['cover'])
        club.books.append(new_book)

        db.session.commit()

        return jsonify({'message': 'Book added to the club successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/get_books_by_club/<int:club_id>', methods=['GET'])
def get_books_by_club(club_id):
    try:
        # Retrieve books for the specified club_id
        books = Book.query.filter_by(club_id=club_id).all()

        # Serialize the books
        serialized_books = [book.serialize() for book in books]

        return jsonify({'books': serialized_books}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500        




@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

