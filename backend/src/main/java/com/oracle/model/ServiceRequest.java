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
import com.oracle.Vos.ServiceRequestVo;
import com.oracle.sequenceGenerator.StringPrefixedSequenceIdGenerator;
import com.oracle.util.DateUtil;
import com.oracle.util.LookUpConstant;

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
	 
	 @Column(name="PROP_FST_NAME")
	 private String srPropiterFirstName;
	 
	 @Column(name="PROP_LAST_NAME")
	 private String srPropiterLastName;
	 
	 @Column(name="NATIONALITY")
	 private String propiterNationality;
	 
	 @Column(name="NRC")
	 private String proprietorNRC;
	 
	 @Column(name="NAME")
	 private String name;
	 
	 @Column(name="COMPANY_TYPE")
	 private String companyType;
	 
	 @Column(name="LOCATION")
	 private String location;
	 
	 @Column(name="CONTACT_EMAIL")
	 private String contactEmail;

	 
	 @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="COMAPNY_ID",referencedColumnName = "ID")
	 @JsonManagedReference
	 private Company company;
	 
	 @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="COMP_MEM_ID",referencedColumnName = "ID")
	 @JsonManagedReference
	 private CompanyMember member;
	 
	 
	 public ServiceRequestVo getVo()
	 {
		 ServiceRequestVo request=new ServiceRequestVo();
		 
		 request.setId(this.getId());
			request.setCreated(this.created);
			request.setCraeatedBy(this.craeatedBy);
			request.setLast_Updated(this.last_Updated);
			request.setLastUpdBy(this.lastUpdBy);
			request.setOrgId(this.getOrgId());
			request.setOwnerId(this.ownerId);
			request.setClaimId(this.getClaimId());
			request.setSrNumber(this.getSrNumber());
			request.setSource(this.getSource());
			request.setContactName(this.getContactName());
			request.setType(this.getType());
			request.setStartDate(this.getStartDate());
			request.setEndDate(this.getEndDate());
			request.setArea(this.getArea());
			request.setSubArea(this.getSubArea());
			request.setSource(this.getSource());
			request.setStatus(this.getStatus());
			request.setProcess(this.getProcess());
			request.setResolution(this.getResolution());
			request.setComments(this.getComments());
			request.setProcess(this.getPriority());
			request.setContactNumber(this.getContactNumber());
			request.setContactEmail(this.getContactEmail());
			request.setSrPropiterFirstName(this.getSrPropiterFirstName());
			request.setSrPropiterLastName(this.getSrPropiterLastName());
			request.setProprietorNRC(this.getProprietorNRC());
			request.setPropiterNationality(this.getPropiterNationality());
			request.setName(this.getName());
			request.setCompanyType(this.getCompanyType());
			request.setLocation(this.getLocation());
		 
		 return request;
	 }
	 
	

	

	

	
	 
}
