from django.urls import path
from .views  import * 

from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns=[
    #patient
    path('Api/patientGet/<str:id>/',PatientGetApi),

    #rendezvous
    path('Api/rendezvousGET/<str:date>/',rendezvousApi.as_view()),
    path('Api/rendezvousGET/<int:id>//',rendezvousApi.as_view()),
    path('Api/rendezvous/', RendezvousListCreateView.as_view(), name='Rendezvous-list-create'),
    path('Api/rendezvous/<int:pk>/', RendezvousRetrieveUpdateDeleteView.as_view(), name='Rendezvous-retrieve-update-delete'),
    path('Api/Calender/<str:date>/',Calender),
    #habitude
    path('Api/Habitude',HabitudeApi.as_view()),
    path('Api/Habitude/<int:id>',HabitudeApi.as_view()),

    #Alarm
    path('Api/AlarmGet/<int:id>',AlarmApi.as_view()), 
    path('Api/Alarm/', AlarmListCreateView.as_view(), name='Alarm-list-create'),
    path('Api/Alarm/<int:pk>/', AlarmRetrieveUpdateDeleteView.as_view(), name='Alarm-retrieve-update-delete'),

    #dossier
    path('Api/Dossier',DossierApi.as_view()),
    path('Api/Dossier/<int:id>',DossierApi.as_view()),
    path('Api/DossierGet/<int:id>',DossierGetApi),  
    path('Api/DossierM/',DossierMGetApi),

    #var de uisveie
    path('Api/Variable_de_suivieGet/<int:id>',Variable_de_suivieApi.as_view()), 
    path('Api/Variable_de_suivie/', Variable_de_suivieListCreateView.as_view(), name='Variable_de_suivie-list-create'),
    path('Api/Variable_de_suivie/<int:pk>/', Variable_de_suivieRetrieveUpdateDeleteView.as_view(), name='Variable_de_suivie-retrieve-update-delete'),
       
    #variable
    path('Api/Variable/', VariableListCreateView.as_view(), name='Variable-list-create'),
    path('Api/Variable/<int:pk>/', VariableRetrieveUpdateDeleteView.as_view(), name='Variable-retrieve-update-delete'),
  
    #examenregulier_vacc 
    path('Api/ExamenRegulier_vaccinGet/<int:id>',ExamenRegulier_vaccinApi.as_view()), 
    path('Api/ExamenRegulier_vaccin/', ExamenRegulier_vaccinListCreateView.as_view(), name='ExamenRegulier_vaccin-list-create'),
    path('Api/ExamenRegulier_vaccin/<int:pk>/', ExamenRegulier_vaccinRetrieveUpdateDeleteView.as_view(), name='ExamenRegulier_vaccin-retrieve-update-delete'),
       
    #ex_vacc 
    path('Api/Ex_Vacc/', Ex_VaccListCreateView.as_view(), name='Ex_Vacc-list-create'),
    path('Api/Ex_Vacc/<int:pk>/', Ex_VaccRetrieveUpdateDeleteView.as_view(), name='Ex_Vacc-retrieve-update-delete'),
  
    #antecendet
    path('Api/AntecedentGet/<int:id>',AntecedentApi.as_view()), 
    path('Api/Antecedent/', AntecedentListCreateView.as_view(), name='Antecedent-list-create'),
    path('Api/Antecedent/<int:pk>/', AntecedentRetrieveUpdateDeleteView.as_view(), name='Antecedent-retrieve-update-delete'),
        
    #consultation 
    path('Api/ConsultationGetAll/<int:id>',ConsultationApi.as_view()), 
    path('Api/ConsultationGet/<int:id>',ConsultationGETApi), 
    path('Api/ConsultationGetAll/',ConsultationGETAllApi), 
    path('Api/Consultation/', ConsultationListCreateView.as_view(), name='Consultation-list-create'),
    path('Api/Consultation/<int:pk>/', ConsultationRetrieveUpdateDeleteView.as_view(), name='Consultation-retrieve-update-delete'),
        
    # consultation Image 
    path('Api/image-consultations/', ImageConsultationListCreateView.as_view(), name='image-consultation-list-create'),
    path('Api/image-consultations/<int:pk>/', ImageConsultationRetrieveDeleteView.as_view(), name='image-consultation-retrieve-delete'),
    path('Api/consultation-images/<int:consultation_id>/', ImageConsultationByConsultationAPIView.as_view(), name='consultation-images'),
    path('Api/GetImagePatient', GetImagePatientApi),

    #pathologie
    path('Api/Pathologie/', PathologieListCreateView.as_view(), name='Pathologie-list-create'),
    path('Api/Pathologie/<int:pk>/', PathologieRetrieveUpdateDeleteView.as_view(), name='Pathologie-retrieve-update-delete'),
  
    #Medicamment_Stock
    path('Api/Medicamment_StockGet/<int:id>',Medicamment_StockApi.as_view()),
    path('Api/Medicamment_StockGet',Medicamment_StockApi.as_view()),  
    path('Api/Medicamment_Stock/', Medicamment_StockListCreateView.as_view(), name='Medicamment_Stock-list-create'),
    path('Api/Medicamment_Stock/<int:pk>/', Medicamment_StockRetrieveUpdateDeleteView.as_view(), name='Medicamment_Stock-retrieve-update-delete'),
        
    #medicammentgnrl
    path('Api/Medicammentgnrl/', Medicament_gnrlListCreateView.as_view(), name='medicament-list-create'),
    path('Api/Medicammentgnrl/<int:pk>/', Medicament_gnrlRetrieveUpdateDeleteView.as_view(), name='medicament-retrieve-update-delete'),


    path('Api/Contact/', ContactListCreateView.as_view(), name='Contact-list-create'),
    path('Api/Contact/<int:pk>/', ContactRetrieveUpdateDeleteView.as_view(), name='Contact-retrieve-update-delete'),
    #Medicamment_consultation
    path('Api/Medicamment_consultation',Medicamment_consultationApi.as_view()),
    path('Api/Medicamment_consultation/<int:id>',Medicamment_consultationApi.as_view()),
    #Medecin
    path('Api/Medecin/', MedecinListCreateView.as_view(), name='Medecin-list-create'),
    path('Api/Medecin/<int:pk>/', MedecinRetrieveUpdateDeleteView.as_view(), name='Medecin-retrieve-update-delete'),
    path('Api/MedecinVrefie', VRMedecinApi ), 
    #MedecinContact
    path('Api/MedecinContact/', MedecinContactListCreateView.as_view(), name='MedecinContact-list-create'),
    path('Api/MedecinContact/<int:pk>/', MedecinContactRetrieveUpdateDeleteView.as_view(), name='MedecinContact-retrieve-update-delete'), 
    #Traitement
    path('Api/Traitement',TraitementApi.as_view()),
    path('Api/Traitement/<int:id>',TraitementApi.as_view()),
    #Medicament_Traitement
    path('Api/Medicament_Traitement/<int:id>',Medicament_TraitementApi.as_view()),
    #exbiologique
    path('Api/exbiologiqueGet/<int:id>',exbiologiqueApi.as_view()), 
    path('Api/exbiologique/', exbiologiqueListCreateView.as_view(), name='exbiologique-list-create'),
    path('Api/exbiologique/<int:pk>/', exbiologiqueRetrieveUpdateDeleteView.as_view(), name='exbiologique-retrieve-update-delete'),
        
    #examenRadiologique
    path('Api/examenRadiologiqueGet/<int:id>',examenRadiologiqueApi.as_view()), 
    path('Api/examenRadiologique/', examenRadiologiqueListCreateView.as_view(), name='examenRadiologique-list-create'),
    path('Api/examenRadiologique/<int:pk>/', examenRadiologiqueRetrieveUpdateDeleteView.as_view(), name='examenRadiologique-retrieve-update-delete'),
        
    #exradialogique
    path('Api/exradialogique/', exradialogiqueListCreateView.as_view(), name='exradialogique-list-create'),
    path('Api/exradialogique/<int:pk>/', exradialogiqueRetrieveUpdateDeleteView.as_view(), name='exradialogique-retrieve-update-delete'),

    #Rappel
    path('Api/Rappel',RappelApi.as_view()),
    path('Api/Rappel/<int:id>',RappelApi.as_view()),
    path('Api/RappelGet',RappelGetApi),
    #salle
    path('Api/Salle/', SallePatientsListCreateView.as_view(), name='Salle-list-create'),
    path('Api/Salle/<int:pk>/', SallePatientsRetrieveUpdateDeleteView.as_view(), name='Salle-retrieve-update-delete'),
    path('Api/sallecount/<int:id>/',patient_count),
    path('Api/salle/<str:date>/',salleApi),
    path('Api/salleday/<int:id>/',salleApi),
    #statistics
    path('Api/statistics/<str:date>/',statistics),
    #Home
    path('Api/HomeInfo',HomeGetApi),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)