package com.oracle.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oracle.Vos.AddressVo;
import com.oracle.model.Address;
import com.oracle.model.Company;
import com.oracle.repository.AdressRepository;
import com.oracle.repository.CompanyRepository;
import com.oracle.util.DateUtil;

@Service
public class CompanyAdressService {

	@Autowired
	AdressRepository adressRepository;
	
	@Autowired
	CompanyRepository companyRepository;
	
	public List<Address> getAddressListByCompanyId(String companyId) {
		
		return adressRepository.findByCompanyId(companyId);
	}

	public Address addCompanyAddress(AddressVo addressVo) {

		Optional<Address> addr=null;
		Address address=null;
		addr=adressRepository.findById(addressVo.getId());
		if(Objects.nonNull(addr))
		{
			address=new Address();
			address.setAdressLine1(addressVo.getAdressLine1());
			address.setAdressLine2(addressVo.getAdressLine2());
			address.setAdressLine3(addressVo.getAdressLine3());
			address.setAdressLine4(addressVo.getAdressLine4());
			address.setAdressType(addressVo.getAdressType());
			address.setCity(addressVo.getCity());
			address.setState(addressVo.getState());
			address.setCompanyId(addressVo.getCompanyId());
			address.setCountry(addressVo.getCountry());
			address.setDistrictProvience(addressVo.getDistrictProvience());
			address.setPostalCode(addressVo.getPostalCode());
			address.setCraeatedBy(addressVo.getLoginId());
			address.setCreated(DateUtil.getCurrentDate());
			address.setLast_Updated(DateUtil.getCurrentDate());
			address.setLastUpdBy(addressVo.getLoginId());
			
		}else {
			address=addr.get();
			address.setAdressLine1(addressVo.getAdressLine1());
			address.setAdressLine2(addressVo.getAdressLine2());
			address.setAdressLine3(addressVo.getAdressLine3());
			address.setAdressLine4(addressVo.getAdressLine4());
			address.setAdressType(addressVo.getAdressType());
			address.setCity(addressVo.getCity());
			address.setState(addressVo.getState());
			address.setCompanyId(addressVo.getCompanyId());
			address.setCountry(addressVo.getCountry());
			address.setDistrictProvience(addressVo.getDistrictProvience());
			address.setPostalCode(addressVo.getPostalCode());
			address.setLast_Updated(DateUtil.getCurrentDate());
			address.setLastUpdBy(addressVo.getLoginId());
			
		}
		if(addressVo.getIsPrimary()) {
		 Address add=adressRepository.save(address);
		 Company company=companyRepository.findById(add.getCompanyId()).get();
		 company.setAddress(add);
		 companyRepository.save(company);
		}
		 return address;
		 
	}
}
