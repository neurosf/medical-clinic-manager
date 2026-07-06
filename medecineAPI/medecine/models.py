from django.db import models
from django.contrib.auth.models import AbstractUser

class Patient (models.Model):

    NSS = models.CharField(max_length=50,blank=True)
    Nom = models.CharField(max_length=50)
    NomJF = models.CharField(max_length=50,blank=True)
    Prenom = models.CharField(max_length=50)
    Sexe = models.CharField(max_length=10)
    SF = models.CharField(max_length=50)
    Date_naiss= models.DateField()
    Lieu = models.CharField(max_length=100,blank=True)
    Adresse = models.CharField(max_length=50,blank=True)
    Ville = models.CharField(max_length=50,blank=True)
    Telephone =  models.CharField(max_length=15,blank=True)
    Profession = models.CharField(max_length=50,blank=True)
    Nivdinst = models.CharField(max_length=50,blank=True)
    GrSanguin =   models.CharField(max_length=5,blank=True)
    Nbreenfants = models.IntegerField()
    deg_dincapacite = models.CharField(max_length=50,blank=True)
    nbre_grosseuses = models.IntegerField()

class Dossier(models.Model):

    DateD = models.DateField()
    Id_P = models.ForeignKey("Patient",on_delete=models.CASCADE,default=0)

class rendezvous(models.Model):
 
    Comment = models.CharField(max_length=100,blank=True)
    dateR = models.DateTimeField()
    Id_D = models.ForeignKey("Dossier",on_delete=models.CASCADE,default=0)

class Habitude(models.Model):

    habitude = models.IntegerField()  
    Id_P = models.ForeignKey("Patient",on_delete=models.CASCADE,default=0)

class Alarm(models.Model):
    description = models.CharField(max_length=100)
    date = models.DateField(null=True)  ####################################
    Id_P = models.ForeignKey("Patient",on_delete=models.CASCADE,default=0)


class Variable_de_suivie(models.Model):

    DateVar = models.DateField()
    Importance = models.CharField(max_length=50)
    Valeur = models.CharField(max_length=50)
    Commentaire = models.CharField(max_length=100,blank=True)
    idD= models.ForeignKey("Dossier",on_delete=models.CASCADE,default=0)
    id_v= models.ForeignKey("Variable",on_delete=models.CASCADE,default=0)

class Variable(models.Model):

    Nom_v = models.CharField(max_length=50)

class ExamenRegulier_vaccin(models.Model):

    Date_deb = models.DateField()
    occurance = models.IntegerField(default=0)
    idD= models.ForeignKey("Dossier",on_delete=models.CASCADE,default=0)
    id_x= models.ForeignKey("Ex_Vacc",on_delete=models.SET_DEFAULT,default=0)

class Rappel (models.Model):

    Num_Rappel = models.IntegerField()
    Date = models.DateTimeField()
    Id_EXR = models.ForeignKey("ExamenRegulier_vaccin",on_delete=models.CASCADE,default=0)

class Ex_Vacc(models.Model):

    NomX = models.CharField(max_length=50)
    NbreRappel = models.PositiveIntegerField(default=0)
    type = models.CharField(max_length=50,default=" ")


class Antecedent (models.Model):

    familiale = models.CharField(max_length=50)
    DateA =models.DateField()
    ImportanceA = models.CharField(max_length=60)
    CommentaireA = models.CharField(max_length=80,blank=True)
    idD= models.ForeignKey("Dossier",on_delete=models.CASCADE,default=0)
    id_path= models.ForeignKey("Pathologie",on_delete=models.SET_DEFAULT,default=0)

class Consultation(models.Model):

    DateC = models.DateTimeField()
    cr_rapideM = models.CharField(max_length=50)
    ImportanceC = models.CharField(max_length=50)
    cr_rapideD = models.CharField(max_length=50)
    CommentaireC = models.CharField(max_length=80,blank=True)
    Prix = models.FloatField(default=0)
    Prix_paye = models.FloatField(default=0)
    Prix_Totale = models.FloatField(default=0)
    idD= models.ForeignKey("Dossier",on_delete=models.CASCADE,default=0)
    motif = models.ForeignKey("Pathologie",on_delete=models.SET_DEFAULT,default=0)
    Diagnostique = models.ForeignKey("Pathologie",on_delete=models.SET_DEFAULT,default=0,related_name="consultations_diagnostique")

class Pathologie(models.Model):

    Nom_path = models.CharField(max_length=50)

class Medicamment_Stock(models.Model):

    Nom_med = models.CharField(max_length=50)
    Seuil=models.IntegerField()
    Quantite = models.IntegerField()
    Prixachat = models.FloatField()
    Prixvente = models.FloatField()
    Dateperemption = models.DateField()
    Description = models.CharField(max_length=50,blank=True)
    categorie = models.CharField(max_length=50,blank=True)
    type = models.CharField(max_length=50,default=" ",blank=True)
    code = models.CharField(max_length=50,default=" ")

class Medicament_gnrl(models.Model):

    Nom = models.CharField(max_length=50)
    Description = models.CharField(max_length=50,blank=True)
    categorie = models.CharField(max_length=50,blank=True)
    type = models.CharField(max_length=50,default=" ",blank=True)
    code = models.CharField(max_length=50,default=" ")
    
class Medicamment_consultation(models.Model):
    
    id_m = models.ForeignKey("Medicamment_Stock",on_delete=models.CASCADE,default=0)
    Idcons = models.ForeignKey("Consultation",on_delete=models.CASCADE,default=0)
    Quantite = models.IntegerField(default=0)
    Prix = models.FloatField(default=0)

class Medecin(models.Model):
    
    UserName=models.CharField( max_length=50,default="")
    PassWord = models.CharField(max_length=100,default="")
    email = models.EmailField(unique=True)
    Nom = models.CharField(max_length=50)
    Prenom = models.CharField(max_length=50)
    Ntel = models.CharField(max_length=15)
    Type = models.CharField(max_length=20)

"""class Medecin(AbstractUser):
    # Additional fields
    Nom = models.CharField(max_length=50)
    Prenom = models.CharField(max_length=50)
    Ntel = models.CharField(max_length=15)
    Type = models.CharField(max_length=20)

    # Set email as the unique identifier for authentication
    USERNAME_FIELD = 'email'
    # Include 'username' in the required fields for user creation
    REQUIRED_FIELDS = ['username']

    # Add unique related_name for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='medecin_set',
        related_query_name='medecin',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='medecin_set',
        related_query_name='medecin',
        blank=True,
        help_text='Specific permissions for this user.',
    )

    def __str__(self):
        return self.email"""

class Contact(models.Model):

    NomContact =models.CharField(max_length=50)
    Ntel = models.CharField(max_length=15)
    email = models.EmailField()
    
class MedecinContact(models.Model):
    id_contact= models.ForeignKey("Contact",on_delete=models.CASCADE,default=0)
    UserName= models.ForeignKey("Medecin",on_delete=models.CASCADE,default=0)

class Traitement(models.Model):
    date = models.DateField()
    Idcons = models.ForeignKey("Consultation",on_delete=models.CASCADE,default=0)

class Medicament_Traitement(models.Model):
    description = models.CharField(max_length=100,blank=True)
    Id_T = models.ForeignKey("Traitement",on_delete=models.CASCADE,default=0)
    IdMed = models.ForeignKey("Medicament_gnrl",on_delete=models.CASCADE,default=0)

class exbiologique(models.Model):
    date = models.DateField()
    titre = models.CharField(max_length=50)
    Importance = models.CharField(max_length=50)
    resultat = models.BooleanField()
    dateres = models.CharField(max_length=50,blank=True)
    Commentaire= models.CharField(max_length=50,blank=True)
    IdD = models.ForeignKey("Dossier",on_delete=models.CASCADE,default=0)

class examenRadiologique(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField(null=True)
    Commentaire= models.CharField(max_length=50,blank=True)
    Idex = models.ForeignKey("exradialogique",on_delete=models.CASCADE,default=0)
    IdD = models.ForeignKey("Dossier",on_delete=models.CASCADE,default=0)

class exradialogique(models.Model):
    Nom = models.CharField(max_length=50)

class SallePatients (models.Model):

    Nom = models.CharField(max_length=50)
    Prenom = models.CharField(max_length=50)
    Sexe= models.CharField(max_length=10)
    Tour = models.IntegerField(default=0)
    etat = models.BooleanField(default=False)
    Id_SD = models.ForeignKey("SalleDay",on_delete=models.CASCADE,default=0)

class SalleDay (models.Model):

    Date = models.DateField(unique=True)
    Current =  models.IntegerField(default=0)  

class ImageConsultation(models.Model):

    image = models.ImageField(upload_to='cons/')
    Idcons = models.ForeignKey("Consultation",on_delete=models.CASCADE,default=0)
