package com.oracle.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity
@Table(name="POSITION")
@Data
public class Position {

	@Id
	@Column(name="ID")
	private String id;
	@Column(name="CREATED")
	private Date creDate;
	@Column(name="CREATED_BY")
	private String createdBy;
	@Column(name="LAST_UPDATED")
	private Date lastUpDate;
	@Column(name="LAST_UPD_BY")
	private String lastUpdateBy;
	@Column(name="NAME")
	private String name;
	@Column(name="DESC_TEXT")
	private String desc;
	@Column(name="POSITION_TYPE")
	private String positionType;
	@Column(name="ORG_ID")
	private String orgId;
	@Column(name="DIV_ID")
	private String divId;
	
	@Column(name="PAR_POS_ID")
	private String paraPosid;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "position")
	@JsonBackReference
	private AppUser user;
	
	
	
}
