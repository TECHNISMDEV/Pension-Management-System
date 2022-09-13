package com.oracle.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.oracle.Vos.BenificiaryVo;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

import lombok.Data;

@Entity
@Table(name="BENEFICIARY")
@Data
public class Benificiary extends CommonFields{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_MEMBER_SEQ")
	 @GenericGenerator (
	        name = "TCX_MEMBER_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "BEN"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	
	@Column(name = "FIRST_NAME")
	private String firstName;
	
	@Column(name="LAST_NAME")
	private String lastName;
	@Column(name="MIDDLET_NAME")
	private String middleName;
	@Column(name="DOB")
	private Date dob;
	@Column(name="DOCUMENT_NUM")
	private String documaentName;
	@Column(name="DOCUMENT_TYPE")
	private String documentType;
	@Column(name="SSN")
	private String ssn;
	@Column(name="NRC")
	private String nrc;
	@Column(name="EMAIL")
	private String email;
	@Column(name="MOB")
	private Long mobile;
	@Column(name="PR_ADRESS_ID")
	private String prAdressId;
	@Column(name="NATIONALITY")
	private String nationality;
	
	 
	 @ManyToOne
	 @JoinColumn(name="MEMBER_ID", referencedColumnName = "ID")
	private Member member;


	public BenificiaryVo getVo() {
		BenificiaryVo vo=new BenificiaryVo();
		vo.setId(this.getId());
		vo.setCreatedAt(this.getCreated());
		vo.setCreatedBy(this.getCreatedBy());
		vo.setDob(this.getDob());
		vo.setDocumaentName(this.getDocumaentName());
		vo.setDocumentType(this.getDocumentType());
		vo.setEmail(this.getEmail());
		vo.setFirstName(this.getFirstName());
		vo.setLastName(this.getLastName());
		vo.setMiddleName(this.getMiddleName());
		vo.setMobile(this.getMobile());
		vo.setLastUpdatedAt(this.getLastUpdated());
		vo.setLastUpdatedBy(this.getLastUpdatedBy());
		vo.setNationality(this.getNationality());
		vo.setNrc(this.getNrc());
		vo.setSsn(this.getSsn());
		return vo;
	}
	
	
	

}
