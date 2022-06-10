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
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

@Entity
@Table(name="RETURNS_ITEMS")
public class ReturnItems extends CommonFields {

	@Id
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_RETURN_ITEMS_SEQ")
	 @GenericGenerator (
	        name = "TCX_RETURN_ITEMS_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "RI"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	/*
	 * @Column(name="RETURN_ID") private String returnId;
	 */
	@Column(name="MEMBER_SHARE")
	private Long memberShare;
	@Column(name="COMPANY_SHARE")
	private Long companyShare;
	@Column(name="MEMBER_ID")
	private String memberId;
	@Column(name="YEAR")
	private Integer year;
	@Column(name="MONTH")
	private Integer month;
	@Column(name="MEMBER_DOB")
	private Date memberDob;
	@Column(name="MEMBER_DOC_NO")
	private String memberDocNumber;
	@Column(name="MEMBER_NRC")
	private String memberNrc;
	@Column(name="MEM_GROSSSALARY")
	private Long memGrossSalary;
	@Column(name="COMPANY_NUMBER")
	private String comapnyNumber;
	@Column(name="MEM_FRIST_NAME")
	private String memFirstName;
	@Column(name="MEM_LAST_NAME")
	private String memeLastName;
	@Column(name="STATUS")
	private String status;
	
	/*
	 * @Column(name="COMMENT") private String comment;
	 */
	
	 @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="RETURN_ID",referencedColumnName = "ID")
	@JsonManagedReference
	private Return retur;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	/*
	 * public String getReturnId() { return returnId; }
	 * 
	 * public void setReturnId(String returnId) { this.returnId = returnId; }
	 */

	public Long getMemberShare() {
		return memberShare;
	}

	public void setMemberShare(Long memberShare) {
		this.memberShare = memberShare;
	}

	public Long getCompanyShare() {
		return companyShare;
	}

	public void setCompanyShare(Long companyShare) {
		this.companyShare = companyShare;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Date getMemberDob() {
		return memberDob;
	}

	public void setMemberDob(Date memberDob) {
		this.memberDob = memberDob;
	}

	public String getMemberDocNumber() {
		return memberDocNumber;
	}

	public void setMemberDocNumber(String memberDocNumber) {
		this.memberDocNumber = memberDocNumber;
	}

	public String getMemberNrc() {
		return memberNrc;
	}

	public void setMemberNrc(String memberNrc) {
		this.memberNrc = memberNrc;
	}

	public Long getMemGrossSalary() {
		return memGrossSalary;
	}

	public void setMemGrossSalary(Long memGrossSalary) {
		this.memGrossSalary = memGrossSalary;
	}

	public String getComapnyNumber() {
		return comapnyNumber;
	}

	public void setComapnyNumber(String comapnyNumber) {
		this.comapnyNumber = comapnyNumber;
	}

	public String getMemFirstName() {
		return memFirstName;
	}

	public void setMemFirstName(String memFirstName) {
		this.memFirstName = memFirstName;
	}

	public String getMemeLastName() {
		return memeLastName;
	}

	public void setMemeLastName(String memeLastName) {
		this.memeLastName = memeLastName;
	}

	public String getStatus() {
		return status;
	}

	public Return getRetur() {
		return retur;
	}

	public void setRetur(Return retur) {
		this.retur = retur;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	/*
	 * public String getComment() { return comment; }
	 * 
	 * public void setComment(String comment) { this.comment = comment; }
	 */
	
	
}
