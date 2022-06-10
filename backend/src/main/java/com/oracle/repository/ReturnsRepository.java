package com.oracle.repository;

import com.oracle.model.Returns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * @author aryansh
 *
 */
public interface ReturnsRepository extends JpaRepository<Returns, String> {


    List<Returns> findBySubmissionNo(String sub);

    @Query("SELECT r from Returns r JOIN r.company com "
            + "ON com.id =:comid " )
    List<Returns> findRetByComID(@Param("comid") String comid);

    @Query("SELECT r from Returns r JOIN r.collection col "
            + "ON col.id =:colid " )
    List<Returns> findRetByColID(@Param("colid") String colid);

}
