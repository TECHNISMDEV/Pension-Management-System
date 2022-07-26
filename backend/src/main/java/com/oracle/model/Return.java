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
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

import lombok.Data;

@Data
@Entity
@Table(name = "RETURNS")
public class Return {

	@Id
	@Column(name = "ID")
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_RETURN_SEQ")
	 @GenericGenerator (
	        name = "TCX_RETURN_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "R"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;

	@Column(name = "CREATED")
	private Date created;

	@Column(name = "CREATED_BY")
	private String createdBy;

	@Column(name = "LAST_UPDATED")
	private Date lastUpdated;

	@Column(name = "LAST_UPDATED_BY")
	private String lastUpdatedBy;

	@Column(name = "YEAR")
	private Integer year;

	@Column(name = "MONTH")
	private Integer month;

	@Column(name = "RETURN_TYPE")
	private String returnType;

	@Column(name = "COMPANY_ID")
	private String companyId;

	@Column(name = "TOTAL_RETURN_AMOUNT")
	private Integer totalReturnAmount;

	@Column(name = "DUE_AMOUNT")
	private Integer dueAmount;

	/*
	 * @Column(name = "COLLECTION_ID") private String collectionId;
	 */

	@Column(name = "RETURN_PAID_AMT")
	private Integer returnPaidAmount;

	@Column(name = "SUBMISSION_NO")
	private Integer submissionNumber;

	@Column(name = "STATUS")
	private String status;

	@Column(name = "SUB_STATUS")
	private String subStatus;

	@Column(name = "PENALTY_AMT")
	private Integer penaltyAmount;

	@Column(name = "PENALTY_ADJ_AMT")
	private Integer penaltyAdjAmount;

	@Column(name = "PENALTY_PAID_AMT")
	private Integer penaltyPaidAmount;
	
	@Column(name="VALIDATE_DT")
	private Date validateDate;
	
	@OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "retur")
	@JsonBackReference
	private List<ReturnItems> items;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="COLLECTION_ID",referencedColumnName = "ID")
	@JsonManagedReference
	private Collection collection;

	

	public Return(String id, Date created, String createdBy, Date lastUpdated, String lastUpdatedBy, int year,
			int month, String returnType, String companyId, int totalReturnAmount, int dueAmount, String collectionId,
			int returnPaidAmount, int submissionNumber, String status, String subStatus, int penaltyAmount,
			int penaltyAdjAmount, int penaltyPaidAmount,Date valiDateDate) {
		super();
		this.id = id;
		this.created = created;
		this.createdBy = createdBy;
		this.lastUpdated = lastUpdated;
		this.lastUpdatedBy = lastUpdatedBy;
		this.year = year;
		this.month = month;
		this.returnType = returnType;
		this.companyId = companyId;
		this.totalReturnAmount = totalReturnAmount;
		this.dueAmount = dueAmount;
		//this.collectionId = collectionId;
		this.returnPaidAmount = returnPaidAmount;
		this.submissionNumber = submissionNumber;
		this.status = status;
		this.subStatus = subStatus;
		this.penaltyAmount = penaltyAmount;
		this.penaltyAdjAmount = penaltyAdjAmount;
		this.penaltyPaidAmount = penaltyPaidAmount;
		this.validateDate=valiDateDate;
	}
	
	public Return() {
		super();
	}

	

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Return other = (Return) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

}
