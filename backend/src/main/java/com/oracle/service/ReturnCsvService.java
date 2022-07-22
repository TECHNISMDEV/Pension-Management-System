package com.oracle.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.Vos.ReturnUiVo;
import com.oracle.exceptioncontroller.CompanyNotExistException;
import com.oracle.helper.CSVHelper;
import com.oracle.model.Collection;
import com.oracle.model.Company;
import com.oracle.model.Return;
import com.oracle.model.ReturnItems;
import com.oracle.model.Returns;
import com.oracle.repository.CompanyRepository;
import com.oracle.repository.ReturnItemRepo;
import com.oracle.repository.ReturnRepository;

@Service
public class ReturnCsvService {

	@Autowired
	private ReturnRepository returnRepository;
	
	@Autowired
	private ReturnItemRepo returnItemRepository;
	
	@Autowired
	DataSourceConfigService dataSourceConfigService;
	
	@Autowired
	CompanyRepository companyRepository;

	public ReturnUiVo save(MultipartFile file) {
		List<ReturnItems> returnItemlist=new ArrayList<ReturnItems>();
		List<Return> returnList=new ArrayList<Return>();
		
		try {
			List<ReturnItems> returns = new CSVHelper().csvToRedturnList(file.getInputStream());
			for(ReturnItems item:returns)
			{
				Return existingReturn=returnRepository.findReturnRecordByEmpMonthYear(item.getRetur().getCompanyId(),item.getRetur().getMonth(),item.getRetur().getYear());
				Company c=companyRepository.findById(item.getComapnyNumber()).get();
				if(c==null)
				{
					throw new CompanyNotExistException();
				}
				if(existingReturn==null)
				{
					item.getRetur().setSubmissionNumber(Integer.parseInt(dataSourceConfigService.generatedValue("TCX_SUBMISSION_NO_SEQ", "")));
					Collection col=new Collection();
					col.setSubmissionNo(new Integer(item.getRetur().getSubmissionNumber()).toString());
					col.setCompany(c);
					item.getRetur().setCollection(col);
					ReturnItems savedItem= returnItemRepository.save(item);
					returnList.add(savedItem.getRetur());
					

				}else {
					item.setRetur(existingReturn);
					returnList.add(existingReturn);
					ReturnItems savedReturnItem=returnItemRepository.save(item);
					//returnItemlist.add(savedReturnItem);
				}
			}
			ReturnUiVo uiVo=new ReturnUiVo();
			returnList=returnList.stream().distinct().collect(Collectors.toList());
			uiVo.setReturns(returnList);
			return uiVo;
		} catch (IOException e) {
			throw new RuntimeException("fail to store csv data: " + e.getMessage());
		}
	}
}
