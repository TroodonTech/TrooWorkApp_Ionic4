import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectionSettings} from "./connectionSetting";
import { HTTP } from '@ionic-native/http/ngx';
@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  constructor(public http: HttpClient,private httppost: HTTP) { }

  GetWorkorderType(empkey,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/allWorkordertype?empkey=' + empkey + '&OrganizationID=' + Oid);
  }
  getBuilding(empkey,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/allfacility?empkey=' + empkey + '&OrganizationID=' + Oid);
  }
  getFloor(fac_key,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/domainvaluesByKey?domain='
        + 'facilityOnly' + '&key=' + fac_key + '&OrganizationID=' + Oid);
  }
  getEquipmentBuildFloor(fac_key, floor_key,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/getEquipmentBuildFloor?FacilityKey='
        + fac_key + '&FloorKey=' + floor_key + '&OrganizationID=' + Oid);
  }
  zoneByFacility_Floor(fac_key, floor_key,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/zoneByFacility_Floor?fkey=' + fac_key + '&floorkey=' + floor_key + '&OrganizationID=' + Oid);
  }
  roomtypeByFacility_Floor(fac_key, floor_key,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/roomtypeByFacility_Floor?fkey=' + fac_key + '&floorkey=' + floor_key + '&OrganizationID=' + Oid);
  }
  roomByFacility_Floor(fac_key, floor_key,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/roomByFacility_Floor?fkey=' + fac_key + '&floorkey=' + floor_key + '&OrganizationID=' + Oid);
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
  roomByFacility_Zone(fac_key,  zonekey,Oid) {
    return this
      .http
      // tslint:disable-next-line:max-line-length
      .get(ConnectionSettings.Url+'/roomByFacility_Zone?fkey=' + fac_key + '&zonekey=' + zonekey + '&OrganizationID=' + Oid);

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
  priorityList(Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/allpriority?OrganizationID=' + Oid);

  }
  allemployees(empkey,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/allemployees?empkey=' + empkey + '&OrganizationID=' + Oid);
  }
  addWorkOrderWithOutEqup(obj) {
    const url = ConnectionSettings.Url+'/addNewWorkorder';
    return this
      .httppost
      .post(url, obj,{});
  }
  addWorkOrderEqup(obj) {
    const url = ConnectionSettings.Url+'/addworkorderwithEquipment';
    return this
      .httppost
      .post(url, obj,{});
  }
  addQuickWorkOrder(obj) {
    const url = ConnectionSettings.Url+'/addQuickworkorder';
    const obj1 = obj;
    return this
      .httppost
      .post(url, obj1,{});
  }
  viewDashboardWorkorder(today_DT, empkey, OrganizationID) {
    return this
      .http
      // tslint:disable-next-line:max-line-length
      .get(ConnectionSettings.Url+'/viewDashboardWorkorder?viewdate=' + today_DT + '&employeekey=' + empkey + '&OrganizationID=' + OrganizationID);
  }
  workorderDetails(workorderkey,Oid) {
    return this
      .http
      .get(ConnectionSettings.Url+'/workorderDetails?SearchKey=' + workorderkey + '&OrganizationID=' + Oid);
  }
  scanforWorkorder(inbarcode, toServeremployeekey, today_DT, OrganizationID) {
    return this
      .http
      .get(ConnectionSettings.Url+'/scanforWorkorder_emp?barcode='
        + inbarcode + '&empkey=' + toServeremployeekey + '&ondate=' + today_DT + '&OrganizationID=' + OrganizationID);
  }
  delayCurrentWorkOrder(WorkorderKey, toServeremployeekey, OrganizationID) {
    return this
      .http
      .get(ConnectionSettings.Url+'/delayCurrentWorkOrder?WorkorderKey='
      + WorkorderKey + '&emp=' + toServeremployeekey + '&OrganizationID=' + OrganizationID);
  }
  continueCurrentWorkOrder(WorkorderKey, toServeremployeekey , OrganizationID) {
    return this
    .http
    .get(ConnectionSettings.Url+'/continueCurrentWorkOrder?WorkorderKey='
    + WorkorderKey + '&emp=' + toServeremployeekey + '&OrganizationID=' + OrganizationID);
  }
  barcodeRoom_check(barcode, workorder_Key, OrganizationID) {
    return this
    .http
    .get(ConnectionSettings.Url+'/barcodeRoom_check?barcode='+barcode+'&wkey=' + workorder_Key +' &OrganizationID='+ OrganizationID);
  }
  barcodeRoom(workorder_Key,scannedBarcode,type,toServeremployeekey,OrganizationID,complete_Time){
    return this
    .http
    .get(ConnectionSettings.Url+'/barcodeRoomWithSnapshot_Ang?wkey=' +
     workorder_Key+'&barcode='+scannedBarcode+'&updatetype='+type+'&employeekey='+ toServeremployeekey+'&OrganizationID='+ OrganizationID+'&complete_Time='+complete_Time);
  }
  workCompleted(workorder_Key,toServeremployeekey,OrganizationID,complete_Time) {
    return this
    .http
    .get(ConnectionSettings.Url+'/workCompleted_Ang6?wkey=' + workorder_Key+'&employeekey='+toServeremployeekey +'&OrganizationID='+OrganizationID+'&complete_Time='+complete_Time);
 
  }
  // Anju's code start here

  getWorkorderByStatusEmployeeKey(employeekey,workstatuskey,today,toServeremployeekey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/getWorkorderByStatusEmployeeKey?employeekey=' + employeekey+"&workstatuskey="+workstatuskey+ "&today="+today+"&userKey="+toServeremployeekey+"&OrganizationID="+Oid);
 

  }

  getStatusListByEmployeeKey(today_DT,EmployeeKey,toServeremployeekey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/getStatusListByEmployeeKey?today_date=' + today_DT+"&employeekey="+EmployeeKey+"&userKey="+toServeremployeekey+"&OrganizationID="+Oid);
 
  }

  floorByFacility(facilitykey,Oid)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/floorByFacility?fkey=' + facilitykey+"&OrganizationID="+Oid );
 
  }

  viewworkorderFilterByFacility(facilitykey,zonekey,floorkey,today_DT,toServeremployeekey,OrganizationID)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/viewworkorderFilterByFacility?facilitykey='+ facilitykey+"&zone="+ zonekey +"&floor="+ floorkey + "&today="+today_DT+"&employeekey="+toServeremployeekey+"&OrganizationID="+OrganizationID );
 
  }

  statusByWorkorderDate(today_DT,toServeremployeekey,OrganizationID)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/statusByWorkorderDate?date=' + today_DT+"&employeekey="+toServeremployeekey+"&OrganizationID="+OrganizationID );
 
  }

  workorderFilterByStatusEmpView(statuskey,today_DT,toServeremployeekey,OrganizationID)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/workorderFilterByStatusEmpView?statuskey=' + statuskey+"&today="+today_DT+"&employeekey="+toServeremployeekey+"&OrganizationID="+OrganizationID);
 
  }
  getEquipmentEquTypeChange(FacilityKey,FloorKey,EquipmentTypeKey,OrganizationID)
  {
    return this
    .http
    .get(ConnectionSettings.Url+'/getEquipmentEquTypeChange?FacilityKey='+FacilityKey+"&FloorKey="+FloorKey+"&EquipmentTypeKey="+EquipmentTypeKey+"&OrganizationID="+OrganizationID);
  }
// code by aswathy

fileUploadDetails(obj) {
  const url = ConnectionSettings.Url+'/pho1Snapshot_Ang6';
  const obj1 = obj;
  return this
    .httppost
    .post(url, obj1,{});
}
gpsSnapShot(obj) {
  const url = ConnectionSettings.Url+'/gpsSnapShot';
  
  return this
    .httppost
    .post(url, obj,{});
}
// fileUploadDetails(obj) : Observable<any> {
//   const url = ConnectionSettings.Url+'/pho1_Ang6';
//   return this
//     .http
//     .post(url, obj);
// }

// fileUploadDetails(data): Observable<any> {
//   const url = ConnectionSettings.Url+'/pho1_Ang6';
//   return this.httpNative.post(url, data,httpOptions)
//     .pipe(
//       catchError(this.handleError)
//     );
//   }

// fileUploadDetails(data): Observable<any> {
//   const url = ConnectionSettings.Url+'/pho1_Ang6';
//   return this.http.post(url,data, httpOptions).pipe(
//     map(this.extractData),
//     catchError(this.handleError));
// }

// public createProduct(product: Product): Observable<Product> {
// const url = ConnectionSettings.Url+'/pho1_Ang6';
//   return this.http
//     .post(url, product)
//     .map(response => {
//       return new Product(response);
//     })
//     .catch((error)=>{
//         console.error(error);
//     });
// }

}
