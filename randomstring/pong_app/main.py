from flask import Flask, jsonify
import psycopg2
import os

app = Flask(__name__)

db_name = "postgres" # Assuming default database; update if different
db_user = os.getenv("DB_USER", "postgres")
db_password = os.getenv("DB_PASSWORD", "1234")
db_host = os.getenv("DB_HOST", "postgres-pingpong-svc")
db_port = os.getenv("DB_PORT", "5432")


def get_db_connection():
    conn = psycopg2.connect(
        dbname=db_name,
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port
    )
    return conn


def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    # Insert initial value if table is empty
    cur.execute('INSERT INTO counter (count) SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM counter);')
    conn.commit()
    cur.close()
    conn.close()


@app.route('/pingpong')
def pingpong():
    conn = get_db_connection()
    cur = conn.cursor()
    # Increment counter
    cur.execute('UPDATE counter SET count = count + 1 WHERE id = 1 RETURNING count;')
    count = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'counter': count})


if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5001)