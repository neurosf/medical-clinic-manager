from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('Login', views.main, name='main'),
    path('Medicale', views.main, name='main'),
    path('Medicament', views.main, name='main'),
    path('Pathologies', views.main, name='main'),
    path('ExamenR', views.main, name='main'),
    path('ExamenRad', views.main, name='main'),
    path('VariablesPhy', views.main, name='main'),
    path('Patient', views.main, name='main'),
    path('Patient/<int:id>', views.main, name='main'),
    path('Consultation', views.main, name='main'),
    path('Consultation/<int:id>', views.main, name='main'),
    path('Facture', views.main, name='main'),
    path('Salleattente', views.main, name='main'),
    path('Rendezvous', views.main, name='main'),
    path('Stock', views.main, name='main'),
    path('Contacts', views.main, name='main'),
    path('Medecin', views.main, name='main'),
    path('Profile', views.main, name='main'),
    path('MedicaleCertificate', views.main, name='main'),
    path('Statistiques', views.main, name='main'),
]