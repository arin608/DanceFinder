package com.dancefinder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dancefinder.model.SearchRecord;

public interface SearchRecordRepository extends JpaRepository<SearchRecord, Long>{

}
