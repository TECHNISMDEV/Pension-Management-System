package com.oracle.model;

import java.io.Serializable;
import java.math.BigInteger;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

import lombok.Data;

@Entity
@Table(name = "SERVICE_REQUEST")
@Data
public class ServiceRequest implements Serializable {

	 
	 @Id
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_SERVICE_REQUEST_ID")
	 @GenericGenerator (
	        name = "TCX_SERVICE_REQUEST_ID", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "SR"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	 private String id;
	 
	 @Column(name = "CREATED")
	 private Date created;

	 @Column(name = "CREATED_BY")
	 private String craeatedBy;
	 
	 @Column(name = "LAST_UPDATED")
	 private Date last_Updated;
	 
	 @Column(name = "LAST_UPD_BY")
	 private String lastUpdBy;
	 
	
	 @Column(name = "SR_NUMBER")
	 private String srNumber;
	 
	 @Column(name = "TYPE")
	 private String type;
	 
	 @Column(name = "START_DATE")
	 private Date startDate;
	 
	 @Column(name = "END_DATE")
	 private Date endDate;
	 
	 @Column(name = "AREA")
	 private String area;
	 
	 @Column(name = "SUB_AREA")
	 private String subArea;
	 
	 @Column(name = "PROCESS")
	 private String process;
	 
	 @Column(name = "RESOLUTION")
	 private String resolution;
	 
	 @Column(name = "COMMENTS")
	 private String comments;
	 
		/*
		 * @Column(name = "COMAPNY_ID") private String companyId;
		 */
	 
		/*
		 * @Column(name = "COMP_MEM_ID") private String compMemId;
		 */
	 
	 @Column(name = "CLAIM_ID")
	 private String claimId;
	 
	 @Column(name = "OWNER_ID")
	 private String ownerId;
 
	 @Column(name = "ORG_ID")
	 private String orgId;
	 
	 @Column(name = "SOURCE")
	 private String source;
	 
	 @Column(name = "PRIORITY")
	 private String priority;
	 
	 @Column(name = "CONTACT_NUMBER")
	 private BigInteger contactNumber;
	 
	 @Column(name = "CONTACT_NAME")
	 private String contactName;
	 
	 @Column(name="STATUS")
	 private String status;
	 
	 @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="COMAPNY_ID",referencedColumnName = "ID")
	 @JsonManagedReference
	 private Company company;
	 
	 @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="COMP_MEM_ID",referencedColumnName = "ID")
	 @JsonManagedReference
	 private CompanyMember member;

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

	public String getCraeatedBy() {
		return craeatedBy;
	}

	public void setCraeatedBy(String craeatedBy) {
		this.craeatedBy = craeatedBy;
	}

	public Date getLast_Updated() {
		return last_Updated;
	}

	public void setLast_Updated(Date last_Updated) {
		this.last_Updated = last_Updated;
	}

	public String getLastUpdBy() {
		return lastUpdBy;
	}

	public void setLastUpdBy(String lastUpdBy) {
		this.lastUpdBy = lastUpdBy;
	}

	public String getSrNumber() {
		return srNumber;
	}

	public void setSrNumber(String srNumber) {
		this.srNumber = srNumber;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getSubArea() {
		return subArea;
	}

	public void setSubArea(String subArea) {
		this.subArea = subArea;
	}

	public String getProcess() {
		return process;
	}

	public void setProcess(String process) {
		this.process = process;
	}

	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	/*
	 * public String getCompanyId() { return companyId; }
	 * 
	 * public void setCompanyId(String companyId) { this.companyId = companyId; }
	 */

	/*
	 * public String getCompMemId() { return compMemId; }
	 * 
	 * public void setCompMemId(String compMemId) { this.compMemId = compMemId; }
	 */

	public String getClaimId() {
		return claimId;
	}

	public void setClaimId(String claimId) {
		this.claimId = claimId;
	}

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public BigInteger getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(BigInteger contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public CompanyMember getMember() {
		return member;
	}

	public void setMember(CompanyMember member) {
		this.member = member;
	}

	
	 
}
