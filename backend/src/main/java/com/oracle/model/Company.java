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

import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

@Entity
@Table(name="COMPANY")
@Data
@ToString
public class Company implements Serializable {

	@Id
	 @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_COMPANYNUM_SEQ")
	 @GenericGenerator (
	        name = "TCX_COMPANYNUM_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "E"),
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
	@Column(name="NAME")
	private String name;
	
	  @Column(name="DOCUMENT_NUM") 
	  private String documentNum;
	 
	@Column(name="DOCUMENT_TYPE")
	private String documentType;
	@Column(name="COMP_CX_REF")
	private String compCxRef;
	/*
	 * @Column(name="PR_ADRESS_ID") private String prAddressId;
	 */
	/*
	 * @Column(name="PR_CONTACT_ID") private String prContactId;
	 */
	@Column(name="COMPANY_REG_DATE")
	private Date companyRegDate;
	@Column(name="OWNER_ID")
	private String ownerId;

	@Column(name="LEGAL_NAME")
	private String legalName;

	@Column(name="COMPANY_STATUS")
	private String status;
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "company")
	@JsonBackReference
	private ServiceRequest request;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="PR_ADRESS_ID",referencedColumnName = "ID")
	@JsonManagedReference
	private Address address;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="PR_CONTACT_ID",referencedColumnName = "ID")
	@JsonManagedReference
	private Contact contact;
	
	/*
	 * @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name="DOCUMENT_NUM",referencedColumnName = "ID")
	 * 
	 * @JsonManagedReference private Document document;
	 */
	
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	
	public String getDocumentNum() {
		return documentNum;
	}

	public void setDocumentNum(String documentNum) {
		this.documentNum = documentNum;
	}
	 
	public String getDocumentType() {
		return documentType;
	}
	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}
	public String getCompCxRef() {
		return compCxRef;
	}
	public void setCompCxRef(String compCxRef) {
		this.compCxRef = compCxRef;
	}

	/*
	 * public String getPrAddressId() { return prAddressId; } public void
	 * setPrAddressId(String prAddressId) { this.prAddressId = prAddressId; }
	 */
	/*
	 * public String getPrContactId() { return prContactId; } public void
	 * setPrContactId(String prContactId) { this.prContactId = prContactId; }
	 */
	public Date getCompanyRegDate() {
		return companyRegDate;
	}
	public void setCompanyRegDate(Date companyRegDate) {
		this.companyRegDate = companyRegDate;
	}
	public String getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public ServiceRequest getRequest() {
		return request;
	}
	public void setRequest(ServiceRequest request) {
		this.request = request;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public Contact getContact() {
		return contact;
	}
	public void setContact(Contact contact) {
		this.contact = contact;
	}
	/*
	 * public Document getDocument() { return document; } public void
	 * setDocument(Document document) { this.document = document; }
	 */
	
}
