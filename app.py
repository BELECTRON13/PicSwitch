from flask import Flask, request, render_template, send_file
from PIL import Image
import os

app = Flask(__name__)

os.makedirs('uploads', exist_ok=True)
os.makedirs('outputs', exist_ok=True)
