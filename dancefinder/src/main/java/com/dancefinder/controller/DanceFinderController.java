package com.dancefinder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dancefinder.service.DanceFinderService;

@RestController
@RequestMapping("/search")
public class DanceFinderController {

	@Autowired
	private DanceFinderService DanceFinderService;
}
