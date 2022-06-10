package com.oracle.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;

@Entity
@Table(name="DOCUMENTS")
public class Document {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TCX_DOCUMENT_SEQ")
	 @GenericGenerator (
	        name = "TCX_DOCUMENT_SEQ", 
	        strategy = "com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator", 
	        parameters = {
	            @Parameter(name = StringPrefixedSequenceIdGenerator.INCREMENT_PARAM, value = "1"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.VALUE_PREFIX_PARAMETER, value = "D"),
	            @Parameter(name = StringPrefixedSequenceIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	
	 @Column(name = "CREATED")
	 private Date created;

	 @Column(name = "CREATED_BY")
	 private String craeatedBy;
	 
	 @Column(name = "LAST_UPDATED")
	 private Date last_Updated;
	 
	 @Column(name = "LAST_UPDATED_BY")
	 private String lastUpdBy;
	 @Column(name = "TYPE")
	 private String type;
	 @Column(name = "DOCUMENT_NAME")
	 private String documentName;
	 @Column(name = "FILE_TYPE")
	 private String fileType;
	 @Column(name = "FILE_SIZE")
	 private Long fileSize;
	 @Column(name = "COMPANY_ID")
	 private String companyId;
	 @Column(name = "FILE_NAME")
	 private String fileName;
	 @Column(name = "ACTUAL_FILE")
	 @Lob
	 private byte[] actualFile;
	 @Column(name = "MEMBER_ID")
	 private String memberId;
	 @Column(name = "CLAIM_ID")
	 private String claimId;

		/*
		 * @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy =
		 * "document")
		 * 
		 * @JsonBackReference private Company company;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDocumentName() {
		return documentName;
	}

	public void setDocumentName(String documentName) {
		this.documentName = documentName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public byte[] getActualFile() {
		return actualFile;
	}

	public void setActualFile(byte[] actualFile) {
		this.actualFile = actualFile;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getClaimId() {
		return claimId;
	}

	public void setClaimId(String claimId) {
		this.claimId = claimId;
	}

	/*
	 * public Company getCompany() { return company; }
	 * 
	 * public void setCompany(Company company) { this.company = company; }
	 */
}
