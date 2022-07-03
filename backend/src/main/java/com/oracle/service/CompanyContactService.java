package com.oracle.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oracle.Vos.ContactsVo;
import com.oracle.model.Address;
import com.oracle.model.Contact;
import com.oracle.repository.PersonalContactRepository;
import com.oracle.util.DateUtil;

@Service
public class CompanyContactService {
	
	@Autowired
	PersonalContactRepository contactRepository;

	public Contact addCompanyContact(ContactsVo vo) {
		// TODO Auto-generated method stub
		Optional<Contact> coOptional=null;
		Contact contact=null;
		coOptional=contactRepository.findById(vo.getId());

		if(Objects.nonNull(coOptional)) {
			contact=new Contact();
			contact.setCompanyId(vo.getCompanyId());
			contact.setContactType(vo.getContactType());
			contact.setContactTypeId(vo.getContactTypeId());
			contact.setCraeatedBy(vo.getLoginId());
			contact.setCreated(DateUtil.getCurrentDate());
			contact.setDob(vo.getDob());
			contact.setDocumentNo(vo.getCompanyId()+vo.getFirstName());
			contact.setDocumentType(vo.getCompanyId()+vo.getFirstName());
			contact.setEmail(vo.getEmail());
			contact.setFirstName(vo.getFirstName());
			contact.setLastName(vo.getLastName());
			contact.setMiddleName(vo.getMiddleName());
			contact.setLastUpdBy(vo.getLoginId());
			contact.setLast_Updated(DateUtil.getCurrentDate());
			contact.setMobileNo(vo.getMobileNo());
		}else {
			contact=coOptional.get();
			contact.setCompanyId(vo.getCompanyId());
			contact.setContactType(vo.getContactType());
			contact.setContactTypeId(vo.getContactTypeId());
			contact.setDob(vo.getDob());
			contact.setDocumentNo(vo.getCompanyId()+vo.getFirstName());
			contact.setDocumentType(vo.getCompanyId()+vo.getFirstName());
			contact.setEmail(vo.getEmail());
			contact.setFirstName(vo.getFirstName());
			contact.setLastName(vo.getLastName());
			contact.setMiddleName(vo.getMiddleName());
			contact.setLastUpdBy(vo.getLoginId());
			contact.setLast_Updated(DateUtil.getCurrentDate());
			contact.setMobileNo(vo.getMobileNo());
		}
		return contactRepository.save(contact);
	}
	
public List<Contact> getContactListByCompanyId(String companyId) {
		
		return contactRepository.findByCompanyId(companyId);
	}

}
