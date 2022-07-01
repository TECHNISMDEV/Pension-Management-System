package com.oracle.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Entity
@Table(name = "APP_USER")
@Data
public class AppUser implements Serializable
{
	
	
	 @Column(name = "LOGIN")
	 @Id
	 private String login;
	 
	 
	 @Column(name = "ID")
	 private String id;
	 
	 @Column(name = "CREATED")
	 private Date created;

	 @Column(name = "CREATED_BY")
	 private String craeatedBy;
	 
	 @Column(name = "LAST_UPDATED")
	 private Date last_Updated;
	 
	 @Column(name = "LAST_UPD_BY")
	 private String lastUpdBy;
	 
	 @Column(name = "FIRST_NAME")
	 private String firstName;
	 
	 @Column(name = "LAST_NAME")
	 private String lastName;
	 
	 @Column(name = "MOBILE_NUM")
	 private Integer mobileNo;
	 
	 @Column(name = "EMAIL")
	 private String email;
	 
	 @Column(name = "RESP_ID")
	 private String respID;
	 
	 @Column(name = "POS_ID")
	 private String posID;
	 
	
	 
	 

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

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

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(Integer mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRespID() {
		return respID;
	}

	public void setRespID(String respID) {
		this.respID = respID;
	}

	public String getPosID() {
		return posID;
	}

	public void setPosID(String posID) {
		this.posID = posID;
	}

	
	 
	
}
