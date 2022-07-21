package com.oracle.Vos;

import java.util.Date;

import com.oracle.model.CommonFields;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberVO extends CommonFields {

	private String id;

	private String firstName;

	private String lastName;

	private String middleName;

	private Date dob;

	private String documaentName;

	private String documentType;

	private String ssn;

	private String nrc;
	
	private String email;
	
	private Long mobile;
	
	private String prAdressId;
	
	private String prBenificaryId;
	
	private Date retirmentDate;
	
	private Date dod;
	
	private String ownerId;
	
	private String nationality;
	
	private String loginId;
	
	private String serviceRequestNumber;
	
	private String companyId;

}
