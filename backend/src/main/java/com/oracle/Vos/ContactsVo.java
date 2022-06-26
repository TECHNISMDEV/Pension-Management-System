package com.oracle.Vos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactsVo {

	private String id;
	private Date created;
	private String craeatedBy;
	private Date last_Updated;
	private String lastUpdBy;
	private String firstName;
	private String middleName;
	private String lastName;
	private String mobileNo;
	private String email;
	private String documentNo;
	private String documentType;
	private String contactType;
	private String contactTypeId;
	private String memberId;
	private String companyId;
	private Date dob;
	private String loginId;
}
