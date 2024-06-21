package com.dancefinder.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dancefinder.model.HistoryItem;

public interface HistoryRepository extends JpaRepository<HistoryItem, Long> {

}
