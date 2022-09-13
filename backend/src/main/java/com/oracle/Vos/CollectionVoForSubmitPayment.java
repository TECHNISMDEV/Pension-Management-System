package com.oracle.Vos;

import java.util.ArrayList;
import java.util.List;

import com.oracle.model.Payments;
import com.oracle.model.Return;
import com.oracle.model.Returns;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CollectionVoForSubmitPayment {

	private List<Returns> returnList=new ArrayList();
	private List<Payments> paymentsList=new ArrayList();
}
