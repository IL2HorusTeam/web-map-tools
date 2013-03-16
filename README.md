Horus map tools
===============

Before running server setup next environment variables:

* HORUS_WEB_MAP_TOOLS_DJANGO_DEBUG
* HORUS_WEB_MAP_TOOLS_DJANGO_DATABASE_URL
* HORUS_WEB_MAP_TOOLS_DJANGO_SECRET_KEY

For example,

    export HORUS_WEB_MAP_TOOLS_DJANGO_DEBUG="True"
    export HORUS_WEB_MAP_TOOLS_DJANGO_DATABASE_URL="postgres://login:password@localhost/horus-map-tools"
    export HORUS_WEB_MAP_TOOLS_DJANGO_SECRET_KEY="some_top_secret_key"
    
Leave the value of the DEBUG variable empty, if you want to disable debugging:

    export HORUS_WEB_MAP_TOOLS_DJANGO_DEBUG="" # disables debug
    
Install dependencies:

    pip install -r requirements.txt

Synchronize your database (during this action superuser will be created):

    ./manage.py syncdb

Collect static files:

    ./manage.py collectstatic

Run server:

    ./manage.py runserver
