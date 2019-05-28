import { Component, OnInit ,forwardRef, Input} from '@angular/core';
import { InspectionServiceService } from '../../../../service/inspection-service.service';
import { ActivatedRoute } from '@angular/router';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Router } from '@angular/router';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
//import { Ionic2RatingModule } from "ionic2-rating";
import {AlertController} from '@ionic/angular';

import { IonicRatingModule } from 'ionic4-rating';
import {EventEmitter ,Output} from "@angular/core";
import {Location} from '@angular/common';

import { Camera,CameraOptions } from '@ionic-native/camera/ngx';

import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ConnectionSettings } from "../../../../service/connectionSetting";
import { LoadingController } from '@ionic/angular';

const noop = () => {
};

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IonicRatingModule),
  multi: true
};
enum COLORS{

  GREY="#E0E0E0",
  GREEN="#76FF03",
  YELLOW="#FFCA28",
  RED="#DD2C00"

}
@Component({
  selector: 'app-inspection-supervisor-view-detail',
  templateUrl: './inspection-supervisor-view-detail.page.html',
  styleUrls: ['./inspection-supervisor-view-detail.page.scss'],
})
export class InspectionSupervisorViewDetailPage implements OnInit {

  @Input() rating=[] ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();


  viewEmpInspectionDetails;
  inspKey$;
  names;
  temp_id;
  inspectionDetail;
  inspectionDetail1;
  ScoreName;
  TemplateQuestionID;
  questionsCount;
  val;
  Notes;
  Temp_templateId;
  ind=0;
  TemplateDetails;
  lastIndexValue;
  inspectionCompletion;
  isMailRequired;
  email;
  emailinsp;
  EmailId;
  inspectionEmail;
  toServeremployeekey;
  OrganizationID;
  //InspectionOrderKey;
  value;

  uploadflag;
 base64Image
 capturedimagePath;
 imageName;
 uploadPhoto;

  constructor(
    // public emailComposer: EmailComposer,
     private location: Location,
     public inspectionServiceService:InspectionServiceService,
      private route: ActivatedRoute,
      private router: Router,
      public alertController: AlertController,
      public loadCtrl: LoadingController,
       private transfer: FileTransfer, 
       private camera: Camera, 
       private base64: Base64,
       private DomSanitizer: DomSanitizer,
      ) {
     this.route.params.subscribe(params => this.inspKey$ = params.insKey);
    }
  rate(index: number,i) {
    // function used to change the value of our rating 
    // triggered when user, clicks a star to change the rating
 // debugger;
  


    this.rating[i]=index;
    this.value=this.rating[i];
    
   //this.ratingChange.emit(index);
    
 }
 
getColor(index: number,i) {
    /* function to return the color of a star based on what
     index it is. All stars greater than the index are assigned
     a grey color , while those equal or less than the rating are
     assigned a color depending on the rating. Using the following criteria:
  
          1-2 stars: red
          3 stars  : yellow
          4-5 stars: green 
    */
   if(this.isAboveRating(index,i))
   {
     return COLORS.GREY;
   }
   switch(this.rating[i])
   {
     case 1:
     case 2:
        

      case 3:
        
        case 4:
        case 5:
          return COLORS.YELLOW;
      default:
        return COLORS.GREY;
   }
  }

isAboveRating(index: number,i): boolean {
  // returns whether or not the selected index is above ,the current rating
  // function is called from the getColor function.

  //return index>this.rating;
  return index>this.rating[i];
  

}


  url_base64_decode(str) {
    var output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
  }

  

convert_DT(str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}

 arrayUnique(array){
  var a = array.concat();
  for(var i=0; i<a.length; ++i){
      for(var j=i+1; j<a.length; ++j){
          if(a[i] === a[j]){
              a.splice(j--,1);
          }
      }
  }
  return a;
};

lastIndex(array,val){
// debugger;
var a =[];
a= array;
var b=val;
var z =null;
for(var i=0;i<a.length;i++){
    if(b == a[i])
        z=i;
}
return z;
}
Scoringtype = {ratingValue:[],inspectionNotes:[],rating_yn:[]};
        
          templateQuestionvalues = {};
          today_DT = this.convert_DT(new Date());
          count = 0;
          saveInspection= {};
           //this.questionsCount=0;
           


 async presentAlert() {
  const alert = await this.alertController.create({
    header: '',
    subHeader: '',
    message: 'Inspection Submitted Successfully',
    buttons: ['OK']
  });

  await alert.present();
}

ngOnInit() {

  var token = localStorage.getItem('token');
  localStorage['token'] = token;
  var encodedProfile = token.split('.')[1];
  var profile = JSON.parse(this.url_base64_decode(encodedProfile));

  this.toServeremployeekey=profile.employeekey;
  this.OrganizationID = profile.OrganizationID;

  this.inspectionServiceService.InspectionDetails(this.inspKey$, this.OrganizationID).subscribe((data: any[]) => {
    this.viewEmpInspectionDetails = data;
    this.val=data;
    if(this.viewEmpInspectionDetails[0].ScoreName === 'Yes/No')
    {
     // debugger;
      this.names = ['Yes', 'No'];
     this.ScoreName=this.viewEmpInspectionDetails[0].ScoreName;
    }
    else if(this.viewEmpInspectionDetails[0].ScoreName === 'Pass/Fail')
    {
     // debugger;
      this.names= ['Fail','N/A'];
      this.ScoreName=this.viewEmpInspectionDetails[0].ScoreName;
    }
     this.Temp_templateId=this.viewEmpInspectionDetails[0].TemplateID;
    this.inspectionServiceService
        .templateQuestionService(this.viewEmpInspectionDetails[0].TemplateID, this.OrganizationID).subscribe((data: any[]) => {
          this.TemplateDetails=data;
          this.questionsCount=this.TemplateDetails.length;

        });
});

//this.createStarIndexes();
}




saveRatings(TemplateQuestionID,ScoreName)
{

debugger;
if(ScoreName === 'Yes/No' || ScoreName==='Pass/Fail'){
  // console.log($scope.Scoringtype);
  var length = Object.keys(this.Scoringtype.rating_yn).length;
  var arrayLength = this.Scoringtype.rating_yn.length;
  var value =this.Scoringtype.rating_yn[arrayLength - 1];
  this.Scoringtype.ratingValue.push({rating:value,questionID:TemplateQuestionID});
}
// else{
//   this.Scoringtype.ratingValue.push({rating:this.rating,questionID:TemplateQuestionID});
// }

else if (ScoreName === '5 Star') {
this.Scoringtype.ratingValue.push({rating: this.value, questionID: TemplateQuestionID});
}
else if (ScoreName === '3 Star') {
this.Scoringtype.ratingValue.push({rating: this.value, questionID: TemplateQuestionID});
}
console.log(this.Scoringtype);
}

//this.value=0;
inspectionCompleted(TemplateQuestionID,templateId)
{
//debugger;
var temp=[];
 var choices1 = [];
choices1[0] = this.Scoringtype;
 console.log(choices1);
              // console.log("qstn length "+$scope.questionsCount);
 var totalQuestions = this.questionsCount;
var indexObj = [];
var ratingIndexlist = [];
 var noteIndexList = [];
  var questionidList =[];
  if(this.ScoreName === 'Yes/No'||this.ScoreName === 'Pass/Fail')
  {
    for (var j = 0; j < this.val.length; j++) 
    {
            temp.push("" + this.val[j].TemplateQuestionID);
   }
   ratingIndexlist = Object.keys(this.Scoringtype.rating_yn);
   noteIndexList = Object.keys(this.Scoringtype.inspectionNotes);
    questionidList = this.arrayUnique(ratingIndexlist.concat(temp));
   // console.log(questionidList);
 }
 else
 {
    noteIndexList = Object.keys(this.Scoringtype.inspectionNotes);
    indexObj = this.Scoringtype.ratingValue;
    if(indexObj)
    {
       for(var j = 0; j<indexObj.length; j++)
        {
          // if(indexObj[j].rating == 0)
           ratingIndexlist.push(""+indexObj[j].questionID);
        }
    }
  // console.log("We go the notes in index "+noteIndexList+" and value "+$scope.Scoringtype.inspectionNotes[noteIndexList]);
    questionidList = this.arrayUnique(noteIndexList.concat(ratingIndexlist));
  // console.log(questionidList);
    }

  if (questionidList.length === totalQuestions && this.ScoreName === 'Pass/Fail')
   {
      var questionValues = "Pass";
      var starRating = null;
      var notes = null;
      var questionid = null;
      var i = 0;
      var j = 0;
      var k = 0;      
      
        for (var i = i; i < questionidList.length; i++) 
        {// includes actual qn ids
          questionValues = "Pass";
          notes = null;
          questionid = questionidList[i];
          for (j = 0; j < noteIndexList.length; j++)
           {
              if (noteIndexList[j] === questionid)
               {
                  notes =this.Scoringtype.inspectionNotes[questionid];
                 // console.log("Aneesh got note inside if as " + notes + " " + questionid + " " + " questionidList" + questionidList.length + $scope.Scoringtype.inspectionNotes);
                  break;
              }

            }

            for (var k = 0; k < ratingIndexlist.length; k++) 
            {
             // var lastIndexValue =any;
              if (ratingIndexlist[k] === questionid) 
              {
                 this.lastIndexValue = this.lastIndex(ratingIndexlist, questionidList[i]);
                   console.log("last indexfor "+ratingIndexlist[k] +" is " + this.lastIndexValue);

                  if (this.lastIndexValue !== null) 
                  {
                      questionValues = this.Scoringtype.ratingValue[this.lastIndexValue].rating;
                  } else
                   {
                      questionValues = "Pass";
                }
                  break;
              }
         }
          
          this.inspectionDetail=
          {
            
            OrganizationID:this.OrganizationID,
            inspectionkey:this.inspKey$,

            employeekey:this.toServeremployeekey,
            inspectionnotes:notes,
            templateQstnValues:questionValues,
            templateid:this.Temp_templateId,
            questionid:questionid
 
          };
         // debugger;
          this.inspectionServiceService
.InspectionSaveService(this.inspectionDetail)

//   var alertPopup = $ionicPopup.alert({
//     title: 'Inspection',
// template: 'Inspection Submitted Successfully!'
// });

     }
  this.inspectionDetail1=
          {
            OrganizationID:this.OrganizationID,
            
            InspectionorderKey:this.inspKey$,
            EmployeeKey:this.toServeremployeekey
               
          };
          this.inspectionServiceService
        .inspectionCompletedService(this.inspectionDetail1)

        
        this.router.navigateByUrl('supervisor-menu/inspection-supervisor-view');
         
        }
        else if (questionidList.length === totalQuestions && this.ScoreName !== 'Pass/Fail')
        {
           questionValues = null;
           var starRating = null;
            var notes = null;
           var questionid = null;
            var i=0;
            var j=0;
           var k=0;

            //debugger;
            for( i=i; i<questionidList.length; i++)
            {// includes actual qn ids
               questionValues = null;
                notes = null;
                questionid = questionidList[i];
                for(j=0; j<noteIndexList.length; j++)
                {
                    if(noteIndexList[j] === questionid)
                    {
                     notes = this.Scoringtype.inspectionNotes[questionid];
                     // console.log("Aneesh got note inside if as "+notes+" "+questionid+" "+" questionidList"+questionidList.length+$scope.Scoringtype.inspectionNotes);
                     break;
                   }
                 }
              for(k=0; k<ratingIndexlist.length; k++)
              {
                 this. lastIndexValue =0;
                  if(ratingIndexlist[k] === questionid)
                    {
                    this. lastIndexValue =this.lastIndex(ratingIndexlist,questionidList[i]);
                     // console.log("last indexfor "+ratingIndexlist[k] +" is " + lastIndexValue);
                     var x= this.lastIndexValue.length - ratingIndexlist.length;
                     if(this.lastIndexValue != null)
                     {
                      questionValues = this.Scoringtype.ratingValue[this.lastIndexValue].rating;
                     } 
                     else
                     {
                      questionValues = null;
                     }
                      break;
                  }
              }
             
              this.inspectionDetail=
              {
                OrganizationID:this.OrganizationID,
                inspectionkey:this.inspKey$,
    
                employeekey:this.toServeremployeekey,
                inspectionnotes:notes,
                templateQstnValues:questionValues,
                templateid:this.Temp_templateId,
                questionid:questionid
     
     
              };
             // debugger;
              this.inspectionServiceService
    .InspectionSaveService(this.inspectionDetail)
  
  //   var alertPopup = $ionicPopup.alert({
  //     title: 'Inspection',
  // template: 'Inspection Submitted Successfully!'
  // });
  
         }
      this.inspectionDetail1=
              {
                OrganizationID:this.OrganizationID,
            
                InspectionorderKey:this.inspKey$,
                EmployeeKey:this.toServeremployeekey
                   
              };
              this.inspectionServiceService
            .inspectionCompletedService(this.inspectionDetail1)
            this.router.navigateByUrl('supervisor-menu/inspection-supervisor-view');
             
            }

            //Email generation

            // if(this.isMailRequired)
            // {
              this.inspectionServiceService
                   .getEmailService( this.toServeremployeekey,this.OrganizationID)
                    .subscribe((data:any) => {
         // debugger;
                          this.email = data;
                    
                     this.EmailId=this.email[0].EmailId;

                     this.inspectionServiceService
                     .getEmailInspectionService(this.inspKey$,this.OrganizationID)
                      .subscribe((data:any) => {
          //debugger;
                            this.emailinsp = data;
                       });

                      });

                       this.inspectionEmail=this.emailinsp;

                       var emailBody;

                       emailBody='<b>'+this.inspectionEmail[0].TemplateName+'</b>'+'('+this.inspectionEmail[0].ScoreName+')'+'<br>'

                       for(var i=0;i<this.emailinsp.length;i++)
                       {
                        emailBody=emailBody+this.inspectionEmail[i].Question+' : '+this.inspectionEmail[i].Value+'<br>';

                       }

                       let email1={
                        to:      this.EmailId,
                        subject: 'Inspection By -'+this.inspectionEmail[0].InspectorName,
                        body:    emailBody                        


                       };

                     // this.emailComposer.open(email1);
                //  }
                    
                
                 this.presentAlert();

     }    

     GoBack() {
      //this.router.navigateByUrl('inspectionSupervisor_View');
      this.location.back();
    }
 
    capture(){

      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        // targetWidth: 1000,
        // targetHeight: 1000,
        correctOrientation:true
      };
      this.uploadflag=true;
      this.camera.getPicture(options).then((imageData) => {
        // this.base64.encodeFile(imageData).then((base64File: string) => {
        //   this.base64Image=base64File;
        //   this.capturedimagePath=imageData;
        //   this.imageName=imageData.substr(imageData.lastIndexOf('/') + 1)
        //   console.log("base64File "+base64File+" path "+this.DomSanitizer.bypassSecurityTrustUrl(this.base64Image));
        // }, (err) => {
        //     console.log(err);
        //   });
        this.capturedimagePath=imageData;
        this.imageName=imageData.substr(imageData.lastIndexOf('/') + 1)
      }, (err) => {
          alert("error "+JSON.stringify(err))
          });   
    }


    async presentLoadingWithOptions() {

      const loading = await this.loadCtrl.create({
        // spinner: 'hide',
       // duration: 5000,
        message: 'Uploading...Please Wait',
        translucent: true, 
        cssClass: 'custom-class custom-loading'
      });
      var FileName= this.capturedimagePath.substr(this.capturedimagePath.lastIndexOf('/') + 1);
      const fileTransfer: FileTransferObject = this.transfer.create();
      console.log("FileName "+FileName+" capturedimagePath "+this.capturedimagePath);
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName:FileName
      }
      loading.present();
      fileTransfer.upload(this.capturedimagePath, ConnectionSettings.Url+'/uploadImageFromSmallDevices_Inspection', options)
        .then((data) => {
          this.inspectionServiceService.InspectionPhotoUpload(this.inspKey$,this.toServeremployeekey,FileName,this.OrganizationID).subscribe((data:any[])=>{
            loading.dismiss();
            alert("Image Uploaded Successfully");
          });
        });
  
    }

}



