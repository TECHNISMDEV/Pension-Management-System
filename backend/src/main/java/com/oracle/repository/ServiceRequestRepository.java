package com.oracle.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oracle.model.ServiceRequest;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, String> {
    
	List<ServiceRequest> findAll();
	
	Optional<ServiceRequest> findById(String userId);
	
	List<ServiceRequest> findByOwnerId(String ownerId);

	ServiceRequest save(ServiceRequest serviceRequest);

	ServiceRequest findBySrNumber(String srNumber);
}
