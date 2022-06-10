package com.oracle.model;

import java.io.Serializable;
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

import lombok.Data;

@Entity
@Table(name="COLLECTION")
@Data
public class Collection implements Serializable {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1227359273756989276L;
	@Id
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_COLLECTION_SEQ")
	 @GenericGenerator (
	        name = "TCX_COLLECTION_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "C"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	@Column(name="CREATED")
	private Date created;
	@Column(name="CREATED_BY")
	private String craeatedBy;
	@Column(name="LAST_UPDATED")
	private Date last_Updated;
	@Column(name="LAST_UPDATED_BY")
	private String lastUpdBy;
	@Column(name="COLLECTED_BY")
	private String collectedBY;
	@Column(name="STATUS")
	private String status;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "collection")
	@JsonBackReference
	private Return retur;
	
	
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

	public String getCollectedBY() {
		return collectedBY;
	}

	public void setCollectedBY(String collectedBY) {
		this.collectedBY = collectedBY;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSubStatus() {
		return subStatus;
	}

	public void setSubStatus(String subStatus) {
		this.subStatus = subStatus;
	}

	public String getSubmissionNo() {
		return submissionNo;
	}

	public void setSubmissionNo(String submissionNo) {
		this.submissionNo = submissionNo;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Column(name="SUB_STATUS")
	private String subStatus;
	@Column(name="SUBMISSION_NUM")
	private String submissionNo;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "COMPANY_ID", referencedColumnName = "ID")
	@JsonManagedReference
	private Company company;

}
