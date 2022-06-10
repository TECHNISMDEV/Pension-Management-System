package com.oracle.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.oracle.model.Collection;


/**
 * @author aryansh
 *
 */
@Repository
public interface CollectionRepository extends JpaRepository<Collection, String>{
	
	
	 Collection findBySubmissionNo(String sub);
	
	 @Query("SELECT c from Collection c JOIN c.company com "
	 		            + "ON com.id =:comid AND c.status ='In Progress' " ) 
	 List<Collection> findByComID(@Param("comid") String comid);

}
