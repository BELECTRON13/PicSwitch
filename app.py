from flask import Flask, request, render_template, send_file
from PIL import Image
import os

app = Flask(__name__)

os.makedirs('uploads', exist_ok=True)
os.makedirs('outputs', exist_ok=True)

@app.route('/')
def upload_form():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file and (file.filename.endswith('.jpg') or file.filename.endswith('.jpeg')):
        input_path = os.path.join('uploads', file.filename)
        file.save(input_path)
        