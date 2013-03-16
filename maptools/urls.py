from django.conf import settings 
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic.base import RedirectView

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'maptools.views.index', name='index'),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    url(r'^favicon\.ico$', RedirectView.as_view(url='/static/favicon.ico')),
)

# Serve static files when debug false
if not settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {
        	'document_root': settings.STATIC_ROOT}
        ),
    )