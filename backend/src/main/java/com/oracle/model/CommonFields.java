package com.oracle.model;

import java.util.Date;

import javax.persistence.Column;

public class CommonFields {

	@Column(name="CREATED")
	private Date created;
	@Column(name="CREATED_BY")
	private String createdBy;
	@Column(name="LAST_UPDATED")
	private Date lastUpdated;
	@Column(name="LAST_UPDATED_BY")
	private String lastUpdatedBy;
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
	
	
}
