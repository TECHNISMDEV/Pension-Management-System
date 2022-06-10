package com.oracle.Vos;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.annotation.SessionScope;

import com.oracle.model.UserPosition;
import com.oracle.model.UserResponsibility;
public class AppRegistrationUiVo {

	private String id;
	private String firstName;
	private String lastName;
	private Integer mobileNo;
	private String email;
	private List<UserResponsibility> responsibility;
	private List<UserPosition> positions;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public List<UserResponsibility> getResponsibility() {
		return responsibility;
	}
	public void setResponsibility(List<UserResponsibility> responsibility) {
		this.responsibility = responsibility;
	}
	public List<UserPosition> getPositions() {
		return positions;
	}
	public void setPositions(List<UserPosition> positions) {
		this.positions = positions;
	}
	
	
	
}
