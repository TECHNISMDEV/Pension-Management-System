package com.oracle.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="LOOKUP")
public class LookUp extends CommonFields {
	
	@Id
	@Column(name="ID")
	private String id;
	
	@Column(name="LOOKUP_TYPE")
	private String lookupType;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="VALUE")
	private String value;
	
	@Column(name="LANG")
	private String lang;
	
	@Column(name="ATTRIB01")
	private String att1;
	
	@Column(name="ATTRIB02")
	private String att2;
	
	@Column(name="ATTRIB03")
	private String att3;
	
	@Column(name="ATTRIB04")
	private String att4;
	
	@Column(name="ATTRIB05")
	private String att5;
	
	@Column(name="ATTRIB06")
	private String att6;
	
	@Column(name="ATTRIB07")
	private String att7;
	
	@Column(name="ATTRIB08")
	private String att8;
	
	@Column(name="ATTRIB09")
	private Integer att9;
	
	@Column(name="ATTRIB10")
	private Integer att10;
	
	@Column(name="ATTRIB11")
	private Integer att11;
	
	@Column(name="ATTRIB12")
	private Integer att12;
	
	@Column(name="DESC_TEXT")
	private String desc;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLookupType() {
		return lookupType;
	}

	public void setLookupType(String lookupType) {
		this.lookupType = lookupType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

	public String getAtt1() {
		return att1;
	}

	public void setAtt1(String att1) {
		this.att1 = att1;
	}

	public String getAtt2() {
		return att2;
	}

	public void setAtt2(String att2) {
		this.att2 = att2;
	}

	public String getAtt3() {
		return att3;
	}

	public void setAtt3(String att3) {
		this.att3 = att3;
	}

	public String getAtt4() {
		return att4;
	}

	public void setAtt4(String att4) {
		this.att4 = att4;
	}

	public String getAtt5() {
		return att5;
	}

	public void setAtt5(String att5) {
		this.att5 = att5;
	}

	public String getAtt6() {
		return att6;
	}

	public void setAtt6(String att6) {
		this.att6 = att6;
	}

	public String getAtt7() {
		return att7;
	}

	public void setAtt7(String att7) {
		this.att7 = att7;
	}

	public String getAtt8() {
		return att8;
	}

	public void setAtt8(String att8) {
		this.att8 = att8;
	}

	public Integer getAtt9() {
		return att9;
	}

	public void setAtt9(Integer att9) {
		this.att9 = att9;
	}

	public Integer getAtt10() {
		return att10;
	}

	public void setAtt10(Integer att10) {
		this.att10 = att10;
	}

	public Integer getAtt11() {
		return att11;
	}

	public void setAtt11(Integer att11) {
		this.att11 = att11;
	}

	public Integer getAtt12() {
		return att12;
	}

	public void setAtt12(Integer att12) {
		this.att12 = att12;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
	

}
