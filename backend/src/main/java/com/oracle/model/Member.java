package com.oracle.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.oracle.Vos.MemberVO;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

import lombok.Data;

@Entity
@Table(name="MEMBER")
@Data
public class Member extends CommonFields {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_MEMBER_SEQ")
	 @GenericGenerator (
	        name = "TCX_MEMBER_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "M"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	
	@Column(name="FIRST_NAME")
	private String firstName;
	@Column(name="LAST_NAME")
	private String lastName;
	@Column(name="MIDDLE_NAME")
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
	@Column(name="PR_BENEFICIARY_ID")
	private String prBenificaryId;
	@Column(name="RETIREMENT_DT")
	private Date retirmentDate;
	@Column(name="DOD")
	private Date dod;
	@Column(name="OWNER_ID")
	private String ownerId;
	@Column(name="NATIONALITY")
	private String nationality;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "member")
	@JsonBackReference
	private ServiceRequest request;
	
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "member")
	@JsonBackReference
	private List<Benificiary> benificiary;
	
	
	
	public MemberVO getVo() {
		MemberVO memberVO=new MemberVO();
		memberVO.setCreated(this.getCreated());
		memberVO.setCreatedBy(this.getCreatedBy());
		memberVO.setDob(this.getDob());
		memberVO.setDod(this.getDod());
		memberVO.setDocumaentName(this.getDocumaentName());
		memberVO.setDocumentType(this.getDocumentType());
		memberVO.setEmail(this.getEmail());
		memberVO.setFirstName(this.getFirstName());
		memberVO.setId(this.getId());
		memberVO.setLastName(this.getLastName());
		memberVO.setLastUpdated(this.getLastUpdated());
		memberVO.setLastUpdatedBy(this.getLastUpdatedBy());
		memberVO.setMiddleName(this.getMiddleName());
		memberVO.setMobile(this.getMobile());
		memberVO.setNationality(this.getNationality());
		memberVO.setNrc(this.getNrc());
		memberVO.setPrAdressId(this.getPrAdressId());
		memberVO.setPrBenificaryId(this.getPrBenificaryId());
		memberVO.setRetirmentDate(this.getRetirmentDate());
		memberVO.setSsn(this.getSsn());
		//memberVO.setBenificiaryVo(this.getBenificiary());
		return memberVO;
	}
	
	
}
