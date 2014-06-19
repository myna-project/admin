# Admin 

The application contain a gui for administration of myna.  

The gui is a bottle application and can started with the python script 
* admindev.py - start the api using the internal server of bottle 
* adminwsgi.py - wsgi version of script (tested on lighttpd)

Note: the adminwsgi.py must be mapped to http://<ip_address>/admin

## Requirements 

* Raspbian
* lighttpd
* python 2.7 

## Libraries 

The application uses the following libraries

* python-bottle 0.10.11 http://bottlepy.org/
* boostrap 3.0.3 http://getbootstrap.com
* jquery v2.0.3 http://jquery.org