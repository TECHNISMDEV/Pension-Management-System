package com.oracle.controller;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oracle.Vos.CollectionAndPaymentUiVo;
import com.oracle.Vos.CollectionVoForSubmitPayment;
import com.oracle.dto.ReturnsCollectionResponse;
import com.oracle.model.Payments;
import com.oracle.model.Return;
import com.oracle.model.Returns;
import com.oracle.repository.CollectionRepository;
import com.oracle.repository.PaymentRepository;
import com.oracle.repository.ReturnRepository;
import com.oracle.repository.ReturnsRepository;

/**
 * @author aryansh
 *
 */
@RestController
@RequestMapping("/app")
@CrossOrigin
public class CollectionAndPaymentController
{

	@Autowired
	private ReturnsRepository returnsRepository;
	
	@Autowired
	private ReturnRepository returnRepository;

	@Autowired
	private CollectionRepository collectionRepository;

	@Autowired
	private PaymentRepository paymentRepository;




	@GetMapping("/getAllReturns")
	public ResponseEntity<?> getAllReturns()
	{
		return (ResponseEntity<?>) Optional.of(returnsRepository.findAll()).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get Returns"));

	}

	@GetMapping("/getAllCollections")
	public ResponseEntity<?> getAllCollections()
	{
		return (ResponseEntity<?>) Optional.of(collectionRepository.findAll()).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get Collection"));

	}


	@PostMapping("/getAllPayments")
	@CrossOrigin
	public ResponseEntity<?> getAllPaymentsDetails()
	{
		return (ResponseEntity<?>) Optional.of(paymentRepository.findAll()).map(e -> new ResponseEntity<>(e, HttpStatus.OK))
				.orElseThrow(() -> new RuntimeException("Could not get Payments"));

	}


	@PostMapping("/getByRetSubmissionNo/{sub}")
	@CrossOrigin
	public  List<ReturnsCollectionResponse> getRetCollectionsBySubmissionNo(@PathVariable String sub)
	{
		List<Returns> returns = returnsRepository.findBySubmissionNo(sub);
		returns=returns.stream().filter(ret->ret.getStatus().equals("Validated")).collect(Collectors.toList());
		List<ReturnsCollectionResponse> filReturns =
				returns.stream()
						.filter(ret -> Objects.nonNull(ret.getCollection()))
						.map(ret -> new ReturnsCollectionResponse()
								.setPayments(paymentRepository.findByColID(ret.getCollection().getId()))
								.setReturns(ret))
						.collect(Collectors.toList());



		return filReturns;

	}

	@PostMapping("/getByRetCompanyID/{comID}")
	@CrossOrigin
	public  List<ReturnsCollectionResponse> getRetByCompanyID(@PathVariable String comID)
	{
		List<Returns> returns = returnsRepository.findRetByComID(comID);
		returns=returns.stream().filter(ret->ret.getStatus().equals("Validated")).collect(Collectors.toList());

		List<ReturnsCollectionResponse> filReturns =
				returns.stream()
						.filter(ret -> Objects.nonNull(ret.getCollection()))
						.map(ret -> new ReturnsCollectionResponse()
								.setPayments(paymentRepository.findByColID(ret.getCollection().getId()))
								.setReturns(ret))
						.collect(Collectors.toList());



		return filReturns;

	}
	@PostMapping("/submitPayment")
	@CrossOrigin
	public  ResponseEntity<?> saveCollection(@RequestBody List<CollectionAndPaymentUiVo> collectionResponse)
	{
		CollectionVoForSubmitPayment collectionuiVo=new CollectionVoForSubmitPayment();
		for(CollectionAndPaymentUiVo uiVo:collectionResponse)
		{
			List<Returns> returns = returnsRepository.findBySubmissionNo(uiVo.getSubmissionId());
			List<Payments> paymentList=paymentRepository.findByColID(uiVo.getSubmissionId());
			for(Returns ret:returns)
			{
				ret.setDAmount(Double.parseDouble(uiVo.getDamount()));
				ret.setPAmount(Double.parseDouble(uiVo.getPamount()));
				ret.setPenPaidAMT(Double.parseDouble(uiVo.getPenPaidAMT()));
				ret.setRetPaidAMT(Double.parseDouble(uiVo.getRetPaidAMT()));
				ret.setStatus("Paid");
				//returnsRepository.save(ret);
				collectionuiVo.getReturnList().add(returnsRepository.save(ret));
				Payments pay=new Payments();
				pay.setAmount(Double.parseDouble(uiVo.getAmount()));
				pay.setPayment_Type(uiVo.getPayment_Type());
				pay.setCollection(ret.getCollection());
				pay.setStatus("Paid");
				paymentRepository.save(pay);
				collectionuiVo.getPaymentsList().add(paymentRepository.save(pay));
				
				
				
			}
			
			//collectionuiVo.setPaymentsList(paymentList)	;
			//collectionuiVo.setReturnList(returns);
			
		}
		//paymentRepository.saveAll(payment);
		return ResponseEntity.ok(collectionuiVo);
		
	}
	
	@PostMapping("/getByReturnCompanyID/{comID}")
	@CrossOrigin
	public  List<Return> getReturnByCompanyID(@PathVariable String comID)
	{
		List<Return> returns = returnRepository.findByCompanyId(comID);
		returns=returns.stream().filter(ret->ret.getStatus().equals("Validated")).collect(Collectors.toList());

		


		return returns;

	}
}
