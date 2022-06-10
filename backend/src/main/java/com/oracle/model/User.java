package com.oracle.model;

import lombok.Data;

@Data
public class User 
{
	private String name;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	private String pass;
	@Override
	public String toString() {
		return "User [name=" + name + ", pass=" + pass + "]";
	}
}
