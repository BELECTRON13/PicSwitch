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

        img = Image.open(input_path)
        output_filename = os.path.splitext(file.filename)[0] + 'png'
        output_path = os.path.join('outputs', output_filename)
        img.save(output_path, 'PNG')

        return render_template('result.html', output_filename=output_filename)
    return 'Invalid file format. Please upload a JPEG/JPG file.'

@app.route('/download/<filename>')
def download_file(filename):
    return send_file(os.path.join('outputs', filename), as_attachment=True)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port='8080', debug=True)