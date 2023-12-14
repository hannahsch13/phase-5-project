#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource
from datetime import datetime
# Local imports
from config import db, api, app
# Add your model imports
from models import User
from models import BookClub
from models import Book

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
        club = BookClub(club_name=data['club_name'], picture=data['picture'])
        db.session.add(club)
        db.session.commit()
        # session['user_id'] = user.id
        return make_response(club.to_dict(), 201 )

api.add_resource(BookClubs, '/clubs')  


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
                        'members': [{'id': member.id, 'name': member.name, 'username': member.username} for member in user.bookclub.users]
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











@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

