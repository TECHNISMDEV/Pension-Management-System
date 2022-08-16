package com.oracle.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.oracle.Vos.MemberVO;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

@Entity
@Table(name="MEMBER")
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
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getDocumaentName() {
		return documaentName;
	}
	public void setDocumaentName(String documaentName) {
		this.documaentName = documaentName;
	}
	public String getDocumentType() {
		return documentType;
	}
	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}
	public String getSsn() {
		return ssn;
	}
	public void setSsn(String ssn) {
		this.ssn = ssn;
	}
	public String getNrc() {
		return nrc;
	}
	public void setNrc(String nrc) {
		this.nrc = nrc;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getMobile() {
		return mobile;
	}
	public void setMobile(Long mobile) {
		this.mobile = mobile;
	}
	public String getPrAdressId() {
		return prAdressId;
	}
	public void setPrAdressId(String prAdressId) {
		this.prAdressId = prAdressId;
	}
	public String getPrBenificaryId() {
		return prBenificaryId;
	}
	public void setPrBenificaryId(String prBenificaryId) {
		this.prBenificaryId = prBenificaryId;
	}
	public Date getRetirmentDate() {
		return retirmentDate;
	}
	public void setRetirmentDate(Date retirmentDate) {
		this.retirmentDate = retirmentDate;
	}
	public Date getDod() {
		return dod;
	}
	public void setDod(Date dod) {
		this.dod = dod;
	}
	public String getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public String getNationality() {
		return nationality;
	}
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}
	
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
		return memberVO;
	}
	
	
}
