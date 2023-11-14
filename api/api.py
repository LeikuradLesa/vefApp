from flask import Flask, jsonify, request
import mysql.connector
import math

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

def getData():
    if request.method == "POST": return dict(request.json)
    else: return request.args.to_dict()

def errorHandling(error):
    if error.errno == 1146: return jsonify({'error': 'Table does not exist'}), 404
    else: return jsonify({'error': 'Internal Server Error'}), 500

def readTable(table: str, parameters: dict = None):
    db = connectToDatebase()

    if db:
        try:
            #Count Pages
            pages = 0
            if "page" in parameters:
                cursorCount = db.cursor(buffered=True)

                sql = "SELECT * FROM " + table
                if "where" in parameters: sql += " WHERE " + parameters["where"]

                cursorCount.execute(sql)

                count = cursorCount.rowcount
                cursorCount.close()

                pages = math.ceil(count/parameters["amount"])

            #Info
            cursorInfo = db.cursor(dictionary=True)

            sql = "SELECT * FROM " + table
            if "where" in parameters: sql += " WHERE " + parameters["where"]
            if "order" in parameters: sql += " ORDER BY " + str(parameters["order"])
            if "page" in parameters: sql += " LIMIT " + str(parameters["page"]*parameters["amount"]) + "," + str(parameters["amount"])

            cursorInfo.execute(sql)
            info = cursorInfo.fetchall()

            cursorInfo.close()
            db.close()

            result = { "pages" : pages, "info" : info }
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

def deleteTable(table: str, where: str):
    db = connectToDatebase()

    if db:
        cursor = db.cursor()

        try:
            sql = "DELETE FROM " + table + " WHERE " + where

            cursor.execute(sql)
            db.commit()

            cursor.close()
            db.close()
        except mysql.connector.Error as error: return errorHandling(error)
    else: return jsonify({'error': 'Failed to connect to the database'}), 500

#Routing
@app.route("/read/<table>", methods=["GET", "POST"])
def read(table):
    data = getData()
    return readTable(table, data)

@app.route("/add/<table>", methods=["GET", "POST"])
def insert(table):
    data = getData()
    insertTable(table, data)

    return jsonify({'added to table': table})

@app.route("/change/<table>", methods=["GET", "POST"])
def change(table):
    data = getData()

    if "where" in data: changeTable(table, data)
    else: return jsonify({'needs where': "in json file"})

    return jsonify({'changed things in table': table})

@app.route("/delete/<table>", methods=["GET", "POST"])
def delete(table):
    data = getData()

    if "where" in data: deleteTable(table, data["where"])
    else: return jsonify({'needs where': "in json file"})

    return jsonify({'deleted things in table': table})

if __name__ == "__main__":
    app.run(debug=True)