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



from bottle import run
import bottle
from admin import *
import admin

# set up the application path
# first the static file path 
# the second the api path
setup('', "http://10.10.10.196:8000")

bottle.debug(True)

# start the application
run(app, host='0.0.0.0', port=9000, reloader=False)
