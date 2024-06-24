// HistoryController.java
package com.dancefinder.controller;

import com.dancefinder.model.HistoryItem;
import com.dancefinder.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PutMapping("/{id}")
    public HistoryItem updateHistory(@PathVariable Long id, @RequestBody HistoryItem updatedItem) {
        Optional<HistoryItem> existingItemOpt = historyRepository.findById(id);
        if (existingItemOpt.isPresent()) {
            HistoryItem existingItem = existingItemOpt.get();
            existingItem.setTitle(updatedItem.getTitle());
            existingItem.setArtist(updatedItem.getArtist());
            return historyRepository.save(existingItem);
        }
        throw new RuntimeException("History item not found");
    }
}


































