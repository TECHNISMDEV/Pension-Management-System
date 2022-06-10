package com.oracle.Vos;

import java.io.Serializable;

public class CollectionAndPaymentUiVo implements Serializable {

	private String submissionId;
	private String payment_Type;
	private String amount;
	private String employer_id;
	private String damount;
	public String getSubmissionId() {
		return submissionId;
	}
	public void setSubmissionId(String submissionId) {
		this.submissionId = submissionId;
	}
	public String getPayment_Type() {
		return payment_Type;
	}
	public void setPayment_Type(String payment_Type) {
		this.payment_Type = payment_Type;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getEmployer_id() {
		return employer_id;
	}
	public void setEmployer_id(String employer_id) {
		this.employer_id = employer_id;
	}
	public String getDamount() {
		return damount;
	}
	public void setDamount(String damount) {
		this.damount = damount;
	}
	public String getPamount() {
		return pamount;
	}
	public void setPamount(String pamount) {
		this.pamount = pamount;
	}
	public String getPenPaidAMT() {
		return penPaidAMT;
	}
	public void setPenPaidAMT(String penPaidAMT) {
		this.penPaidAMT = penPaidAMT;
	}
	public String getRetPaidAMT() {
		return retPaidAMT;
	}
	public void setRetPaidAMT(String retPaidAMT) {
		this.retPaidAMT = retPaidAMT;
	}
	private String pamount;
	private String penPaidAMT;
	private String retPaidAMT;
}
