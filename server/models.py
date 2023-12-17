from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash', '-bookclubs.user.bookclub', '-created_at', '-updated_at', '-bookclub.users' )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable = False)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    role = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
    bookclub_id = db.Column(db.Integer, db.ForeignKey('bookclubs.id'))

    bookclub = db.relationship('BookClub', back_populates= 'users')
    # posts = db.relationship('Post', back_populates='users')  '-bookclubs.users',



    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, plain_text_password):
        byte_object = plain_text_password.encode('utf-8')
        encrypted_password_object = bcrypt.generate_password_hash(byte_object)
        hashed_password_string = encrypted_password_object.decode('utf-8') 
        self._password_hash = hashed_password_string

    def authenticate(self, password_string):
        byte_object = password_string.encode('utf-8')
        return bcrypt.check_password_hash(self.password_hash, byte_object)
    


class BookClub(db.Model, SerializerMixin):
    __tablename__ = 'bookclubs'

    serialize_rules = ()



    id = db.Column(db.Integer, primary_key= True)
    club_name = db.Column(db.String)
    picture = db.Column(db.String)

    users = db.relationship('User', back_populates= 'bookclub', cascade= 'all, delete-orphan')
    # books = db.Relationship('Book', secondary ='club_books', back_populates = "bookclubs")
    # books = association_proxy('club_books', 'books')
    # club_books = db.relationship('ClubBook', back_populates = 'bookclub', cascade = 'all,delete-orphan')


# class Book(db.Model, SerializerMixin):
#     __tablename__ = 'books'

#     # serialize_rules = ('-club_books.bookclub.users', '-club_books.bookclub.club_books.users')

#     id = db.Column(db.Integer, primary_key= True)
#     title = db.Column(db.String, unique= True, nullable= False)
#     author = db.Column(db.String)
#     cover = db.Column(db.String)


    # club_id = db.Column(db.Integer, db.ForeignKey ('bookclubs.id'))

    # bookclubs = association_proxy('club_books', 'bookclubs')
    # bookclubs = db.relationship('BookClub', secondary= 'club_books', back_populates = 'books')
    # club_books = db.relationship('ClubBook', back_populates='book', cascade = 'all,delete-orphan')
#     posts = db.relationship('Book', back_populates ='books')

    


# class ClubBook(db.Model, SerializerMixin): 
#     __tablename__ = 'club_books'

#     serialize_rules = ('-book.club_books', '-bookclub.users', '-bookclub.club_books', '-bookclub.club_books.users')

#     id = db.Column(db.Integer, primary_key=True)
#     month = db.Column(db.String)
#     club_id = db.Column(db.Integer, db.ForeignKey('bookclubs.id', ondelete='cascade'))
#     book_id = db.Column(db.Integer, db.ForeignKey('books.id', ondelete='cascade'))

#     book = db.relationship('Book', back_populates = 'club_books')
#     bookclub = db.relationship('BookClub', back_populates= 'club_books')
    

# class Post(db.Model, SerializerMixin):
#     __tablename__ = 'posts'


#     id = db.Column(db.Integer, primary_key=True)
#     title= db.Column(db.String)
#     body = db.Column(db.Text)
#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     type = db.Column(db.String)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     book_id = db.Column(db.Integer, db.ForeignKey('books.id'))

#     user= db.relationship('User', back_populates='posts')
#     book= db.relationship('Book', back_populates='posts')
