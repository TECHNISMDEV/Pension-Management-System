package com.oracle.Vos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressVo {

	private String id;
	private Date created;
	private String craeatedBy;
	private Date last_Updated;
	private String lastUpdBy;
	private String adressLine1;
	private String adressLine2;
	private String adressLine3;
	private String adressLine4;

	private String city;
	private String districtProvience;
	private String state;
	private String country;
	private String postalCode;
	private String adressType;
	private String companyId;
	private String memberId;
	private String loginId;
}
