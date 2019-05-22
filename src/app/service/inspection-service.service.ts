import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectionSettings } from "./connectionSetting";


@Injectable({
  providedIn: 'root'
})
export class InspectionServiceService {

  constructor(public http: HttpClient) { }
//Code by Anju starts
  getTemplateName(empkey,Oid) {
    return this
    .http
    .get(ConnectionSettings.Url+'/getTemplatesNameFor_Mob?employeekey='+empkey+"&OrganizationID="+Oid);
  }

  getAuditorName(empkey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/supervisorname?employeekey='+empkey+"&OrganizationID="+Oid);
  }

  getBuildingName(empkey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/allfacility?empkey='+empkey+"&OrganizationID="+Oid);
  }

  getEmployeeName(empkey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/allemployees?empkey='+empkey+"&OrganizationID="+Oid);
  }

  getallFloorNames(facKey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/domainvaluesByKey?domain=facilityOnly&key='+facKey+'&OrganizationID='+Oid);
  }

  getallZones(facKey,flrKey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/zoneByFacility_Floor?fkey=' + facKey + "&floorkey=" + flrKey +"&OrganizationID="+Oid);
 
  }

  getroomTypefromfacility(facKey,flrKey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/roomtypeByFacility_Floor?fkey=' + facKey + "&floorkey=" + flrKey +"&OrganizationID="+Oid);
  }

  getroomfromfacility(facKey,flrKey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/roomByFacility_Floor?fkey='+ facKey + "&floorkey=" + flrKey +"&OrganizationID="+Oid);
  }

  getallRoomTypes(facKey,flrKey,zoneKey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/roomtypeByFacility_Floor_zone?fkey=' + facKey + '&floorkey=' + flrKey + '&zonekey=' + zoneKey +'&OrganizationID='+Oid);
  }
  
  getallRooms(fackey,flrKey,zonekey,roomtypekey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/roomByFacility_Floor_Zone_RoomType?fkey=' + fackey + '&floorkey=' + flrKey + '&zonekey=' + zonekey + '&roomtype=' + roomtypekey +'&OrganizationID='+Oid);
  }

  roomtypeByFacility_Floor_zone(fac_key, floor_key, zonekey,Oid) {
    return this
      .http
      // tslint:disable-next-line:whitespace
      // tslint:disable-next-line:max-line-length
      .get(ConnectionSettings.Url+'/roomtypeByFacility_Floor_zone?fkey=' + fac_key + '&floorkey=' + floor_key + ' &zonekey=' + zonekey + ' &OrganizationID= ' + Oid);
  }

  roomByFacility_Floor_zone(fac_key, floor_key, zonekey,Oid) {
    return this
      .http
      // tslint:disable-next-line:max-line-length
      .get(ConnectionSettings.Url+'/roomByFacility_Floor_zone?fkey=' + fac_key + '&floorkey=' + floor_key + '&zonekey=' + zonekey + '&OrganizationID=' + Oid);

  }

  roomtypeByFacility_Zone(fac_key,zonekey,Oid) {
    return this
      .http
      // tslint:disable-next-line:max-line-length
      .get(ConnectionSettings.Url+'/roomtypeByFacility_Zone?fkey=' + fac_key + '&zonekey=' + zonekey + '&OrganizationID=' + Oid);

  }

  roomByFacility_Zone(fac_key,zonekey,Oid)
  {
    return this
    .http
    // tslint:disable-next-line:max-line-length
    .get(ConnectionSettings.Url+'/roomByFacility_Zone?fkey=' + fac_key + "&zonekey=" + zonekey +"&OrganizationID="+Oid);

  }
  
  roomByFacility_Floor_Zone_RoomType(fac_key,floor,zone,roomtype,Oid)
  {
    return this
      .http
      // tslint:disable-next-line:max-line-length
      .get(ConnectionSettings.Url+'/roomByFacility_Floor_Zone_RoomType?fkey=' + fac_key + "&floorkey=" + floor + "&zonekey=" + zone + "&roomtype=" + roomtype +"&OrganizationID="+Oid);

  

  }
  roomByFacility_Floor_RoomType(fac_key,floor,roomtype,Oid)
  {

    return this
      .http
      // tslint:disable-next-line:max-line-length
      .get(ConnectionSettings.Url+'/roomByFacility_Floor_RoomType?fkey=' + fac_key + "&floorkey=" + floor + "&roomtype=" + roomtype +"&OrganizationID="+Oid);
  }

  roomByFacility_Zone_RoomType(fac_key,zone,roomtype,Oid)
  {
    return this
    .http
    // tslint:disable-next-line:max-line-length
    .get(ConnectionSettings.Url+'/roomByFacility_Zone_RoomType?fkey=' + fac_key + "&zonekey=" + zone + "&roomtype=" + roomtype +"&OrganizationID="+Oid);

  }

  roomByFacility_RoomType(fac_key,roomtype,Oid)
  {
    return this
    .http
    // tslint:disable-next-line:max-line-length
    .get(ConnectionSettings.Url+'/roomByFacility_RoomType?fkey='+ fac_key + "&roomtype=" + roomtype +"&OrganizationID="+Oid);

  }
  


  
  createInspectionOrder(InspectionOrder)
  {
   // debugger;
    const url=ConnectionSettings.Url+'/addInspectionOrderwithoutWorkorder';
    
    return this
      .http
      .post (url,InspectionOrder);
  }

  viewDashboardInspectionorder(to_date,empkey,Oid)
  {

    return this
    .http
    .get(ConnectionSettings.Url+'/getSupervisorInspectionView?to_date=' + to_date+'&employeekey='+empkey+'&OrganizationID='+Oid);
 
  }

  InspectionDetails(Insp_Key,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/getInspectionorder?InspectionorderKey=' + Insp_Key+"&OrganizationID="+Oid);
  }

  inspectionCompletedService(inspectionDetail1)
  {
    const url=ConnectionSettings.Url+'/InspectionCompleted';
    
    return this
      .http
      .post (url,inspectionDetail1).subscribe(res => console.log('Done'));
  }
  InspectionSaveService(inspectionDetail)
  {
    const url=ConnectionSettings.Url+'/saveinspectedQuestions';
    
    return this
      .http
      .post (url,inspectionDetail).subscribe(res => console.log('Done'));
  }

  templateQuestionService(templateId,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/getTemplateQuestions?templateId='+ templateId+"&OrganizationID="+Oid);
  }

  getEmailService(empkey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/getEmailIdByEmp?employeekey='+empkey +"&OrganizationID="+Oid);
  }

  getEmailInspectionService(Insp_Key,Oid)
  {
    
    return this
    .http
    .get(ConnectionSettings.Url+'/getInspectionDetailsForEmail?inspectionorderKey='+ Insp_Key+"&OrganizationID="+Oid);
  }

  getInspectionDetailsService(Insp_Key,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/getinspectionDetails?inspectionorder='+ Insp_Key+"&OrganizationID="+Oid);
 

  }

  //code by Anju End
}
