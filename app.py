from flask import Flask
from flask import render_template, request
import requests

app = Flask(__name__)

@app.route('/')
@app.route('/cardapio')
def home():
    return render_template('cardapio.html')

@app.route('/formulario')
def botao():
    return render_template('formulario.html')

if __name__ == '__main__':
    app.run(debug=True)
        

