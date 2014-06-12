#-------------------------------------------------------------------------------
# Copyright (c) 2014 Proxima Centauri srl <info@proxima-centauri.it>.
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the GNU Public License v3.0
# which accompanies this distribution, and is available at
# http://www.gnu.org/licenses/gpl.html
# 
# Contributors:
#     Proxima Centauri srl <info@proxima-centauri.it> - initial API and implementation
#-------------------------------------------------------------------------------
#!/usr/bin/python
# -*- coding: utf-8 -*-

from bottle import route, run, request, abort, static_file, template, default_app, hook, response
from datetime import date

import bottle
import json
import os
import time
import string
import random
from gzipper import Gzipper

root = os.path.dirname(os.path.abspath(__file__))

static_file_path = ''
api_path = ''

def setup(static_file_path_, api_path_):
    global static_file_path, api_path
    static_file_path = static_file_path_
    api_path = api_path_

def _render_template(name):
    global static_file_path, api_path
    return template(name, static_file_path=static_file_path, api_path=api_path)

@route("/")
def startGui():
    return _render_template('status.tpl.html')

@route("/rooms_config")
def startRoomsGui():
    return _render_template('rooms.tpl.html')

@route("/new_edit_room")
def startEditRoomGui():
    return _render_template('new-edit-room.tpl.html')
       
@route("/devices_config")
def startDevicesGui():
    return _render_template('devices.tpl.html')

@route("/new_edit_device")
def startEditDeviceGui():
    return _render_template('new-edit-device.tpl.html')

@route("/logics_config")
def startLogicsGui():
    return _render_template('logics.tpl.html')

@route("/new_edit_logic")
def startEditLogicGui():
    return _render_template('new-edit-logic.tpl.html')
  
@route("/system_config")
def startSystemConfigGui():
    return _render_template('config.tpl.html')

@route("/edit_config")
def startEditConfigGui():
    return _render_template('edit-config.tpl.html')

##############################################################
#  css, fonts, js files                                      #
############################################################## 

@route("/css/<filename>")
def cssfileget(filename):
    return static_file(filename, root=root + "/css/")

@route("/fonts/<filename>")
def fontsfileget(filename):
    return static_file(filename, root=root + "/fonts/")
 
@route("/js/<filename>")
def jsfileget(filename):
    return static_file(filename, root=root + "/js/")

APP_ROOT = root
bottle.TEMPLATE_PATH.append(os.path.join(APP_ROOT, 'templates'))
app = bottle.default_app()

app = Gzipper(bottle.default_app(), content_types=set(['text/plain', 'text/html', 'text/css',
'application/json', 'application/x-javascript', 'text/xml', 'application/javascript',
'application/xml', 'application/xml+rss', 'text/javascript',
'image/svg', 'image/svg+xml'])) 
