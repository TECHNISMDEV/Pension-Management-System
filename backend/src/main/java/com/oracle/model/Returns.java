package com.oracle.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;




/**
 * @author aryansh
 *
 */

@Entity
@Table(name="RETURNS")
@Data
public class Returns
{
    @Id
    private String id;
    @Column(name="CREATED")
    private Date created;
    @Column(name="CREATED_BY")
    private String craeatedBy;
    @Column(name="LAST_UPDATED")
    private Date last_Updated;
    @Column(name="LAST_UPDATED_BY")
    private String lastUpdBy;
    @Column(name="YEAR")
    private int year;
    @Column(name="MONTH")
    private int month;
    @Column(name="RETURN_TYPE")
    private String returnType;
    @Column(name="TOTAL_RETURN_AMOUNT")
    private Double  tReturnAmount;
    @Column(name="DUE_AMOUNT")
    private Double  dAmount;
    @Column(name="STATUS")
    private String status;
    @Column(name="SUB_STATUS")
    private String subStatus;

    @Column(name="PENALTY_AMT")
    private Double  pAmount;
    @Column(name="PENALTY_ADJ_AMT")
    private Double  paAMT;
    @Column(name="PENALTY_PAID_AMT")
    private Double  penPaidAMT;
    @Column(name="RETURN_PAID_AMT")
    private Double  retPaidAMT;
    @Column(name="SUBMISSION_NO")
    private String submissionNo;



    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "COLLECTION_ID", referencedColumnName = "ID")
    @JsonManagedReference
    private Collection collection;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "COMPANY_ID", referencedColumnName = "ID")
    @JsonManagedReference
    private Company company;
}
