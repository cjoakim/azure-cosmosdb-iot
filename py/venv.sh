#!/bin/bash

# Recreate the virtual environment and reinstall libs.
# Chris Joakim, 2018/10/04

# brew upgrade python3

echo 'deleting previous venv...'
rm -rf bin/
rm -rf lib/
rm -rf include/
rm -rf man/

echo 'creating new venv...'
python3 -m venv .
source bin/activate
python --version

echo 'installing/upgrading libs...'
pip install --upgrade pip-tools
pip install --upgrade arrow
pip install --upgrade azure
pip install --upgrade azure-eventhub
pip install --upgrade docopt

echo 'pip freeze...'
pip freeze > requirements.txt

# echo 'pip install from requirements.txt...'
# pip install -r requirements.txt

echo 'done'
