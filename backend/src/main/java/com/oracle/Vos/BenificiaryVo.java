package com.oracle.Vos;

import java.util.Date;

import com.oracle.model.CommonFields;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BenificiaryVo {

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

	private String nationality;

	private String memberNrc;
	
	private Date memberDob;
	
	private String loginId;
	
	private Date createdAt;
	
	private String createdBy;
	
	private Date lastUpdatedAt;
	
	private String lastUpdatedBy;

}
