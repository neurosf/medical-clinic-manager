from django.shortcuts import render 
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from django.http.response import JsonResponse 
from django.db.models import Q 
import os 
from datetime import datetime 
from django.utils import timezone 
from datetime import date

from .signals import delete_image_file 
from .models import * 
from .serializers import * 
from django.conf import settings 
from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from django.db.models import Max
from rest_framework import generics
from rest_framework import status
from rest_framework.generics import  ListCreateAPIView,RetrieveUpdateDestroyAPIView, RetrieveDestroyAPIView,ListAPIView
from rest_framework.views import APIView
from django.db.models import Sum,F
from datetime import timedelta
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

#Dossier
class DossierApi(APIView):
    def get(self, request, id=0):
        dossiers = Dossier.objects.all().order_by('DateD').reverse()
        serializer = DossierPlusSerializer(dossiers, many=True)
        return JsonResponse(serializer.data, safe=False)
    def post(self, request, id=0):
        data = JSONParser().parse(request)
        serializerPatient = PatientSerializer(data=data['Id_P'])
        if serializerPatient.is_valid():
            patient=serializerPatient.save()
            new_PatientSerializer = PatientSerializer(patient)
            data['Id_P'] = new_PatientSerializer.data['id']
            serializerDossier = DossierSerializer(data=data)
            if serializerDossier.is_valid():
                serializerDossier.save()
                return JsonResponse({"Msg":"Added Successfully","ID":new_PatientSerializer.data['id']})
        error_message = {
            "PatientErrors": serializerPatient.errors,
            "DossierErrors": serializerDossier.errors
        }
        return JsonResponse({"error": error_message}, status=400)
    def put(self, request, id=0):
        data = JSONParser().parse(request)
        dossier = Dossier.objects.get(id=data['id'])
        patient = Patient.objects.get(id=data['id'])

        serializerPatient = PatientSerializer(patient, data=data['Id_P'])
        data['Id_P']=data['Id_P']['id']
        print(data)
        serializerDossier = DossierSerializer(dossier, data=data)

        if serializerPatient.is_valid()&serializerDossier.is_valid():
            serializerPatient.save()
            serializerDossier.save()
            return JsonResponse("Updated Successfully", safe=False)
        error_message = {
            "PatientErrors": serializerPatient.errors,
            "DossierErrors": serializerDossier.errors
        }
        return JsonResponse({"error": error_message}, status=400)
    def delete(self, request, id=0):
        dossier = Dossier.objects.get(id=id)
        patient = Patient.objects.get(id=dossier.Id_P.id)
        dossier.delete()
        patient.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@api_view(['GET'])
def DossierGetApi(request,id=0):
    if request.method=='GET':
        Dossiers = Dossier.objects.filter(id=id)
        if len(Dossiers)>0:
            Serializer=DossierPlusSerializer(Dossiers,many=True)
            return JsonResponse({"data":Serializer.data[0],"found":True})
        else: return JsonResponse({"data":[],"found":False})
@api_view(['GET'])
def DossierMGetApi(request):
    if request.method=='GET':
        dossiers = Dossier.objects.all().order_by('DateD').reverse()
        serializer = DossierMSerializer(dossiers, many=True)
        return JsonResponse(serializer.data, safe=False)
    
class HabitudeApi(APIView):
    def get(self, request, id=0):
        habits = Habitude.objects.filter(Id_P=id)
        serializer = HabitudeSerializer(habits, many=True)
        return JsonResponse(serializer.data, safe=False)
    def post(self, request):
        data = JSONParser().parse(request)
        MsgResponde='Failed to Add'
        for obj_data in data:    
            serializer = HabitudeSerializer(data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponde= "Added Successfully"
        return JsonResponse(MsgResponde, safe=False)
    def delete(self, request, id=0):
        habit = Habitude.objects.filter(Id_P=id)
        habit.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def PatientGetApi(request,id=0):
    if request.method=='GET':
        Patients = Patient.objects.filter(NSS=id)
        if len(Patients)>0:
            Serializer=PatientSerializer(Patients,many=True)
            return JsonResponse({'VRF':True,'Data':Serializer.data},safe=False)
        else: return JsonResponse({'VRF':False,'Data':"Patient non exist"},safe=False)
    
#rendezvous
class rendezvousApi(APIView):
    def get(self, request, id=0, date=""):
        # Convertir la chaîne de caractères en objet datetime
        date_obj = datetime.strptime(date, "%Y-%m-%d").date()

        rendezvous_list = rendezvous.objects.filter(dateR__date=date_obj).order_by('dateR').reverse()
        serializer = rendezvousplusSerializer(rendezvous_list, many=True)
        return Response(serializer.data)

    def post(self, request, id=0):
        rendezvouss = rendezvous.objects.filter(Id_D_id=id).order_by('dateR').reverse()
        serializer = rendezvousSerializer(rendezvouss, many=True)
        return Response(serializer.data)
        
class RendezvousListCreateView(ListCreateAPIView):
    queryset = rendezvous.objects.all()
    serializer_class = rendezvousSerializer

class RendezvousRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = rendezvous.objects.all()
    serializer_class = rendezvousSerializer

@api_view(['GET'])
def Calender(request, date=""):
    if request.method == "GET":
        try:
            today = datetime.strptime(date, "%Y-%m-%d").date()
            nextWeek = today + timedelta(days=7)

            rendezvous_list = rendezvous.objects.filter(dateR__date__gt=today, dateR__date__lt=nextWeek).order_by('dateR').reverse()
            calender_week = [(str(today + timedelta(days=i)), [('{:02d}h-{:02d}h'.format(hour, hour + 1), []) for hour in range(24)]) for i in range(7)]

            rendezvous_list = rendezvous.objects.filter(dateR__date__gt=today, dateR__date__lt=nextWeek).order_by('dateR')

            for rdv in rendezvous_list:
                date_index = (rdv.dateR.date() - today).days
                if 0 <= date_index < 7:
                    time_slot = rdv.dateR.hour
                    calender_week[date_index][1][time_slot][1].append(rendezvousplusSerializer(rdv).data)

            return Response(calender_week)

        except ValueError:
            return Response({"error": "Invalid date format"}, status=status.HTTP_400_BAD_REQUEST)

#Alarm
class AlarmApi(APIView):
    def get(self, request, id=0):
        Alarms = Alarm.objects.filter(Id_P=id).order_by('date').reverse()
        Serializer=AlarmSerializer(Alarms,many=True)
        return Response(Serializer.data)
    
class AlarmListCreateView(ListCreateAPIView):
    queryset = Alarm.objects.all()
    serializer_class = AlarmSerializer

class AlarmRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Alarm.objects.all()
    serializer_class = AlarmSerializer

#Variable_de_suivie
class Variable_de_suivieApi(APIView):
    def get(self, request, id=0):
        Variable_de_suivies = Variable_de_suivie.objects.filter(idD=id).order_by('DateVar').reverse()
        Serializer=VariablePlus_de_suivieSerializer(Variable_de_suivies,many=True)
        return JsonResponse(Serializer.data,safe=False)
    
class Variable_de_suivieListCreateView(ListCreateAPIView):
    queryset = Variable_de_suivie.objects.all()
    serializer_class = Variable_de_suivieSerializer

class Variable_de_suivieRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Variable_de_suivie.objects.all()
    serializer_class = Variable_de_suivieSerializer

class VariableListCreateView(ListCreateAPIView):
    queryset = Variable.objects.all()
    serializer_class = VariableSerializer

class VariableRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Variable.objects.all()
    serializer_class = VariableSerializer

# Examen regulier
class ExamenRegulier_vaccinApi(APIView):
    def get(self, request, id=0):
        ExamenRegulier_vaccins = ExamenRegulier_vaccin.objects.filter(idD=id).order_by('Date_deb').reverse()
        Serializer=ExamenRegulier_vaccinPlusSerializer(ExamenRegulier_vaccins,many=True)
        return JsonResponse(Serializer.data,safe=False)
    
class ExamenRegulier_vaccinListCreateView(ListCreateAPIView):
    queryset = ExamenRegulier_vaccin.objects.all()
    serializer_class = ExamenRegulier_vaccinSerializer

class ExamenRegulier_vaccinRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = ExamenRegulier_vaccin.objects.all()
    serializer_class = ExamenRegulier_vaccinSerializer

class RappelApi(APIView):
    def get(self,request,id=0):
        patient_habitudes = Rappel.objects.all().order_by('Date').reverse()
        serializer = RappelSerializer(patient_habitudes, many=True)
        return JsonResponse(serializer.data, safe=False)
    def post(self,request,id=0):
        data = JSONParser().parse(request)
        Rappels = Rappel.objects.filter(Id_EXR=id)
        Rappels.delete() # delete all rappel
        for obj_data in data:# add rappel
            obj_data['Id_EXR']=id
            Rappelsserializer = RappelSerializer(data=obj_data)
            if Rappelsserializer.is_valid():
                Rappelsserializer.save()
            else : 
                return JsonResponse({"Errs":Rappelsserializer.errors}, safe=False)
        return JsonResponse({"Errs":"non"}, safe=False)
@csrf_exempt
def RappelGetApi(request):
    if request.method=='POST':
        data = JSONParser().parse(request)
        Rappels = Rappel.objects.filter(Id_EXR__in=data).order_by('Date').reverse()
        Serializer=RappelSerializer(Rappels,many=True)
        return JsonResponse(Serializer.data,safe=False)

class Ex_VaccListCreateView(ListCreateAPIView):
    queryset = Ex_Vacc.objects.all()
    serializer_class = Ex_VaccSerializer

class Ex_VaccRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Ex_Vacc.objects.all()
    serializer_class = Ex_VaccSerializer
# Antecedent 
class AntecedentApi(APIView):
    def get(self, request, id=0):
        Antecedents = Antecedent.objects.filter(idD=id).order_by('DateA').reverse()
        Serializer=AntecedentplusSerializer(Antecedents,many=True)
        return JsonResponse(Serializer.data,safe=False)
    
class AntecedentListCreateView(ListCreateAPIView):
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer

class AntecedentRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Antecedent.objects.all()
    serializer_class = AntecedentSerializer
# Consultation #######################################################
class ConsultationApi(APIView):
    def get(self, request, id=0):
        Consultations = Consultation.objects.filter(idD=id).order_by('DateC').reverse()
        Serializer=ConsultationplusSerializer(Consultations,many=True)
        return JsonResponse(Serializer.data,safe=False)

@api_view(['GET'])
def ConsultationGETApi(request, id=0):
    if request.method == 'GET':
        Consultations = Consultation.objects.get(id=id)
        Serializer=ConsultationplusSerializer(Consultations)
        return JsonResponse(Serializer.data,safe=False)
@api_view(['GET'])
def ConsultationGETAllApi(request):
    if request.method == 'GET':
        Consultations = Consultation.objects.all()
        Serializer=ConsultationplusSerializer(Consultations,many=True)
        return JsonResponse(Serializer.data,safe=False)
    
class ConsultationListCreateView(ListCreateAPIView):
    queryset = Consultation.objects.all().order_by('DateC').reverse()
    serializer_class = ConsultationSerializer

class ConsultationRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer

class Medicamment_consultationApi(APIView):
    def get(self, request, id=0):
        Medicamment_consultations = Medicamment_consultation.objects.filter(Idcons=id)
        Serializer=MedicammentPlus_consultationSerializer(Medicamment_consultations,many=True)
        return JsonResponse(Serializer.data,safe=False)
    def post(self, request, id=0):
        data = JSONParser().parse(request)
        MedS = Medicamment_consultation.objects.filter(Idcons=id)
        MedS.delete() # delete all Medicament
        for obj_data in data:# add medicament
            MedSserializer = Medicamment_consultationSerializer(data=obj_data)
            if MedSserializer.is_valid():
                MedSserializer.save()
            else : 
                return JsonResponse({"Errs":MedSserializer.errors}, safe=False)
        return JsonResponse({"Errs":"non"}, safe=False)

class TraitementApi(APIView):
    def get(self, request, id=0):
        Traitements = Traitement.objects.filter(Idcons=id)
        serializer = TraitementSerializer(Traitements, many=True)
        return JsonResponse(serializer.data, safe=False)
    def post(self, request, id=0):
        data = JSONParser().parse(request)
        Traitements = data.get('Traitement')
        serializer = TraitementSerializer(data=Traitements)
        if serializer.is_valid():
            Traitements=serializer.save() # add Traitement
            new_TraitementSerializer = TraitementSerializer(Traitements)
            MsgResponde='Failed to Add'
            for obj_data in data['Medicament']:# add medicament
                obj_data['Id_T'] = new_TraitementSerializer.data['id']
                serializer = Medicament_TraitementSerializer(data=obj_data)
                if serializer.is_valid():
                    serializer.save()
                    MsgResponde= "Added Successfully"
            return JsonResponse(serializer.errors, safe=False)
        return JsonResponse(serializer.errors, safe=False)
    def put(self, request, id=0):
        data = JSONParser().parse(request)
        Traitements = data.get('Traitement')
        traitement = Traitement.objects.get(id=Traitements['id'])
        serializer = TraitementSerializer(traitement, data=Traitements)
        if serializer.is_valid():
            serializer.save() # save Taitement
            MedT = Medicament_Traitement.objects.filter(Id_T=serializer.data['id'])
            MedT.delete() # delete all Medicament
            MsgResponde='Failed to Update'
            Medicaments = data.get('Medicament')
            for obj_data in Medicaments:# add medicament
                obj_data['Id_T'] = serializer.data['id']
                MedTserializer = Medicament_TraitementSerializer(data=obj_data)
                if MedTserializer.is_valid():
                    MedTserializer.save()
                MsgResponde= MedTserializer.errors
            return JsonResponse(MsgResponde, safe=False)
        return JsonResponse(serializer.errors,safe=False)
    def delete(self, request, id=0):
        traitement = Traitement.objects.get(id=id)
        traitement.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class Medicament_TraitementApi(APIView):
    def get(self, request, id=0):
        Medicament_Traitements = Medicament_Traitement.objects.filter(Id_T=id)
        Serializer=MedicamentPlus_TraitementSerializer(Medicament_Traitements,many=True)
        return JsonResponse(Serializer.data,safe=False)
    def delete(self, request, id=0):
        MedT = Medicament_Traitement.objects.get(id=id)
        MedT.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class ImageConsultationListCreateView(ListCreateAPIView):
    queryset = ImageConsultation.objects.all()
    serializer_class = ImageConsultationSerializer

class ImageConsultationRetrieveDeleteView(RetrieveDestroyAPIView):
    queryset = ImageConsultation.objects.all()
    serializer_class = ImageConsultationSerializer

    def perform_destroy(self, instance):
        # Call the signal handler to delete the associated image file
        delete_image_file(sender=ImageConsultation, instance=instance)

        # Perform the default destroy behavior (deleting the database record)
        instance.delete()

class ImageConsultationByConsultationAPIView(ListAPIView):
    serializer_class = ImageConsultationSerializer

    def get_queryset(self):
        consultation_id = self.kwargs['consultation_id']
        queryset = ImageConsultation.objects.filter(Idcons_id=consultation_id)
        return queryset
    
@api_view(['POST'])
def GetImagePatientApi(request, id=0):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        Img = ImageConsultation.objects.filter(Idcons__in=data).order_by('Idcons__DateC').reverse()
        serializer = ImageConsultationPlusSerializer(Img, many=True)
        return JsonResponse(serializer.data, safe=False)
###
class PathologieListCreateView(ListCreateAPIView):
    queryset = Pathologie.objects.all()
    serializer_class = PathologieSerializer

class PathologieRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Pathologie.objects.all()
    serializer_class = PathologieSerializer
# Examen
class exbiologiqueApi(APIView):
    def get(self, request, id=0):
        exbiologiques = exbiologique.objects.filter(IdD=id).order_by('date').reverse()
        Serializer=exbiologiqueSerializer(exbiologiques,many=True)
        return JsonResponse(Serializer.data,safe=False)
    
class exbiologiqueListCreateView(ListCreateAPIView):
    queryset = exbiologique.objects.all()
    serializer_class = exbiologiqueSerializer

class exbiologiqueRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = exbiologique.objects.all()
    serializer_class = exbiologiqueSerializer

class examenRadiologiqueApi(APIView):
    def get(self, request, id=0):
        examenRadiologiques = examenRadiologique.objects.filter(IdD=id).order_by('date').reverse()
        Serializer=examenPlusRadiologiqueSerializer(examenRadiologiques,many=True)
        return JsonResponse(Serializer.data,safe=False)
    
class examenRadiologiqueListCreateView(ListCreateAPIView):
    queryset = examenRadiologique.objects.all()
    serializer_class = examenRadiologiqueSerializer

class examenRadiologiqueRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = examenRadiologique.objects.all()
    serializer_class = examenRadiologiqueSerializer

class exradialogiqueListCreateView(ListCreateAPIView):
    queryset = exradialogique.objects.all()
    serializer_class = exradialogiqueSerializer

class exradialogiqueRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = exradialogique.objects.all()
    serializer_class = exradialogiqueSerializer 


# Stock
class Medicamment_StockApi(APIView):
    def get(self, request, id=0):
        Medicamment_Stocks = Medicamment_Stock.objects.filter(id=id).order_by('Dateperemption').reverse()
        Serializer=Medicamment_StockSerializer(Medicamment_Stocks,many=True)
        return JsonResponse(Serializer.data,safe=False)
    def post(self, request, id=0):
        data = JSONParser().parse(request)
        for item in data:
            medicament_id = item.get('id')
            quantite = item.get('Quantite')
            try:
                medicament = Medicamment_Stock.objects.get(id=medicament_id)
                medicament.Quantite += quantite
                medicament.save()
            except Medicamment_Stock.DoesNotExist:
                print("any whay")
                pass
        return JsonResponse("Quantities Updated Successfully", safe=False)
    
class Medicamment_StockListCreateView(ListCreateAPIView):
    queryset = Medicamment_Stock.objects.all().order_by('Dateperemption').reverse()
    serializer_class = Medicamment_StockSerializer

class Medicamment_StockRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Medicamment_Stock.objects.all()
    serializer_class = Medicamment_StockSerializer

# medicament 
class Medicament_gnrlListCreateView(ListCreateAPIView):
    queryset = Medicament_gnrl.objects.all()
    serializer_class = Medicament_gnrlSerializer

class Medicament_gnrlRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Medicament_gnrl.objects.all()
    serializer_class = Medicament_gnrlSerializer 

# medecin
class MedecinListCreateView(ListCreateAPIView):
    queryset = Medecin.objects.all()
    serializer_class = MedecinSerializer

class MedecinRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Medecin.objects.all()
    serializer_class = MedecinSerializer 

@csrf_exempt
def VRMedecinApi(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        medecin = Medecin.objects.filter(Q(UserName=data['UserName']) | Q(email=data['UserName']))
        if len(medecin)>0:
            if medecin[0].PassWord==data['PassWord']:
                Serializer=MedecinSerializer(medecin,many=True)
                return JsonResponse({'Msg':"User Found",'respond':1,"DATA":Serializer.data[0]})
            else :
                return JsonResponse({'Msg':"Password incorrect",'respond':0})
        else : return JsonResponse({"Msg":"Medecin not found","respond":-1})
    return JsonResponse({'Msg':"",'respond':-2})

"""@api_view(['POST'])
def VRMedecinApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        username = data.get('username', None)
        email = data.get('email', None)
        password = data.get('password', None)
        
        if username is not None and password is not None:
            medecin = authenticate(username=username, password=password)
            print(medecin)
            if medecin is not None:
                token, _ = Token.objects.get_or_create(user=medecin)
                return Response({'token': token.key, 'Msg': "", 'respond': 1, "DATA": {"email": medecin.email, "Nom": medecin.Nom, "Prenom": medecin.Prenom}})
            else:
                return JsonResponse({'Msg': "User or Password Invalid", 'respond': 0})
        else:
            return JsonResponse({'Msg': "Invalid request", 'respond': -1})
    else:
        return JsonResponse({'Msg': "Method not allowed", 'respond': -2})"""
# contact
class ContactListCreateView(ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class ContactRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer 

class MedecinContactListCreateView(ListCreateAPIView):
    queryset = MedecinContact.objects.all()
    serializer_class = MedecinContactSerializer

class MedecinContactRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = MedecinContact.objects.all()
    serializer_class = MedecinContactSerializer

# Salle
class SallePatientsListCreateView(ListCreateAPIView):
    queryset = SallePatients.objects.all()
    serializer_class = SallePatientsSerializer

class SallePatientsRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = SallePatients.objects.all()
    serializer_class = SallePatientsSerializer

@api_view(['GET', 'PUT'])
def salleApi(request, id=0, date=""):
    if request.method == 'GET':
        date_obj = datetime.strptime(date, "%Y-%m-%d").date()
        salleday, _ = SalleDay.objects.get_or_create(Date=date_obj)
        serializerSD = SalleDaySerializer(salleday)
        sallelist = SallePatients.objects.filter(Id_SD=salleday)
        serializer = SallePatientsSerializer(sallelist, many=True)
        return JsonResponse({"Salle": serializerSD.data, "SallePatients": serializer.data})
    elif request.method == 'PUT':
        try:
            salleday = SalleDay.objects.get(id=id)
        except SalleDay.DoesNotExist:
            return JsonResponse({"error": "SalleDay not found"}, status=status.HTTP_404_NOT_FOUND)
        data = JSONParser().parse(request)
        
        serializer = SalleDaySerializer(salleday, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET']) 
def patient_count(request,id): 
    male_patients_count = SallePatients.objects.filter(Id_SD=id, etat=False, Sexe='Homme').count() 
    all_patients_count = SallePatients.objects.filter(Id_SD=id, etat=False).count() 
    femal_patients_count = SallePatients.objects.filter(Id_SD=id, etat=False, Sexe='Femme').count() 
 
    max_tour_with_false_etat = SallePatients.objects.filter(Id_SD=id, etat=True).aggregate(max_tour=Max('Tour'))['max_tour'] 
 
    return Response({ 
        'male_patients_count': male_patients_count, 
        'all_patients_count': all_patients_count, 
        'femal_patients_count': femal_patients_count, 
        'max_tour_with_false_etat': max_tour_with_false_etat, 
    })

# Stat
@api_view(['GET'])
def statistics(request, date):
    current_date = timezone.now().date()
    empruntparjour = 0
    Prix_Totale_par_jour = 0
    Profit_par_un_jour = 0
    dossiercountmois = {
        'Janvier':0,
        'fevrier':0,
        'mars':0,
        'avril':0,
        'maie':0,
        'jouin':0,
        'juillet':0,
        'aout':0,
        'septembre':0,
        'octobre':0,
        'novembre':0,
        'decembre':0,
    }
    age_categories = {
        '0-10': 0,
        '11-20': 0,
        '21-30': 0,
        '31-40': 0,
        '41-50': 0,
        '51-60': 0,
        '61-70': 0,
        '71-80': 0,
        '81+':0,
    }
    sex_categories = {
        'Homme': 0,
        'Femme': 0,
    }
           # date_obj = datetime.strptime(date, "%Y-%m-%d").date()
    date_obj = datetime.strptime(date, "%Y-%m-%d")
    year = date_obj.year
    month = date_obj.month
    day = date_obj.day
    dossier_par_an = Dossier.objects.filter(DateD__year=year).count()
    dossier_par_mois = Dossier.objects.filter(DateD__month=month,DateD__day=day).count()
    dossier_par_jour = Dossier.objects.filter(DateD__day=day,DateD__month=month,DateD__year=year ).count()
    Patients = Patient.objects.filter().count()
    tousEmployes = Medecin.objects.filter().count()
    Medecins = Medecin.objects.filter(Type='Medecin').count()
    Employe = Medecin.objects.exclude(Type='Medecin').count()
    consultation_par_an = Consultation.objects.filter(DateC__year=year).count()
    consultation_par_mois = Consultation.objects.filter(DateC__month=month ,DateC__year=year).count()
    consultation_par_jour = Consultation.objects.filter(DateC__day=day,DateC__month=month,DateC__year=year).count()
    Profit_par_un_an =  Consultation.objects.filter(DateC__year=year).aggregate(profit=Sum('Prix_paye'))['profit'] 
    Profit_par_un_mois =  Consultation.objects.filter(DateC__month=month,DateC__year=year).aggregate(profit=Sum('Prix_paye'))['profit'] 
    Profit_par_un_jour =  Consultation.objects.filter(DateC__day=day,DateC__month=month,DateC__year=year).aggregate(profit=Sum('Prix_paye'))['profit'] 
    Prix_Totale_par_an = Consultation.objects.filter(DateC__year=year).aggregate(total=Sum('Prix_Totale'))['total'] 
    Prix_Totale_par_mois = Consultation.objects.filter(DateC__month=month,DateC__year=year).aggregate(total=Sum('Prix_Totale'))['total'] 
    Prix_Totale_par_jour = Consultation.objects.filter(DateC__day=day,DateC__month=month,DateC__year=year).aggregate(prt=Sum('Prix_Totale'))['prt'] 
    Prix_Totale_par_an=Prix_Totale_par_an or 0 
    Profit_par_un_an = Profit_par_un_an or 0
    empruntparans =  Prix_Totale_par_an -Profit_par_un_an 
    Prix_Totale_par_mois=Prix_Totale_par_mois or 0 
    Profit_par_un_mois = Profit_par_un_mois or 0
    empruntparmois = Prix_Totale_par_mois -Profit_par_un_mois
    Prix_Totale_par_jour= Prix_Totale_par_jour or 0
    Profit_par_un_jour=Profit_par_un_jour or 0
    empruntparjour = Prix_Totale_par_jour -Profit_par_un_jour
    Medecammentstock = Medicamment_Stock.objects.filter().aggregate(som=Sum('Quantite'))['som']
    Medecammentconsl =  Medicamment_consultation.objects.filter().aggregate(somme=Sum('Quantite'))['somme']
    patients = Patient.objects.all()
    total_medicamnetutilise = 0
    for patient in patients:
        age = current_date.year - patient.Date_naiss.year
        if age <= 10:
            age_categories['0-10'] += 1
        elif age <= 20:
            age_categories['11-20'] += 1
        elif age <= 30:
            age_categories['21-30'] += 1
        elif age <= 40:
            age_categories['31-40'] += 1
        elif age <= 50:
            age_categories['41-50'] += 1
        elif age <= 60:
            age_categories['51-60'] += 1
        elif age <= 70:
            age_categories['61-70'] += 1
        elif age <= 80:
            age_categories['71-80'] +=1
        else:
            age_categories['81+'] += 1
# Count patients based on sex
        sex = patient.Sexe.lower() if patient.Sexe else ''
        if sex == 'homme':
            sex_categories['Homme'] += 1
        else:
            sex_categories['Femme'] += 1
    prixtotalestock =  Medicamment_Stock.objects.filter().aggregate(tot=Sum('Prixachat'))['tot'] 
    do = Dossier.objects.filter(DateD__year=year)
    for d in do:
        if (d.DateD.month==1):
            dossiercountmois['Janvier'] += 1
        elif (d.DateD.month==2):
            dossiercountmois['fevrier'] += 1
        elif(d.DateD.month==3):
            dossiercountmois['mars'] +=1
        elif(d.DateD.month==4):
            dossiercountmois['avril'] += 1
        elif(d.DateD.month==5):
            dossiercountmois['maie'] += 1
        elif(d.DateD.month==6):
            dossiercountmois['jouin'] += 1
        elif(d.DateD.month==7):
            dossiercountmois['juillet'] += 1
        elif(d.DateD.month==8):
            dossiercountmois['aout'] += 1
        elif(d.DateD.month==9):
            dossiercountmois['septembre'] += 1
        elif(d.DateD.month==10):
            dossiercountmois['novembre'] += 1
        elif(d.DateD.month==11):
            dossiercountmois['octobre'] += 1
        elif(d.DateD.month==12):
            dossiercountmois['decembre'] += 1
    consultationsyear = Consultation.objects.filter(DateC__year=year,DateC=date)
    consultationsmonth = Consultation.objects.filter(DateC__month=month,DateC__year=year)
    consultationsjour = Consultation.objects.filter(DateC__day=day, DateC__month=month,DateC__year=year)



   # Calculate the total cost (price * quantity) of medications used for the current year
    total_cost_by_year = Medicamment_consultation.objects.filter(Idcons__in=consultationsyear).annotate(
        prix_achat_medication=F('id_m__Prixachat'),
        total_cost_for_consultation=F('Quantite') * F('id_m__Prixachat')
    ).aggregate(
        total_cost_by_year=Sum('total_cost_for_consultation')
    )['total_cost_by_year']
    # Calculate the total cost (price * quantity) of medications used for the current year
    total_cost_by_month = Medicamment_consultation.objects.filter(Idcons__in=consultationsmonth).annotate(
        prix_achat_medication=F('id_m__Prixachat'),
        total_cost_for_consultation=F('Quantite') * F('id_m__Prixachat')
    ).aggregate(
        total_cost_by_month=Sum('total_cost_for_consultation')
    )['total_cost_by_month']
      # Calculate the total cost (price * quantity) of medications used for the current year
    total_cost_by_day = Medicamment_consultation.objects.filter(Idcons__in=consultationsjour).annotate(
        prix_achat_medication=F('id_m__Prixachat'),
        total_cost_for_consultation=F('Quantite') * F('id_m__Prixachat')
    ).aggregate(
        total_cost_by_day=Sum('total_cost_for_consultation')
    )['total_cost_by_day']
    total_cost_by_year = total_cost_by_year or 0
    total_cost_by_month =total_cost_by_month or 0
    total_cost_by_day =total_cost_by_day or 0
    Beneficetotaleans = Profit_par_un_an-total_cost_by_year
    Beneficetotalemois = Profit_par_un_mois-total_cost_by_month
    Beneficetotalejour = Profit_par_un_jour-total_cost_by_day
    return Response({
        'dossier_par_an': dossier_par_an,
        'dossier_par_mois':dossier_par_mois,
        'dossier_par_jour':dossier_par_jour,
        'TousPatients':Patients,
        'tousemployemedeecinS':tousEmployes,
        'tousMedecins':Medecins,
        'Employe':Employe,
        'consultations_par_an':consultation_par_an,
        'consultation_par_mois':consultation_par_mois,
        'consultation_par_jour':consultation_par_jour,
        'dekhel_par_un_an' : Profit_par_un_an,
        'dekhle_par_mois':Profit_par_un_mois,
        'dekhel_par_jour':Profit_par_un_jour,
        'yessal_par_an' : empruntparans,
        'yessal_par_mois': empruntparmois ,
        'yessal_par_jour': empruntparjour,
        'Nombremedicamment':Medecammentstock,
        'NombreMedecammentconsl':Medecammentconsl,
        'age_categories': age_categories,
        'sex_categories': sex_categories,
        'prixtotalestock':prixtotalestock,
        'totalprixachatmedicammentutilise':total_cost_by_year,
        'totalprixachatmedicammentutiliseparmois':total_cost_by_month,
        'totalprixachatmedicammentutiliseparjour':total_cost_by_day,
        'beneficetotaleans':Beneficetotaleans,
        'beneficetotalemois':Beneficetotalemois,
        'beneficetotalejour':Beneficetotalejour,
        'dossiermois':dossiercountmois,

    })

# Home
@api_view(['GET']) 
def HomeGetApi(request,id=0):
    if request.method=='GET':
        today = date.today() 
        Dossiers = Dossier.objects.filter(DateD=today)
        SerializerDossiers=DossierPlusSerializer(Dossiers,many=True)
    
        rendezvous_list = rendezvous.objects.filter(dateR__date=today)
        Serializerrendezvous_list=rendezvousplusSerializer(rendezvous_list,many=True)

        consultationsjour = Consultation.objects.filter(DateC__date=today)
        MedicamentStock = Medicamment_consultation.objects.filter(Idcons__in=consultationsjour)
        
        SerializerMedicamentStock=MedicammentPlus_consultationSerializer(MedicamentStock,many=True)
 
        patientcount = Dossier.objects.all().count()
        Consultaioncount = Consultation.objects.all().count()
        current_month = today.month
        patientcount_month = Dossier.objects.filter(DateD__month=current_month).count()
        consultationcount_month = Consultation.objects.filter(DateC__month=current_month).count()

        return JsonResponse({
            "Dossiers":SerializerDossiers.data,
            "rendezvous_list":Serializerrendezvous_list.data,
            "MedicamentStock":SerializerMedicamentStock.data,
            "patientcount":patientcount,
            "Consultaioncount":Consultaioncount,
            "patientcount_month":patientcount_month,
            "consultationcount_month":consultationcount_month,
                             },safe=False)