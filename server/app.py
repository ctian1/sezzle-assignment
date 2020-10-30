
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from collections import deque
import os
import math

# import eventlet
# eventlet.monkey_patch()

app = Flask(__name__, static_url_path='')
app.config['SECRET_KEY'] = '#>tSMuw8!jmFRZ8p(\'zm$5rga#=k8m]b'
socketio = SocketIO(app, port=os.environ.get('PORT', 5000), cors_allowed_origins="*")

history = deque()

@app.route('/')
def index():
    # return "success"
    return app.send_static_file('index.html')

@socketio.on('connect')
def connect():
    emit('history', list(history))

@socketio.on('calculate')
def help(text):
    try:
        res = str(save_eval(text))
    except NameError as e:
        res = str(e)
    res = text + " = " + res
    emit('calculate', res, broadcast=True)
    history.append(res)
    if len(history) > 10:
        for i in range(len(history)-10):
            history.popleft()


ALLOWED_NAMES = {
    k: v for k, v in math.__dict__.items() if not k.startswith("__")
}

# still not very safe but good enough for this

def save_eval(input_string):
    try:
        if "__" in input_string:
            return 'Error'

        code = compile(input_string, "<string>", "eval")
        for name in code.co_names:
            if name not in ALLOWED_NAMES:
                # Step 4
                raise NameError(f"Use of {name} not allowed")
        return eval(code, {"__builtins__": {}}, ALLOWED_NAMES)
    except Exception as e:
        return e.__class__.__name__

if __name__ == '__main__':
    # app.run(debug=True, use_reloader=True, host='0.0.0.0', port=os.environ.get('PORT', 80))
    socketio.run(app, host='0.0.0.0', port=os.environ.get('PORT', 5000), log_output=True)