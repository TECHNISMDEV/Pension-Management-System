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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

@Entity
@Table(name="MEMBER_COMPANY")
public class CompanyMember {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_COMPANY_MEMBER_SEQ")
	 @GenericGenerator (
	        name = "TCX_COMPANY_MEMBER_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "CM"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	
	@Column(name="CREATED")
	private Date created;
	@Column(name="CREATED_BY")
	private String createdBy;
	@Column(name="LAST_UPDATED")
	private Date lastUpdated;
	@Column(name="LAST_UPDATED_BY")
	private String lastUpdatedBy;
	/*
	 * @Column(name="MEMBER_ID") private String memberId;
	 */
	@Column(name="COMPANY_ID")
	private String companyId;
	@Column(name="START_DATE")
	private Date starDate;
	@Column(name="END_DATE")
	private Date endDate;
	
	/*
	 * @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy =
	 * "member")
	 * 
	 * @JsonBackReference private ServiceRequest request;
	 */
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="MEMBER_ID",referencedColumnName = "ID")
	 @JsonManagedReference
	 private Member member;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public String getLastUpdatedBy() {
		return lastUpdatedBy;
	}

	public void setLastUpdatedBy(String lastUpdatedBy) {
		this.lastUpdatedBy = lastUpdatedBy;
	}

	/*
	 * public String getMemberId() { return memberId; }
	 * 
	 * public void setMemberId(String memberId) { this.memberId = memberId; }
	 */

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public Date getStarDate() {
		return starDate;
	}

	public void setStarDate(Date starDate) {
		this.starDate = starDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	/*
	 * public ServiceRequest getRequest() { return request; }
	 * 
	 * public void setRequest(ServiceRequest request) { this.request = request; }
	 */

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}
}
