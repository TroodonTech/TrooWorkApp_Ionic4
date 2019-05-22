import { Component, OnInit } from '@angular/core';
import { InspectionServiceService } from '../../../service/inspection-service.service';
import { ActivatedRoute } from '@angular/router';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
//import { StarRatingModule } from 'ionic3-star-rating';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import {AlertController} from '@ionic/angular';
// import { ManagerTabMenuPage  } from '../../menu-tab/manager-tab-menu/manager-tab-menu.page';
import {  NavController, NavParams } from '@ionic/angular';
import {Location} from '@angular/common';


@Component({
  selector: 'app-view-star',
  templateUrl: './view-star.page.html',
  styleUrls: ['./view-star.page.scss'],
})
export class ViewStarPage implements OnInit {
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
  OrganizationID ;
  value;
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
             
  constructor(
   //public emailComposer: EmailComposer,
    public inspectionServiceService:InspectionServiceService,
     private route: ActivatedRoute,
     private router: Router,public alertController: AlertController,
     public Navctrl:NavController,
     private location: Location) {
    this.route.params.subscribe(params => this.inspKey$ = params.insKey);
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

    // this.employeekey= window.localStorage.getItem("employeekey");


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
            

     debugger;
          //   for(var i=0;i< this.TemplateDetails.length;i++){
          //     if (this.viewEmpInspectionDetails[0].ScoreName === '5 Star') {
          //       this.starIndexes5[i] = Array(5).fill(1).map((x, i) => i);
          //    }
          //    else if (this.viewEmpInspectionDetails[0].ScoreName === '3 Star') {
          //     this.starIndexes3[i] = Array(3).fill(1).map((x, i) => i);
          //    }
          //  }

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
              
              OrganizationID:this.OrganizationID ,
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
        //  window.location.reload();
        this.reloading();
          this.router.navigateByUrl('viewInspection');
           
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
                  EmployeeKey:this.toServeremployeekey,
                     
                };
                this.inspectionServiceService
              .inspectionCompletedService(this.inspectionDetail1)
              this.reloading();
              this.router.navigateByUrl('viewInspection');
               
              }

              //Email generation

              if(this.isMailRequired)
              {
                this.inspectionServiceService
                     .getEmailService(this.toServeremployeekey, this.OrganizationID)
                      .subscribe((data:any) => {
           // debugger;
                            this.email = data;
                      
                       this.EmailId=this.email[0].EmailId;

                       this.inspectionServiceService
                       .getEmailInspectionService(this.inspKey$,this. OrganizationID )
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
                          //to:      this.EmailId,
                          to: 'raimavarghese.troodon@outlook.com',
                          subject: 'Inspection By -'+this.inspectionEmail[0].InspectorName,
                          body:    emailBody                        


                         };

                        // this.emailComposer.open(email1);
                   }
                      
                  
                   this.presentAlert();

       }    
reloading()
{
  if( window.localStorage )
{
  if( !localStorage.getItem( 'firstLoad' ) )
  {
    localStorage[ 'firstLoad' ] = true;
    window.location.reload();
  }  

  else
    localStorage.removeItem( 'firstLoad' );
}
}
       GoBack() {
       
     // this.reloading();
    //  this.Navctrl.navigateRoot('/viewInspection');
    this.location.back();

//this.Navctrl.push(['viewInspection']);
      }
    
  

}
