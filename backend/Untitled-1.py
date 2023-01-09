
import base64
from http.client import OK, responses
import io
import json
import os
from urllib import request, response
from flask import Flask, render_template, request, url_for, redirect,flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy.ext.hybrid import hybrid_property
from flask_cors import CORS
from passlib.hash import sha256_crypt
from flask import jsonify
# %%
def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData

# %% [markdown]
# # handle database

# %%
def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        
        binaryData = file.read()
    return binaryData

#Login
def check_password_hash(password,pw):
         print(sha256_crypt.verify(password, pw))
         return sha256_crypt.verify(password, pw)


# #Define App




# Define a flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:root@localhost:3307/uok_demo"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False

CORS(app)
app.config['SESSION_TYPE'] = 'filesystem'

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'POST')
    return response

# %%
from sqlalchemy.dialects.mysql import LONGTEXT
db = SQLAlchemy(app)

class Student(db.Model ):
    _id = db.Column("id" , db.Integer , primary_key = True, autoincrement=True)
    firstName = db.Column(db.String(100))
    lastName = db.Column(db.String(100))
    age = db.Column(db.String(10))
    username = db.Column(db.String(100))
    password=db.Column(db.String(100))
    field=db.Column(db.String(100))
    technologies = db.Column(db.String(1000))
    degree  =db.Column(db.String(100))
    description = db.Column(db.String(2000))
    image = db.Column(db.LargeBinary(length=(2**25)-1))
   
    email = db.Column(db.String(255), unique=True)
 
    
    def obj_to_dict(self):  # for build json format
        return {
            "id":self._id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "age": self.age,
            "email": self.email,
            "username": self.username,
            "degree": self.degree,
            "technologies": self.technologies,
            "description": self.description,
            "field": self.field,
            "image": str(self.image),
            "password":str(self.password),
            "token":"token for access"
            
        }
        

    def __init__(self,firstName,lastName,age,username,email,password,field,Technologies,degree,description,image):
             self.firstName =firstName
             self.lastName = lastName
             self.age = age
             self.username = username
             self.email = email
             self.password = password
             self.field=field
             self.technologies = Technologies
             self.degree  =degree
             self.description = description
             self.image = image


import hashlib
@app.route("/add-user" ,methods=["POST" , "GET"])
def addStudent():
    if request.method == "POST":
        
        data = request.json
        print(data)
        firstName = data.get("firstName")
        lastName = data.get("lastName")
        age = data.get("age")
        username = data.get("username")
        email = data.get("email")
        field = data.get("field")
        technologies = data.get("technologies")
        degree = data.get("degree")
        description = data.get("description")
        image = data.get("image")
    
        password = data.get("password")

        image_64_decode = base64.b64decode(image)
     
        print(f"image : {image_64_decode}")
      
#pipinstall passlib
       


        h = sha256_crypt.encrypt(password)

        new_user = Student(firstName,lastName,age,username,email,h,field,technologies,degree,description,image_64_decode) ; 
        db.session.add(new_user)
        db.session.commit()
        print("Success")


    return {"success": True}

#pip3 install flask-login


#login check
# Login functions


# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = "login"

# from flask_login import LoginManager

# from flask_login import login_user, logout_user, login_required, current_user


# @login_manager.user_loader
def load_user(user_id):
    return Student.query.get(int(user_id))

def dict_helper(objlist):
    result2 = [objlist.obj_to_dict()]
    return result2


@app.route("/login" ,methods=["POST" , "GET","OPTIONS"])
def login():
    if request.method == "POST":     
        data = request.json
        
        username = data.get("username")
        password = data.get("password")

        student = Student.query.filter_by(username=username).first()
   
      
        
        if check_password_hash(password,student.password):
               print(password)

               dictStudent =  dict_helper(student)
               print(dictStudent)
               print(jsonify(dictStudent))
               return jsonify(dictStudent)
          

    return "fail"


# @app.route("/image-upload" ,methods=["POST" , "GET","OPTIONS"])
# def imageUpload():

#     if request.method == "POST":     
#         image = request.files[0]
#         basepath = ""
#         file_path = os.path.join(
#         basepath, image.filename)
#         image.save(file_path)
              
          

#     return "fail"


if __name__ == '__main__':
    db.create_all()
    app.run(host='0.0.0.0', port=8000, debug=True)







