from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="CbWMELm7e6F3Q6o",
    database="test"
)

cursor = db.cursor()


@app.route('/read', methods=['GET'])
def read():
    cursor.execute("SELECT * FROM Persons")
    myresult = cursor.fetchall()

    return jsonify(myresult)


@app.route('/insert', methods=['GET'])
def insert():
    sql = "INSERT INTO Persons (PersonID, LastName, FirstName, Address, City) VALUES (%s, %s, %s, %s, %s)"
    val = (125, "haarharhar", "ahhhh", "blololo street", "lololol City")
    cursor.execute(sql, val)

    db.commit()

    return "inserted"


if __name__ == "__main__":
    app.run(debug=True)