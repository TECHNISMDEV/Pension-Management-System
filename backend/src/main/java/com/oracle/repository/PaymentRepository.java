package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.oracle.model.Payments;

/**
 * @author aryansh
 *
 */
public interface PaymentRepository extends JpaRepository<Payments, String>{
	
	 @Query("SELECT p from Payments p JOIN p.collection col "
	 		                   + "ON col.id =:colid AND col.status ='In Progress'" ) 
	 List<Payments> findByColID(@Param("colid") String colid);
}