Topomancy LLC Gazetteer installation

Please consult wiki for more detailed information related to ElasticSearch etc

Install:
    python-pip
    python-virtualenv
    python-psycopg2
    postgresql-postgis-8.4
    postgresql-contrib-8.4
    apache2
    libapache2-mod-wsgi


Setup python virtualenv and install dependencies:
    cd gazetteer
    virtualenv .
    . bin/activate
    pip -E . install -r requirements.txt
    

Update Database:

python manage.py syncdb

If this is your first time doing this, you will be prompted to create a superuser for use when logging in for the first time.

Import Feature Codes:

Find this file in the data directory

python manage.py shell_plus
>>> FeatureCode.objects.all().delete()
>>> FeatureCode.import_from_csv("data/featureCodes_en.txt")

Import default origin data:

    python manage.py loaddata origins_nypl.json 
or
>   python manage.py loaddata origins_loc.json 


Build Javascript Files:
    Install NodeJS + r.js with:
        apt-get install nodejs
        apt-get install npm
        npm install requirejs

    Build JS files with:
        python manage.py build_js

    If you are using fabric to deploy, the build will be managed every time you deploy.


Develop:
    create gazetteer/local_settings.py by copying gazetteer/local_settings.py.sample and editing values for DATABASES and other settings that may differ on your local machine.

    create gazetteer/local_instance_settings.py by copying gazetteer/local_instance_settings.py.sample and editing as required to setup instance specific settings like the base url, default map position, etc.

    . bin/activate
    python manage.py shell

    python manage.py runserver

Note:

     You can run "python manage.py shell_plus" to get a more awesome
django shell with all your models auto-imported.

     You can run "python manage.py runserver_plus" to get better
tracebacks / debugging in the browser for errors. Niceness is you can
open up a python shell in the browser at any point in the trace-back
and get a live debug environment.

Deploy:
    create gazetteer/local_settings.py
    copy conf/apache2.conf to /etc/apache2/sites-available and edit it
    
    To copy static files and serve them correctly on the server:
        python manage.py collectstatic

ElasticSearch Scripts:
    Firstly, disable dynamic scripting:
        In config/elasticsearch.yml
        Add this line:
        script.disable_dynamic: true
    See the elasticsearch/scripts directory for scripts. These should be moved to the Elastisearch server. Scripts must be placed in the scripts directory inside the configuration directory (the directory where elasticsearch.yml is)
    The scripts are all short mvel scripts: sort-date-or-from.mvel  sort-date-or-to.mvel  sort-date-within-from.mvel  sort-date-within-to.mvel  sort-name.mvel  sort-uri.mvel
