import { SdCardTwoTone } from "@material-ui/icons";

export const API_URL = process.env.NODE_ENV !== 'production'? "http://localhost:8080/app":"https://technism-pms.herokuapp.com/app";

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const  t_date = ()=>{
    const date = new Date();

    return {
        "day":days[date.getDay()],
        "text_month":months[date.getMonth()],
        "month":date.getMonth()+1,
        "date":date.getUTCDate(),
        "year":date.getFullYear(),
    };
}

export const set_employ_save = (values)=>{
    var payload ={
        "adressLine1": values.residencyArea,
        "adressLine2": values.residencyArea,
        "adressLine3": values.residencyArea,
        "adressLine4": "",
        "adressType": "",
        "area": values.area,
        "city": "",
        "claimId": "",
        "comments": "",
        "compCxRef": "",
        "compMemId": "",
        "companyId": "",
        "companyRegDate": "",
        "contactName": values.owner_name,
        "contactNumber": values.phoneNo,
        "contactType": "",
        "contactTypeId": "",
        "country": values.nationality,
        "craeatedBy": values.owner_id,
        "created": "",
        "districtProvience": values.province,
        "dob": "",
        "documentNum": values.companyName,
        "documentType": values.companyName,
        "email": values.email,
        "endDate": "",
        "firstName": "",
        "id": values.srId,
        "lastName": "",
        "lastUpdBy": values.owner_id,
        "last_Updated": "",
        "memberId": "",
        "middleName": "",
        "mobileNo": values.phoneNo,
        "name": values.companyName,
        "orgId": "",
        "ownerId": values.owner_id,
        "postalCode": values.postal_code?values.postal_code:'NA',
        "prContactId": "",
        "priority": "",
        "process": "",
        "resolution": "",
        "source": "",
        "srNumber": values.sr_num,
        "srStatus": values.status,
        "startDate": values.date_of_employing,
        "state": values.region,
        "subArea": "",
        "type": values.sr_type
      }
    return payload
}

// export const set_employ_registration = (values,userId)=>{
//     var payload ={
//         "adressLine1": values.plot_no+' '+values.box_no+' '+values.street_name+' '+values.residency_area,
//         "adressLine2": values.postal_name+' '+values.town+' '+values.postal_code,
//         "adressLine3": "",
//         "adressLine4": "",
//         "adressType": "",
//         "area": values.area,
//         "city": "",
//         "claimId": "",
//         "comments": "",
//         "compCxRef": "",
//         "compMemId": "",
//         "companyId": values.employer_no?values.employer_no:'',
//         "companyRegDate": "",
//         "contactName": values.owner_name,
//         "contactNumber": values.phone_no,
//         "contactType": "",
//         "contactTypeId": "",
//         "country": values.nationality?values.nationality:'ZAMBIAN',
//         "craeatedBy": values.owner_id,
//         "created": "",
//         "districtProvience": values.province,
//         "dob": "",
//         "documentNum": values.employer_name,
//         "documentType": values.employer_name,
//         "email": values.email,
//         "endDate": "",
//         "firstName": "",
//         "id": "",
//         "lastName": "",
//         "lastUpdBy": userId,
//         "last_Updated": "",
//         "loginUserId": userId,
//         "memberId": "",
//         "middleName": "",
//         "mobileNo": values.phone_no,
//         "name": values.employer_name,
//         "orgId": "",
//         "ownerId": values.owner_id,
//         "postalCode": values.postal_code?values.postal_code:'NA',
//         "prContactId": "",
//         "priority": "",
//         "process": "",
//         "resolution": "",
//         "source": "",
//         "srNumber": values.sr_num,
//         "srStatus": values.status,
//         "startDate": values.date_of_employing,
//         "state": values.region?values.region:'NA',
//         "subArea": "",
//         "type": values.sr_type
//       }
// console.log(payload)
// return payload

// }


export const setSrRegistration =(srFormData,userId)=>{
var payload = {
    "companyVo": {
      "adressLine1": "",
      "adressLine2": "",
      "adressLine3": "",
      "adressLine4": "",
      "adressType": "",
      "city": "",
      "compCxRef": "",
      "companyRegDate": "",
      "companyStatus": "",
      "companySubStatus": "",
      "companyType": srFormData.employer_type,
      "contactType": "",
      "contactTypeId": "",
      "country": '',
      "created":'',
      "createdBy": userId,
      "dateIncopr": "",
      "district": "",
      "districtProvience": "",
      "dob": "",
      "documentNum": srFormData.employer_name,
      "documentType":srFormData.employer_name,
      "dod": "",
      "email": "",
      "firstName": "",
      "holdingCompany": "",
      "id": "",
      "lastName": "",
      "lastUpdated":'',
      "lastUpdatedBy": userId,
      "legalName": "",
      "loginUserId":userId,
      "mainFax": "",
      "mainPhone": "",
      "memberId": "",
      "middleName": "",
      "mobileNo": "",
      "name": srFormData.employer_name,
      "nationality": "",
      "nrc": "",
      "ownerId": userId,
      "pacraId": "",
      "postalCode": "",
      "prContactId": "",
      "propFirstName": "",
      "propLastName": "",
      "propPosition": "",
      "province": "",
      "region": "",
      "retirementDate": "",
      "seasonFlag": 0,
      "sector": "",
      "srStatus": srFormData.status,
      "ssn": "",
      "stEmploy": "",
      "state": "",
      "station": "",
      "subsidaryCompany": "",
      "zone": ""
    },
    "serviceRequestVo": {
      "area": "",
      "claimId":"",
      "comments": srFormData.notes,
      "companyType": srFormData.employer_type,
      "contactEmail": srFormData.contact_mail,
      "contactName": srFormData.contact_name,
      "contactNumber": srFormData.contact_no,
      "craeatedBy": userId,
      "created":'',
      "endDate": "",
      "id": '',
      "lastUpdBy": userId,
      "last_Updated":'',
      "location": srFormData.location,
      "loginUserId": userId,
      "name": srFormData.owner_name,
      "orgId": "",
      "ownerId": userId,
      "priority": "",
      "process": "",
      "propiterNationality": srFormData.nationality,
      "proprietorNRC": srFormData.nrc,
      "resolution":"",
      "source": "",
      "srNumber":srFormData.sr_num,
      "srPropiterFirstName": srFormData.prop_firstname,
      "srPropiterLastName":srFormData.prop_lastname,
      "startDate":'',
      "status": srFormData.status,
      "subArea":  "",
      "type":  srFormData.sr_type,
      "user": {
        "craeatedBy":  srFormData.contactEmail,
        "created":'',
        "email": "",
        "firstName": "",
        "id": userId,
        "lastName": "",
        "lastUpdBy": "",
        "last_Updated": "",
        "login": userId,
        "mobileNo": 0,
        "posID": "",
        "respID": ""
      }
    }
  }
  console.log(payload)
  return payload
}

export const submitServiceRequestEmployerData =(srFormData,userId,srId,srForm)=>{
   
    var payload = {
        "companyVo": {
          "adressLine1": srFormData.adressLine1,
          "adressLine2": srFormData.region+' '+srFormData.zone,
          "adressLine3": "",
          "adressLine4": "",
          "adressType": "",
          "area": srFormData.area,
          "city": "",
          "compCxRef": srFormData.no_of_employees,
          "companyRegDate": formatDatePicker(srFormData.dateRegistered),
          "companyStatus":srFormData.companyStatus,
          "companySubStatus":srFormData.companySubStatus,
          "companyType": srFormData.companyType,
          "contactType": "",
          "contactTypeId": "",
          "country": srFormData.nationality,
          "created":'',
          "createdBy": userId,
          "dateIncopr": formatDatePicker(srFormData.dateIncorporated),
          "district": srFormData.district,
          "districtProvience": srFormData.province,
          "dob": "",
          "documentNum": srFormData.companyName,
          "documentType":srFormData.companyName,
          "dod": "",
          "firstName": '',
          "holdingCompany": srFormData.holdingCompany,
          "id": srFormData.companyNumber,
          "lastName":'',
          "lastUpdated":'',
          "lastUpdatedBy": userId,
          "legalName": srFormData.legalName,
          "loginUserId": userId,
          "mainFax": srFormData.fax,
          "mainPhone": srFormData.mainPhone,
          "mainEmail":srFormData.mainEmail,
          "memberId": "",
          "middleName": "",
          "name": srFormData.companyName,
          "nationality": srFormData.nationality,
          "nrc": srFormData.nrc,
          "ownerId": userId,
          "pacraId": srFormData.pacraId,
          "postalCode": srFormData.postalCode,
          "prContactId": "",
          "propFirstName":srFormData.propFirstName,
          "propLastName": srFormData.propLastName,
          "propPosition": srFormData.propPosition,
          "province": srFormData.province,
          "region": srFormData.region,
          "retirementDate": "",
          "seasonFlag": srFormData.seasonFlag?1:0,
          "sector": srFormData.sector,
          "srStatus": srFormData.status,
          "ssn": "",
          "stEmploy": formatDatePicker(srFormData.dateEmployed),
          "state": srFormData.province,
          "station": srFormData.station,
          "subsidaryCompany": srFormData.subsidaryCompany,
          "zone": srFormData.zone,
        },
        "serviceRequestVo": {
            "area": "",
            "claimId":"",
            "comments": '',
            "companyType": "",
            "contactEmail": "",
            "contactName":"",
            "contactNumber": "",
            "craeatedBy": "",
            "created":'',
            "endDate": "",
            "id": srForm.id,
            "lastUpdBy": "",
            "last_Updated":'',
            "location":"",
            "loginUserId": "",
            "name": "",
            "orgId": "",
            "ownerId": "",
            "priority": "",
            "process": "",
            "propiterNationality":"",
            "proprietorNRC": "",
            "resolution":"",
            "source": "",
            "srNumber":"",
            "srPropiterFirstName": "",
            "srPropiterLastName":"",
            "startDate":'',
            "status": "",
            "subArea":  "",
            "type":  "",
            "user": {
              "craeatedBy":  "",
              "created":'',
              "email": "",
              "firstName": "",
              "id": "",
              "lastName": "",
              "lastUpdBy": "",
              "last_Updated": "",
              "login": "",
              "mobileNo": 0,
              "posID": "",
              "respID": ""
            }
        }
      }
      console.log(payload)
      return payload;
}


export const set_member_registration = (values)=>{
    var payload ={
        
            "adressLine1": values.plot_no+' '+values.box_no+' '+values.street_name+' '+values.residency_area,
            "adressLine2":  values.postal_name+' '+values.town+' '+values.postal_code,
            "adressLine3": "",
            "adressLine4": "",
            "adressType": "",
            "area": values.area,
            "city": "",
            "claimId": "",
            "comments": "",
            "compCxRef": "",
            "compMemId": "",
            "companyId": values.service_request_form.employer_id,
            "companyRegDate": "2021-03-02",
            "contactName": values.service_request_form.owner_name,
            "contactNumber": values.phone_no,
            "contactType": "",
            "contactTypeId": "",
            "country": "ZAMBIAN",
            "craeatedBy": values.service_request_form.owner_id,
            "created": "",
            "districtProvience": "string",
            "dob": values.dob,
            "documentNum": values.service_request_form.sr_num,
            "documentType": values.service_request_form.sr_num,
            "dod": "",
            "email": values.email,
            "endDate": "",
            "firstName": values.service_request_form.owner_name,
            "id": "",
            "lastName": values.surname,
            "lastUpdBy": values.service_request_form.owner_id,
            "last_Updated": "",
            "memberId": "string",
            "middleName": "string",
            "mobileNo": values.phone_no,
            "name": values.service_request_form.employer_name,
            "nationality": "ZAMBIAN",
            "nrc": values.nrc,
            "orgId": "string",
            "ownerId": values.service_request_form.owner_id,
            "postalCode": values.postal_code? values.postal_code:'NA',
            "prContactId": "string",
            "priority": "string",
            "process": "string",
            "resolution": "string",
            "retirementDate": "2021-03-02",
            "source": "string",
          
            "ssn": values.ssn,
    
            "srNumber": values.sr_num,
            "srStatus": values.status,
            "startDate": '2020-03-02',
            "state":"",
            "subArea": "",
            "type": values.sr_type
          
      }
console.log(payload)
return payload

}

export const  formatDatePicker = (date)=>{
    var d = new Date(date),
        month = '' + (d.getMonth()+1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const  formatDate = (date)=>{
    var d = new Date(date),
        month = '' + (d.getMonth()+1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/') + " "+[hour,minutes,seconds].join(':');
}

export const  formatDateWithoutTimestamp = (date)=>{
    var d = new Date(date),
        month = '' + (d.getMonth()+1),
        day = '' + d.getDate(),
        year = d.getFullYear();
       

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/');
}


export const setsubmitpayment = (responseData,payments)=>{
    var pay_list =[];
    
    responseData.map((element) => (

        
            pay_list.push({
                "amount": element.returns.treturnAmount.toString(),
                "damount": "0",
                
                "pamount": element.returns.pamount?element.returns.pamount.toString():"0",
                "payment_Type": payments[0].payments_type,
                "penPaidAMT": element.returns.pamount?element.returns.pamount.toString():"0",
                "retPaidAMT": element.returns.treturnAmount.toString(),
                "submissionId": element.returns.submissionNo
            })
    ))
   
    
    return pay_list
}


export const submitNewContact = (data,empNumber,userId) => {
        var payload = {
            companyId: empNumber,
            contactType: data.contactType?'primary':'',
            contactTypeId: '',
            craeatedBy: userId,
            created: '',
            dob: data.dob,
            documentNo: empNumber,
            documentType: empNumber,
            email: data.email,
            firstName: data.firstName,
            id: '',
            lastName: data.lastName,
            lastUpdBy: userId,
            last_Updated: '',
            loginId:userId,
            memberId: '',
            middleName: '',
            mobileNo: data.mobileNo
        }
        return payload
       
}

export const submitNewAddress = (data,empNumber,userId) =>{
    var payload = {
        adressLine1: data.adressLine1,
        adressLine2: data.adressLine2, 
        adressLine3: '',
        adressLine4: '',
        adressType: data.adressType,
        city: data.city,
        companyId: empNumber,
        country: data.country,
        craeatedBy: '',
        created: '',
        districtProvience: data.districtProvience,
        id: empNumber,
        isPrimary: data.isPrimary?true:false,
        lastUpdBy: '',
        last_Updated: '',
        loginId: userId,
        memberId: '',
        postalCode: data.postalCode,
        state: data.districtProvience,
      }

      return payload
}

export const getListOfSubmission = (returns)=>{
var submissionNumberArr = []
    returns.map((key)=>{
        submissionNumberArr.push(key.submissionNumber)
    })

 var payload = {
    "submissionNumberList": submissionNumberArr
  }
    console.log(payload)
return payload
}

export const submitMemberServiceRequest = (data, userId)=>{
    var payload = {
        "companyVo": {
          "adressLine1": "",
          "adressLine2": "",
          "adressLine3": "",
          "adressLine4": "",
          "adressType": "",
          "area": "",
          "city": "",
          "compCxRef": "",
          "companyRegDate": "",
          "companyStatus": "",
          "companySubStatus": "",
          "companyType": "",
          "contactType": "",
          "contactTypeId": "",
          "country": "",
          "created": "",
          "createdBy": "",
          "dateIncopr": "",
          "district": "",
          "districtProvience": "",
          "dob": "",
          "documentNum": "",
          "documentType": "",
          "dod": "",
          "firstName": "",
          "holdingCompany": "",
          "id": data.employer_id,
          "lastName": "",
          "lastUpdated": "",
          "lastUpdatedBy": "",
          "legalName": "",
          "loginUserId": userId,
          "mainEmail": "",
          "mainFax": "",
          "mainPhone": "",
          "memberId": "",
          "middleName": "",
          "name": data.employer_name,
          "nationality": data.nationality,
          "noOfEmployee": 0,
          "nrc": data.nrc,
          "ownerId": userId,
          "pacraId": "",
          "postalCode": "",
          "prContactId": "",
          "propFirstName": "",
          "propLastName": "",
          "propPosition": "",
          "province": "",
          "region": "",
          "retirementDate": "",
          "seasonFlag": "",
          "sector": "",
          "srStatus": "",
          "ssn": "",
          "stEmploy": "",
          "state": "",
          "station": "",
          "subsidaryCompany": "",
          "zone": ""
        },
        "memberVO": [
          {
            "benificiaryVo": [
              {
                "createdAt": "",
                "createdBy": "",
                "dob": "",
                "documaentName": "",
                "documentType": "",
                "email": "",
                "firstName": "",
                "id": "",
                "lastName": "",
                "lastUpdatedAt": "",
                "lastUpdatedBy": "",
                "loginId": "",
                "memberDob": "",
                "memberNrc": "",
                "middleName": "",
                "mobile": 0,
                "nationality": "",
                "nrc": "",
                "ssn": ""
              }
            ],
            "companyId": "",
            "created": "",
            "createdBy": "",
            "dob": "",
            "documaentName": "",
            "documentType": "",
            "dod": "",
            "email": "",
            "firstName": "",
            "id": "",
            "lastName": "",
            "lastUpdated": "",
            "lastUpdatedBy": "",
            "loginId": "",
            "middleName": "",
            "mobile": 0,
            "nationality": "",
            "nrc": "",
            "ownerId": "",
            "prAdressId": "",
            "prBenificaryId": "",
            "retirmentDate": "",
            "serviceRequestNumber": "",
            "ssn": ""
          }
        ],
        "serviceRequestVo": {
          "area": "",
          "claimId": "",
          "comments": data.notes,
          "companyId": data.employer_id,
          "companyType": data.employer_type,
          "contactEmail": data.contact_mail,
          "contactName": data.contact_name,
          "contactNumber": data.contact_no,
          "craeatedBy": "",
          "created": "",
          "endDate": "",
          "id": data.id,
          "lastUpdBy": "",
          "last_Updated": "",
          "location": data.location,
          "loginUserId": userId,
          "name": "",
          "orgId": "",
          "ownerId": userId,
          "priority": "",
          "process": "",
          "propiterNationality": "",
          "proprietorNRC": "",
          "resolution": "",
          "source": "",
          "srNumber": data.sr_num,
          "srPropiterFirstName": "",
          "srPropiterLastName": "",
          "startDate": "",
          "status": "",
          "subArea": "",
          "type": data.sr_type,
          "user": {
            "craeatedBy": "",
            "created": "",
            "email": "",
            "firstName": "",
            "id": "",
            "lastName": "",
            "lastUpdBy": "",
            "last_Updated": "",
            "login": userId,
            "mobileNo": "",
            "position": {
              "creDate": "",
              "createdBy": "",
              "desc": "",
              "divId": "",
              "id": "",
              "lastUpDate": "",
              "lastUpdateBy": "",
              "name": "",
              "orgId": "",
              "paraPosid": "",
              "positionType": ""
            },
            "respID": ""
          }
        }
      }
      return payload
}


export const addMemberRequest = (data,userId,srFormData,empNumber)=>{
  var payload = {
    "benificiaryVo": [
      {
        "createdAt": "",
        "createdBy": "",
        "dob": "",
        "documaentName": "",
        "documentType": "",
        "email": "",
        "firstName": "",
        "id": "",
        "lastName": "",
        "lastUpdatedAt": "",
        "lastUpdatedBy": "",
        "loginId": "",
        "memberDob": "",
        "memberNrc": "",
        "middleName": "",
        "mobile": 0,
        "nationality": "",
        "nrc": "",
        "ssn": ""
      }
    ],
    "companyId": empNumber,
    "created": "",
    "createdBy": userId,
    "dob": data.dob,
    "documaentName": data.docNum,
    "documentType": data.docType,
    "dod":data.dod,
    "email": data.email,
    "firstName": data.firstName,
    "id": "",
    "lastName": data.lastName,
    "lastUpdated": "",
    "lastUpdatedBy": "",
    "loginId": userId,
    "middleName": data.middleName,
    "mobile": data.mobileNumber,
    "nationality": data.nationality,
    "nrc": data.nrc,
    "ownerId": userId,
    "prAdressId": "",
    "prBenificaryId": "",
    "retirmentDate": data.retirementDate,
    "serviceRequestNumber": srFormData.sr_num,
    "ssn": data.ssn
  }

  return payload
}

export const addBenfRequest = (data,userId,member)=>{
  var payload = {
    "createdAt": "",
    "createdBy": userId,
    "dob": data.dob,
    "documaentName": data.docNum,
    "documentType": data.docType,
    "email": data.email,
    "firstName": data.firstName,
    "id": "",
    "lastName": data.lastName,
    "lastUpdatedAt": "",
    "lastUpdatedBy": userId,
    "loginId": userId,
    "memberDob": member.dob,
    "memberNrc": member.nrc,
    "middleName": data.middleName,
    "mobile": data.mobileNumber,
    "nationality": data.nationality,
    "nrc": data.nrc,
    "ssn": data.ssn
  }
  return payload;
}