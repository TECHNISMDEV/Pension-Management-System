package com.oracle.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oracle.model.LookUp;
import com.oracle.repository.LookupRepository;

@Service
public class LookUpService {
	
	@Autowired
	LookupRepository lookupRepository;
	
	public  Map<String, List<String> > getLookUpDetails()
	{
		
		List<LookUp> lookUpList=lookupRepository.findAll();
		
	     // create multimap and store the value of list
        Map<String, List<String> >
            multimap = lookUpList
                           .stream()
                           .collect(
                               Collectors
                                   .groupingBy(
                                       LookUp::getLookupType,
                                       Collectors
                                           .mapping(
                                        		   LookUp::getValue,
                                               Collectors
                                                   .toList())));
		
		return multimap;
	}

}
