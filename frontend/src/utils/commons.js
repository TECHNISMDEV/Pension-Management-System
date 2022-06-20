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
        "adressLine1": values.plot_no+' '+values.box_no+' '+values.street_name+' '+values.residency_area,
        "adressLine2": values.postal_name+' '+values.town+' '+values.postal_code,
        "adressLine3": "",
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
        "contactNumber": values.phone_no,
        "contactType": "",
        "contactTypeId": "",
        "country": values.nationality,
        "craeatedBy": values.owner_id,
        "created": "",
        "districtProvience": values.province,
        "dob": "",
        "documentNum": values.employer_name,
        "documentType": values.employer_name,
        "email": values.email,
        "endDate": "",
        "firstName": "",
        "id": values.employer_no,
        "lastName": "",
        "lastUpdBy": values.owner_id,
        "last_Updated": "",
        "memberId": "",
        "middleName": "",
        "mobileNo": values.phone_no,
        "name": values.employer_name,
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

export const set_employ_registration = (values,userId)=>{
    var payload ={
        "adressLine1": values.plot_no+' '+values.box_no+' '+values.street_name+' '+values.residency_area,
        "adressLine2": values.postal_name+' '+values.town+' '+values.postal_code,
        "adressLine3": "",
        "adressLine4": "",
        "adressType": "",
        "area": values.area,
        "city": "",
        "claimId": "",
        "comments": "",
        "compCxRef": "",
        "compMemId": "",
        "companyId": values.employer_no?values.employer_no:'',
        "companyRegDate": "",
        "contactName": values.owner_name,
        "contactNumber": values.phone_no,
        "contactType": "",
        "contactTypeId": "",
        "country": values.nationality?values.nationality:'ZAMBIAN',
        "craeatedBy": values.owner_id,
        "created": "",
        "districtProvience": values.province,
        "dob": "",
        "documentNum": values.employer_name,
        "documentType": values.employer_name,
        "email": values.email,
        "endDate": "",
        "firstName": "",
        "id": "",
        "lastName": "",
        "lastUpdBy": userId,
        "last_Updated": "",
        "loginUserId": userId,
        "memberId": "",
        "middleName": "",
        "mobileNo": values.phone_no,
        "name": values.employer_name,
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
        "state": values.region?values.region:'NA',
        "subArea": "",
        "type": values.sr_type
      }
console.log(payload)
return payload

}



export const set_member_registration = (values)=>{
    var payload ={
        
            "adressLine1": values.plot_no+' '+values.box_no+' '+values.street_name+' '+values.residency_area,
            "adressLine2":  values.postal_name+' '+values.town+' '+values.postal_code,
            "adressLine3": "string",
            "adressLine4": "string",
            "adressType": "string",
            "area": values.area,
            "city": "string",
            "claimId": "string",
            "comments": "string",
            "compCxRef": "string",
            "compMemId": "string",
            "companyId": values.service_request_form.employer_id,
            "companyRegDate": "2021-03-02",
            "contactName": values.service_request_form.owner_name,
            "contactNumber": values.phone_no,
            "contactType": "string",
            "contactTypeId": "string",
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

export const  formatDate = (date)=>{
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