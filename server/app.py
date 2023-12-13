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


    # def put(self):
    #     # Assuming you have a user_id in the request data
    #     data = request.get_json()
    #     user_id = data.get('user_id')
    #     user = User.query.get(user_id)

    #     if not user:
    #         return make_response({'error': 'User not found'}, 404)

    #     # Assuming you also have a bookclub_id in the request data
    #     bookclub_id = data.get('bookclub_id')
    #     bookclub = BookClub.query.get(bookclub_id)

    #     if not bookclub:
    #         return make_response({'error': 'Book club not found'}, 404)

    #     # Associate the user with the book club
    #     user.bookclub = bookclub
    #     db.session.commit()

    #     return make_response({'message': 'User joined the book club successfully'}, 200)

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

@app.route('/users', methods= ['PUT'])
def join_book_club():
    data = request.get_json()

    user_id = data.get('user_id')
    bookclub_id = data.get('bookclub_id')

    user = User.query.get(user_id)
    user.bookclub_id = bookclub_id

    db.session.commit()

    return jsonify({'message': 'User joined the book club successfully'}), 200


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
















@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

