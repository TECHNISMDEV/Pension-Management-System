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
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Entity
@Table(name = "APP_USER")
@Data
public class AppUser implements Serializable
{
	
	
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;


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
	 
		/*
		 * @Column(name = "POS_ID") private String posID;
		 */
	 
	 @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	 @JoinColumn(name="POS_ID",referencedColumnName = "ID")
	 @JsonManagedReference
	 private Position position;
	 	 
	
}
