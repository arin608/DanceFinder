package com.dancefinder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dancefinder.model.HistoryItem;
import com.dancefinder.repository.HistoryRepository;

@RestController
@RequestMapping("/history")
public class HistoryController {
	
	@Autowired
	private HistoryRepository historyRepository;
	
	@GetMapping
	public List<HistoryItem> getAllHistory() {
		return historyRepository.findAll();
	}
	
	@DeleteMapping("/{id}")
	public void deleteHistory(@PathVariable Long id) {
		historyRepository.deleteById(id);
	}

}


// 이 파일에서 계속 에러나는 거 같음
// 집에서 해결해보기


































