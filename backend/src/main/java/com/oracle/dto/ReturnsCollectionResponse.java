package com.oracle.dto;

import java.util.List;

import com.oracle.model.Payments;
import com.oracle.model.Returns;

/**
 * @author aryansh
 *
 */

public class ReturnsCollectionResponse
{
    private Returns returns;
    private List<Payments> payments;

    public Returns getReturns() {
        return returns;
    }
    public ReturnsCollectionResponse setReturns(Returns returns) {
        this.returns = returns;
        return this;
    }
    public List<Payments> getPayments() {
        return payments;
    }
    public ReturnsCollectionResponse setPayments(List<Payments> payments) {
        this.payments = payments;
        return this;
    }

}
