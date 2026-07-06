from rest_framework import serializers
from .models import *

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
class PatientMSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('id','NSS','Nom','Sexe','NomJF','Prenom')

class rendezvousSerializer(serializers.ModelSerializer):
    class Meta:
        model = rendezvous
        fields = '__all__'
        
class AlarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alarm
        fields = '__all__'

class HabitudeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitude
        fields = '__all__'

class DossierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dossier
        fields = '__all__'
# Dossier plus Patient
class DossierPlusSerializer(serializers.ModelSerializer):
    Id_P=PatientSerializer()
    class Meta:
        model = Dossier
        fields = '__all__'
class DossierMSerializer(serializers.ModelSerializer):
    Id_P=PatientMSerializer()
    class Meta:
        model = Dossier
        fields = '__all__'
class Variable_de_suivieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variable_de_suivie
        fields = '__all__'

class VariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variable
        fields = '__all__'

class ExamenRegulier_vaccinSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenRegulier_vaccin
        fields = '__all__'

class Ex_VaccSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ex_Vacc
        fields = '__all__'

class AntecedentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Antecedent
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'

class PathologieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pathologie
        fields = '__all__'

class Medicamment_StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamment_Stock
        fields = '__all__'

class Medicament_gnrlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament_gnrl
        fields = '__all__'

class MedecinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medecin
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class Medicamment_consultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicamment_consultation
        fields = '__all__'

class MedecinContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedecinContact
        fields = '__all__'

class TraitementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Traitement
        fields = '__all__'

class Medicament_TraitementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament_Traitement
        fields = '__all__'

class exbiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = exbiologique
        fields = '__all__'

class examenRadiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = examenRadiologique
        fields = '__all__'

class exradialogiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = exradialogique
        fields = '__all__'

class RappelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rappel
        fields = '__all__'

#plus Pathologie
class AntecedentplusSerializer(serializers.ModelSerializer):
    id_path=PathologieSerializer()
    class Meta:
        model = Antecedent
        fields = '__all__'
#min patient
class PatientMoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ('NSS','Nom','Prenom','Sexe','Date_naiss','id')
class DossierPMoinSerializer(serializers.ModelSerializer):
    Id_P = PatientMoinSerializer()
    class Meta:
        model = Dossier
        fields = '__all__'
#plus Pathologie & Dossier
class ConsultationplusSerializer(serializers.ModelSerializer):
    idD = DossierPMoinSerializer()
    motif = PathologieSerializer()
    Diagnostique = PathologieSerializer()
    class Meta:
        model = Consultation
        fields = '__all__'
#Plus Radio
class examenPlusRadiologiqueSerializer(serializers.ModelSerializer):
    Idex=exradialogiqueSerializer()
    class Meta:
        model = examenRadiologique
        fields = '__all__'
#Plus Medicament 
class MedicamentPlus_TraitementSerializer(serializers.ModelSerializer):
    IdMed=Medicament_gnrlSerializer()
    class Meta:
        model = Medicament_Traitement
        fields = '__all__'
#Plus Medicament 
class MedicammentPlus_consultationSerializer(serializers.ModelSerializer):
    id_m=Medicamment_StockSerializer()
    class Meta:
        model = Medicamment_consultation
        fields = '__all__'
#Plus Var 
class VariablePlus_de_suivieSerializer(serializers.ModelSerializer):
    id_v=VariableSerializer()
    class Meta:
        model = Variable_de_suivie
        fields = '__all__'
#Plus Examen Vaccin 
class ExamenRegulier_vaccinPlusSerializer(serializers.ModelSerializer):
    id_x=Ex_VaccSerializer()
    class Meta:
        model = ExamenRegulier_vaccin
        fields = '__all__'


class SallePatientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SallePatients
        fields = '__all__'
class SalleDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = SalleDay
        fields = '__all__'
class rendezvousplusSerializer(serializers.ModelSerializer):
    Id_D=DossierPMoinSerializer()
    class Meta:
        model = rendezvous
        fields = '__all__'

class ImageConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageConsultation
        fields = '__all__'

class ConsultationMoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ('id','DateC')

class ImageConsultationPlusSerializer(serializers.ModelSerializer):
    Idcons = ConsultationMoinSerializer()
    class Meta:
        model = ImageConsultation
        fields = '__all__'