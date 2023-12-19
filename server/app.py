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

    # try:
    #     user = User.query.get_or_404(user_id)
    #     book = Book.query.get_or_404(book_id)

    #     # Check if the user is associated with a book club
    #     if user.bookclub is None:
    #         return jsonify({'error': 'User is not associated with a book club'}), 400

    #     # Check if the book is already associated with the user's club
    #     if book in user.bookclub.books:
    #         return jsonify({'error': 'Book is already in the user\'s club'}), 400

    #     club_book = ClubBook(month='January', )  # Adjust as needed
    #     club_book.book_id = book
    #     user.bookclub.books.append(book)

        
    #     # Add the book to the Books table
    #     db.session.add(book)

    #     # Commit changes to the database
    #     db.session.commit()

    #     return jsonify({'message': 'Book added to the user\'s club successfully'}), 200    

    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500
    


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



# class JoinBookClub(Resource):
#     def post(self, bookclub_id):
#         try:
#             # Ensure the user is authenticated
#             if 'user_id' not in session:
#                 return make_response({'error': 'User not authenticated'}, 401)

#             user_id = session['user_id']
#             user = User.query.get(user_id)

#             if not user:
#                 return make_response({'error': 'User not found'}, 404)

#             bookclub = BookClub.query.get(bookclub_id)

#             if not bookclub:
#                 return make_response({'error': 'Book Club not found'}, 404)

#             # Associate the book club with the user
#             user.bookclub = bookclub
#             db.session.commit()

#             return make_response({'message': 'User joined the book club successfully'}, 200)

#         except Exception as e:
#             return make_response({'error': str(e)}, 500)

# api.add_resource(JoinBookClub, '/join/bookclub/<int:bookclub_id>')






# @app.route('/add_book_to_club', methods=['POST'])
# def add_book_to_club():
#     try:
#         # Get data from the request
#         data = request.json
#         club_id = data.get('club_id')
#         book_id = data.get('book_id')
#         month = data.get('month')

#         # Check if the club and book exist
#         club = BookClub.query.get(club_id)
#         book = Book.query.get(book_id)

#         if not club or not book:
#             return jsonify({'error': 'Club or book not found'}), 404

#         # Create a new ClubBook instance
#         new_club_book = ClubBook(month=month, book=book, bookclub=club)

#         # Add the new club_book to the session and commit the changes to the database
#         db.session.add(new_club_book)
#         db.session.commit()

#         return jsonify({'message': 'Book added to club_books successfully'}), 201

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500








@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

