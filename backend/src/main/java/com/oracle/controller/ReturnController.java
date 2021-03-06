package com.oracle.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.oracle.dto.SubmissionList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.oracle.Vos.ReturnUiVo;
import com.oracle.helper.CSVHelper;
import com.oracle.model.AppUser;
import com.oracle.model.Return;
import com.oracle.model.ReturnItems;
import com.oracle.repository.AppUserService;
import com.oracle.repository.MemberRepository;
import com.oracle.repository.ReturnItemRepo;
import com.oracle.repository.ReturnRepository;
import com.oracle.service.ReturnCsvService;
import com.oracle.util.DateUtil;

import springfox.documentation.service.ResponseMessage;

@CrossOrigin
@RestController
@RequestMapping("/app")
@Slf4j
public class ReturnController {
	@Autowired
	ReturnCsvService returnCsvservice;

	@Autowired
	ReturnItemRepo returnItemRepo;

	@Autowired
	ReturnRepository returnRepo;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	AppUserService appUserService;

	@PostMapping("/file-upload/{loginId}")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,@PathVariable String loginId) {
		String message = "";
		AppUser appUser=appUserService.findUserById(loginId);

		if (CSVHelper.hasCSVFormat(file)) {
			try {
				ReturnUiVo returns = returnCsvservice.save(file,loginId);
				for(Return r:returns.getReturns())
				{
					r.setCreatedBy(appUser.getLogin());
				}

				return ResponseEntity.ok(returns);
			} catch (Exception e) {
				e.printStackTrace();
				message = "Could not- upload the file: " + file.getOriginalFilename() + "!";
				log.error("Exception===> {}",e);
				return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
						.body(new com.oracle.message.ResponseMessage(message, ""));
			}
		}

		message = "Please upload a csv file!";
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new com.oracle.message.ResponseMessage(message, ""));
	}

	@PostMapping(path = "/validate/{Id}",consumes = "application/json")
	public ResponseEntity<?> validateReturnItem(@PathVariable String Id, @RequestBody SubmissionList submissionNumberList) {
		List<Return> updatedReturn = new ArrayList<Return>();
		List<ReturnItems> updatedListItem = new ArrayList<ReturnItems>();
		System.out.println("----");
		ReturnUiVo uiVo = new ReturnUiVo();
		List<ReturnItems> listItem = returnItemRepo.findReturnItemByReturnId(Id);
		Return ret = returnRepo.findById(Id).get();
		
		for (ReturnItems rItem : listItem) {
			/*
			 * if(null==memberRepository.findByNrc(rItem.getMemberNrc())) {
			 * rItem.setComment("Member detail is not correct "+ rItem.getMemberNrc());
			 * updatedListItem.add(rItem);
			 * 
			 * } else
			 */ 
			if (rItem.getMemberDob() == null) {
				 rItem.setComment("Date of Birth is empty");
				updatedListItem.add(rItem);
				
			} else if (rItem.getMemFirstName() == null) {
				 rItem.setComment("First name is empty");
				updatedListItem.add(rItem);
				
			} else if (rItem.getMemeLastName() == null) {
				 rItem.setComment("Last name is empty");
				updatedListItem.add(rItem);
				
			} else if (rItem.getMemberNrc() == null) {
				 rItem.setComment("NRC is empty");
				// returnItemRepo.save(rItem);
				updatedListItem.add(rItem);
				
			} 
			
			else {
				rItem.setStatus("Validated");
				ret.setStatus("Validated");
				ret.setLastUpdated(DateUtil.getCurrentDate());
				ret.setValidateDate(DateUtil.getCurrentDate());
				returnRepo.save(ret);

				for(Integer submissionNumber:submissionNumberList.getSubmissionNumberList()) {
					updatedReturn.add(returnRepo.findBySubmissionNumber(submissionNumber));
				}
				updatedListItem.add(returnItemRepo.save(rItem));
				// returnItemRepo.save(rItem);
			}
		}
		uiVo.setReturns(updatedReturn.stream().distinct().collect(Collectors.toList()));
		uiVo.setItems(updatedListItem);
		return ResponseEntity.ok(uiVo);

	}

	@GetMapping(path = "/getItemsByReturnId/{returnId}")
	public List<ReturnItems> getReturnItemsByReturnId(@PathVariable String returnId) {
		// Return r=new Return();
		// r.setId(returnId);
		return returnItemRepo.findReturnItemByReturnId(returnId);
		// return returnItemRepo.findByRetur(r);

	}
	@GetMapping(path = "/findAllOpenReturnByOwnerId/{loginId}")
	public List<Return> findAllOpenReturnByOwnerId(@PathVariable String loginId) {
		
		return returnRepo.findAllOpenReturnByOwnerId(loginId);

	}
}
