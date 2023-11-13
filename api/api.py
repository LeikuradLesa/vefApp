from flask import Flask, jsonify, request
import mysql.connector

app = Flask(__name__)

db_config = {
    "host" : "leikuradlesa.cxafacplwecg.eu-north-1.rds.amazonaws.com",
    "user" : "Admin",
    "password" : "LeikuradLesa12345",
    "database" : "LeikuradLesa"
}


def connectToDatebase():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as e:
        print("Error connecting to the database: " + e)
        return None

def errorHandling(error):
    if error.errno == 1146: return jsonify({'error': 'Table does not exist'}), 404
    else: return jsonify({'error': 'Internal Server Error'}), 500

def readTable(table: str):
    db = connectToDatebase()

    if db:
        cursor = db.cursor(dictionary=True)

        try:
            cursor.execute("SELECT * FROM " + table)
            result = cursor.fetchall()

            cursor.close()
            db.close()

            return jsonify(result)
        except mysql.connector.Error as error: return errorHandling(error)
    else: return jsonify({'error': 'Failed to connect to the database'}), 500

def insertTable(table: str, parameters: dict):
    db = connectToDatebase()

    if db:
        cursor = db.cursor()

        try:
            sqlParamStr = " " + str(tuple(parameters.keys())).replace("'", "")
            valuesStr = " VALUES (" + "%s, " * (len(parameters)-1) + "%s)"
            
            sql = "INSERT INTO " + table + sqlParamStr + valuesStr
            val = tuple(parameters.values())

            cursor.execute(sql, val)
            db.commit()

            cursor.close()
            db.close()
        except mysql.connector.Error as error: return errorHandling(error)
    else: return jsonify({'error': 'Failed to connect to the database'}), 500

def changeTable(table: str, parameters: dict):
    db = connectToDatebase()

    if db:
        cursor = db.cursor()

        try:
            where = parameters["where"]
            parameters.pop("where", None)

            for k, v in parameters.items():
                if type(v) == str: thingToChange = str(k) + " = '" + str(v) + "'"
                else: thingToChange = str(k) + " = " + str(v)
                sql = "UPDATE " + table + " SET " + thingToChange + " WHERE " + where

                cursor.execute(sql)
                db.commit()

            cursor.close()
            db.close()
        except mysql.connector.Error as error: return errorHandling(error)
    else: return jsonify({'error': 'Failed to connect to the database'}), 500

#Routing
@app.route("/read/<table>", methods=["GET"])
def read(table):
    return readTable(table)


@app.route("/add/<table>", methods=["GET", "POST"])
def insert(table):
    if request.method == "POST":
        data = dict(request.json)
        insertTable(table, data)
    else:
        parameters = request.args.to_dict()
        insertTable(table, parameters)

    return jsonify({'added to table': table})

@app.route("/change/<table>", methods=["GET", "POST"])
def change(table):
    if request.method == "POST":
        data = dict(request.json)
        changeTable(table, data)
    else:
        parameters = request.args.to_dict()
        changeTable(table, parameters)

    return jsonify({'changed things in table': table})


if __name__ == "__main__":
    app.run(debug=True)