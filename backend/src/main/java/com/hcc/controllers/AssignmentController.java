package com.hcc.controllers;

import com.hcc.dto.AssignmentResponseDto;
import com.hcc.entities.Assignment;
import com.hcc.entities.User;
import com.hcc.enums.AssignmentStatusEnum;
import com.hcc.enums.AuthorityEnum;
import com.hcc.exceptions.AssignmentNotFoundException;
import com.hcc.repositories.AssignmentRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@RestController
public class AssignmentController {

    Logger log = LogManager.getLogger(AssignmentController.class);

    @Autowired
    private AssignmentRepository assignmentRepository;

    /**
     * Gets all assignments by a user.
     * @param user
     * @return ok Status response with a list of assignments.
     * @throws AssignmentNotFoundException
     */
    @GetMapping(value = "/api/assignments")
    public ResponseEntity<List<AssignmentResponseDto>> getAssignmentsByUser(@AuthenticationPrincipal User user) {
        List<Assignment> assignmentsPage = null;

        if (user.getAuthorities().toString().contains(AuthorityEnum.LEARNER.name())) {
            assignmentsPage = assignmentRepository.findByUser(user);
        } else if (user.getAuthorities().toString().contains(AuthorityEnum.REVIEWER.name())) {
            assignmentsPage = assignmentRepository.findByCodeReviewer(user);
        }

        if (assignmentsPage.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        List<AssignmentResponseDto> assignmentDTO = assignmentsPage.stream()
                .map(AssignmentResponseDto::new)
                .collect(Collectors.toList());

        return new ResponseEntity<>(assignmentDTO, HttpStatus.OK);
    }

    /**
     * Gets an assignment by ID.
     * @param assignmentId
     * @param user
     * @return ok Status response with assignment.
     * @throws AssignmentNotFoundException
     */
    @GetMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> getAssignmentById(@PathVariable("id") Long assignmentId,
                                                                   @AuthenticationPrincipal User user) {
        Optional<Assignment> assignment = assignmentLookup(assignmentId, user);
        AssignmentResponseDto assignmentDTO = new AssignmentResponseDto(assignment.orElse(new Assignment()));

        return new ResponseEntity<>(assignmentDTO, HttpStatus.OK);
    }

    /**
     * Modifies an existing assignment.
     * @param assignmentId
     * @param user
     * @return ok Status response with the modified assignment.
     * @throws AssignmentNotFoundException
     */
    @PutMapping(value = "/api/assignments/{id}")
    public ResponseEntity<AssignmentResponseDto> updateAssignmentById(@PathVariable("id") Long assignmentId,
                                                                      @RequestBody Assignment update,
                                                                      @AuthenticationPrincipal User user) {
        Optional<Assignment> assignment = assignmentLookup(assignmentId, user);

        if (!isNull(update.getNumber())) assignment.get().setNumber(update.getNumber());
        if (!isNull(update.getStatus())) assignment.get().setStatus(update.getStatus());
        if (!isNull(update.getGithubUrl())) assignment.get().setGithubUrl(update.getGithubUrl());
        if (!isNull(update.getBranch())) assignment.get().setBranch(update.getBranch());
        if (!isNull(update.getReviewVideoUrl())) assignment.get().setReviewVideoUrl(update.getReviewVideoUrl());
        if (!isNull(update.getCodeReviewer())) assignment.get().setCodeReviewer(update.getCodeReviewer());

        AssignmentResponseDto assignmentDto = new AssignmentResponseDto(assignment.orElse(new Assignment()));

        assignmentRepository.save(assignment.get());

        return new ResponseEntity<>(assignmentDto, HttpStatus.OK);
    }

    /**
     * Saves a new assignment.
     * @param assignment
     * @param user
     * @return HTTPStatus response with the new assignment.
     */
    @PostMapping(value = "/api/assignments")
    public ResponseEntity<AssignmentResponseDto> createAssignment(@RequestBody Assignment assignment,
                                              @AuthenticationPrincipal User user) {
        assignment.setUser(user);
        assignment.setStatus(AssignmentStatusEnum.SUBMITTED.getStatus());

        assignmentRepository.save(assignment);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Finds an assignment by id, and return the assignment that can be used by a mapping method
     * @param assignmentId
     * @param user
     * @return assignment
     */
    private Optional<Assignment> assignmentLookup(Long assignmentId, User user) {
        return Optional.ofNullable(assignmentRepository.findByIdAndUser(assignmentId, user)
                .orElseThrow(() -> new AssignmentNotFoundException("Assignment not found")));
    }
}
