from flask import Flask, request, render_template, send_file
from PIL import Image
import os

app = Flask(__name__)

